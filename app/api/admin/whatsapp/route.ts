import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { readFileSync } from 'fs'
import { join } from 'path'

// Mark this route as dynamic - never cache
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Try Supabase first
    try {
      const cookieStore = await cookies()
      const supabase = await createClient(cookieStore)

      const { data, error } = await supabase
        .from('whatsapp_signups')
        .select('*')
        .order('created_at', { ascending: false })

      if (!error && data && data.length > 0) {
        return NextResponse.json(data || [], { status: 200 })
      }
    } catch (e) {
      console.error('Supabase error:', e)
    }

    // Fallback to local storage
    const filePath = join(process.cwd(), 'data', 'whatsapp_signups.json')
    const content = readFileSync(filePath, 'utf-8')
    const jsonData = JSON.parse(content)
    const signups = Array.isArray(jsonData) ? jsonData : jsonData.value || []

    return NextResponse.json(signups, { status: 200 })
  } catch (err) {
    console.error('Admin whatsapp error', err)
    return NextResponse.json({ error: 'Internal server error', details: String(err) }, { status: 500 })
  }
}
