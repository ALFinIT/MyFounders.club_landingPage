import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { appendLocalRecord, readLocalRecords } from '@/utils/localDb'
import { createAdminClient } from '@/utils/supabase/admin'

type LocalUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  passwordHash: string
  role: 'member' | 'admin'
}

const SESSION_MAX_AGE = 60 * 60 * 24 * 7

function attachSessionCookies(response: NextResponse, user: { id: string; firstName: string; lastName: string; email: string; role: 'member' | 'admin' }) {
  const safeUser = encodeURIComponent(
    JSON.stringify({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    })
  )

  response.cookies.set('mfc_session', 'active', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
  response.cookies.set('mfc_role', user.role, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
  response.cookies.set('mfc_user', safeUser, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  })
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const email = String(body?.email ?? '').trim().toLowerCase()
    const password = String(body?.password ?? '')

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required.' }, { status: 400 })
    }

    if (email === 'admin@mfc.demo' && password === 'admin123') {
      await appendLocalRecord('auth_signins.json', {
        id: crypto.randomUUID(),
        email,
        role: 'admin',
        signedInAt: new Date().toISOString(),
        source: 'demo',
      })
      const user = {
        id: 'demo-admin',
        firstName: 'MFC',
        lastName: 'Admin',
        email,
        role: 'admin' as const,
      }
      const response = NextResponse.json(
        {
          success: true,
          user,
          redirectTo: '/admin',
        },
        { status: 200 }
      )
      attachSessionCookies(response, user)
      return response
    }

    const users = (await readLocalRecords('auth_users.json')) as LocalUser[]
    const found = users.find((u) => u.email === email)
    if (!found) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
    }

    const isValid = await bcrypt.compare(password, found.passwordHash)
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials.' }, { status: 401 })
    }

    const now = new Date().toISOString()
    await appendLocalRecord('auth_signins.json', {
      id: crypto.randomUUID(),
      userId: found.id,
      email: found.email,
      role: found.role,
      signedInAt: now,
      source: 'local_auth',
    })

    const supabase = createAdminClient()
    if (supabase) {
      void (async () => {
        try {
          await supabase
            .from('profiles')
            .upsert({ user_id: found.id, email: found.email, last_login_at: now, updated_at: now }, { onConflict: 'email' })
        } catch (err) {
          console.error('Supabase signin sync failed:', err)
        }
      })()
    }

    const user = {
      id: found.id,
      firstName: found.firstName,
      lastName: found.lastName,
      email: found.email,
      role: found.role,
    }
    const response = NextResponse.json(
      {
        success: true,
        user,
        redirectTo: found.role === 'admin' ? '/admin' : '/profile',
      },
      { status: 200 }
    )
    attachSessionCookies(response, user)
    return response
  } catch (error) {
    console.error('Auth signin error:', error)
    return NextResponse.json({ error: 'Failed to sign in.' }, { status: 500 })
  }
}
