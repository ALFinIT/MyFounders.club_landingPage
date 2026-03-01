import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { appendLocalRecord } from '@/utils/localDb'
import { cookies } from 'next/headers'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    let supabaseSaved = false
    let supabaseError = null
    let supabaseDuplicate = false
    let supabase = null

    // Try Supabase first
    try {
      const cookieStore = await cookies()
      supabase = await createClient(cookieStore)

      // Check if already subscribed
      const { data: existing } = await supabase
        .from('newsletter_signups')
        .select('*')
        .eq('email', email.toLowerCase())
        .single()

      if (existing) {
        supabaseDuplicate = true
      } else {
        // Insert new subscriber
        const { data, error } = await supabase
          .from('newsletter_signups')
          .insert({
            email: email.toLowerCase(),
            subscribed_at: new Date().toISOString()
          })
          .select()
          .single()

        if (error) {
          supabaseError = error.message
          console.error('Newsletter subscription error:', error)
        } else {
          supabaseSaved = true
        }
      }
    } catch (e) {
      supabaseError = String(e)
      console.error('Supabase connection error:', e)
    }

    // If duplicate in Supabase, return error
    if (supabaseDuplicate) {
      return NextResponse.json(
        { error: 'Already subscribed', message: 'This email is already on our newsletter list' },
        { status: 409 }
      )
    }

    // Always try local fallback
    let localSaved = false
    try {
      await appendLocalRecord('newsletter_signups.json', {
        email: email.toLowerCase(),
        subscribedAt: new Date().toISOString(),
        _savedAt: new Date().toISOString(),
        _source: 'newsletter_subscribe'
      })
      localSaved = true
    } catch (e) {
      console.error('Local persist failed:', e)
    }

    // Return success if either storage worked
    if (supabaseSaved || localSaved) {
      return NextResponse.json(
        { 
          success: true, 
          message: 'Successfully subscribed to newsletter',
          savedTo: {
            supabase: supabaseSaved,
            local: localSaved
          }
        },
        { status: 201 }
      )
    }

    // Only fail if both storages failed
    return NextResponse.json(
      { error: 'Failed to subscribe', details: supabaseError },
      { status: 500 }
    )
  } catch (err) {
    console.error('Newsletter subscribe error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
