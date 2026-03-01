import { NextResponse } from 'next/server'
import { appendLocalRecord } from '@/utils/localDb'

export const runtime = 'nodejs'

const nodemailer = require('nodemailer')

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}))
    const page = body.page || '/' 
    const email = body.email || null
    const name = body.name || null

    // Prepare transporter from env if available
    const host = process.env.SMTP_HOST
    const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined
    const user = process.env.SMTP_USER
    const pass = process.env.SMTP_PASSWORD

    const to = 'katerina@khgroup7.com'

    let emailSent = false
    let emailError = null

    if (!host || !port || !user || !pass) {
      console.log('Notify contact:', { page, to, message: 'SMTP not configured' })
    } else {
      try {
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: process.env.SMTP_SECURE === 'true',
          auth: { user, pass },
        })

        const site = process.env.NEXT_PUBLIC_SITE_URL || 'MYFOUNDERSCLUB'

        await transporter.sendMail({
          from: process.env.NOTIFY_FROM_EMAIL || user,
          to,
          subject: `Contact request from ${site}`,
          text: `A user clicked Contact/Setup on page: ${page} at ${new Date().toISOString()}${email ? `\nEmail: ${email}` : ''}${name ? `\nName: ${name}` : ''}`,
          html: `<p>A user clicked <strong>Contact / Setup</strong> on page: <code>${page}</code></p><p>Time: ${new Date().toISOString()}</p>${email ? `<p>Email: ${email}</p>` : ''}${name ? `<p>Name: ${name}</p>` : ''}`,
        })
        emailSent = true
      } catch (e) {
        emailError = String(e)
        console.error('Email send error:', e)
      }
    }

    // Always try local fallback
    let localSaved = false
    try {
      await appendLocalRecord('contact_notifications.json', {
        page,
        email,
        name,
        emailSent,
        emailError,
        notifiedAt: new Date().toISOString(),
        _savedAt: new Date().toISOString(),
        _source: 'notify_contact'
      })
      localSaved = true
    } catch (e) {
      console.error('Local persist failed:', e)
    }

    // Return success if either email sent or local saved
    if (emailSent || localSaved) {
      return NextResponse.json({ 
        ok: true, 
        savedTo: {
          email: emailSent,
          local: localSaved
        }
      })
    }

    return NextResponse.json({ ok: false, error: emailError || 'Failed to save contact notification' }, { status: 500 })
  } catch (err) {
    console.error('notify-contact error', err)
    return NextResponse.json({ ok: false, error: err instanceof Error ? err.message : 'unknown' }, { status: 500 })
  }
}
