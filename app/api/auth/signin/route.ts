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
      return NextResponse.json(
        {
          success: true,
          user: {
            id: 'demo-admin',
            firstName: 'MFC',
            lastName: 'Admin',
            email,
            role: 'admin',
          },
          redirectTo: '/admin',
        },
        { status: 200 }
      )
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
      try {
        await supabase
          .from('profiles')
          .upsert({ user_id: found.id, email: found.email, last_login_at: now, updated_at: now }, { onConflict: 'email' })
      } catch (err) {
        console.error('Supabase signin sync failed:', err)
      }
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          id: found.id,
          firstName: found.firstName,
          lastName: found.lastName,
          email: found.email,
          role: found.role,
        },
        redirectTo: found.role === 'admin' ? '/admin' : '/profile',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Auth signin error:', error)
    return NextResponse.json({ error: 'Failed to sign in.' }, { status: 500 })
  }
}
