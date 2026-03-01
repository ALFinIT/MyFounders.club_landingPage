import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { appendLocalRecord } from '@/utils/localDb'
import { cookies } from 'next/headers'

// Mark this route as dynamic - never cache
export const dynamic = 'force-dynamic'

// Get client IP from request
function getClientIP(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || 'unknown'
  return ip
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { firstName, phone } = body

    if (!firstName || !phone) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const clientIP = getClientIP(req)

    let supabaseSaved = false
    let localSaved = false
    let supabaseError = null

    // Try Supabase first
    try {
      const cookieStore = await cookies()
      const supabase = await createClient(cookieStore)

      const { data, error } = await supabase
        .from('whatsapp_signups')
        .insert([
          {
            first_name: firstName,
            phone,
            client_ip: clientIP,
          },
        ])
        .select()

      if (error) {
        supabaseError = error.message
        console.error('Supabase error:', error)
      } else {
        supabaseSaved = true
      }
    } catch (e) {
      supabaseError = String(e)
      console.error('Supabase connection error:', e)
    }

    // Always try local fallback
    try {
      await appendLocalRecord('whatsapp_signups.json', { 
        firstName, 
        phone, 
        _savedAt: new Date().toISOString(),
        _ip: clientIP,
        _source: 'whatsapp_signup'
      })
      localSaved = true
    } catch (e) {
      console.error('Local persist failed:', e)
    }

    // Return success if either storage worked
    if (supabaseSaved || localSaved) {
      return NextResponse.json({ 
        success: true,
        message: 'Successfully registered for WhatsApp community',
        data: { firstName, phone },
        savedTo: {
          supabase: supabaseSaved,
          local: localSaved
        }
      }, { status: 200 })
    }

    // Only fail if both storages failed
    return NextResponse.json({ 
      error: 'Failed to save submission',
      details: supabaseError 
    }, { status: 500 })
  } catch (err) {
    console.error('WhatsApp API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
