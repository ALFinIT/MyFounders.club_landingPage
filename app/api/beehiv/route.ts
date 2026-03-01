import { NextResponse } from 'next/server'

// Mark this route as dynamic - never cache
export const dynamic = 'force-dynamic'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import fs from 'fs/promises'
import path from 'path'

async function getStoredEmails() {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'newsletter_signups.json')
    const data = await fs.readFile(dataPath, 'utf-8')
    return JSON.parse(data).map((item: any) => item.email)
  } catch {
    return []
  }
}

async function saveEmail(email: string) {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'newsletter_signups.json')
    let existing = []
    try {
      const data = await fs.readFile(dataPath, 'utf-8')
      existing = JSON.parse(data)
    } catch {
      existing = []
    }

    existing.push({ email, subscribedAt: new Date().toISOString() })
    await fs.writeFile(dataPath, JSON.stringify(existing, null, 2))
  } catch (err) {
    console.error('Error saving to file:', err)
  }
}

export async function POST(req: Request) {
  try {
    let body
    try {
      body = await req.json()
    } catch (parseErr) {
      return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
    }

    const { email } = body

    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'Missing email' }, { status: 400 })
    }

    const trimmedEmail = email.trim().toLowerCase()

    // Check if email already exists in our file storage
    const storedEmails = await getStoredEmails()
    if (storedEmails.includes(trimmedEmail)) {
      return NextResponse.json(
        { error: 'This email is already subscribed', type: 'duplicate' },
        { status: 409 }
      )
    }

    // Save to local file IMMEDIATELY
    await saveEmail(trimmedEmail)

    // Return success immediately - don't wait for Supabase or Beehiv
    // These will be handled in the background
    const response = NextResponse.json(
      { data: { email: trimmedEmail, saved_locally: true }, status: 'success' },
      { status: 200 }
    )

    // Background sync with Supabase and Beehiv (non-blocking)
    ;(async () => {
      try {
        const cookieStore = await cookies()
        const supabase = await createClient(cookieStore)
        await supabase
          .from('newsletter_signups')
          .insert([{ email: trimmedEmail, subscribed_at: new Date().toISOString() }])
      } catch (dbErr) {
        console.warn('Background Supabase sync failed (non-blocking):', dbErr)
      }

      try {
  const tryBeehiv = async (apiUrl: string | undefined, apiKey: string | undefined) => {
    if (!apiUrl || !apiKey) return false
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({ email: trimmedEmail }),
    })
    return res.ok
  }

  // Try V2 first
  const v2Success = await tryBeehiv(process.env.BEEHIV_API_URL_V2, process.env.BEEHIV_API_KEY_V2)

  // If V2 fails, try V1
  if (!v2Success) {
    const v1Success = await tryBeehiv(process.env.BEEHIV_API_URL_V1, process.env.BEEHIV_API_KEY_V1)
    if (!v1Success) console.warn('Both Beehiv V1 and V2 failed for', trimmedEmail)
  }
} catch (beehivErr) {
  console.warn('Beehiv sync error:', beehivErr)
}

    })()

    return response
  } catch (err) {
    console.error('Newsletter route error', err)
    return NextResponse.json({ error: 'Internal server error', type: 'server_error' }, { status: 500 })
  }
}
