import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { readLocalRecords, writeLocalRecords } from '@/utils/localDb'
import { createAdminClient } from '@/utils/supabase/admin'

type LocalUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  passwordHash: string
  role: 'member' | 'admin'
  createdAt: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const firstName = String(body?.firstName ?? '').trim()
    const lastName = String(body?.lastName ?? '').trim()
    const email = String(body?.email ?? '').trim().toLowerCase()
    const password = String(body?.password ?? '')

    if (!firstName || !lastName || !email || password.length < 6) {
      return NextResponse.json({ error: 'Please provide all required fields.' }, { status: 400 })
    }

    const users = (await readLocalRecords('auth_users.json')) as LocalUser[]
    if (users.some((u) => u.email === email)) {
      return NextResponse.json({ error: 'This email is already registered.' }, { status: 409 })
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const user: LocalUser = {
      id: crypto.randomUUID(),
      firstName,
      lastName,
      email,
      passwordHash,
      role: 'member',
      createdAt: new Date().toISOString(),
    }

    users.push(user)
    await writeLocalRecords('auth_users.json', users)

    const supabase = createAdminClient()
    if (supabase) {
      try {
        await supabase.from('profiles').insert({
          user_id: user.id,
          name: `${firstName} ${lastName}`.trim(),
          email,
          created_at: new Date().toISOString(),
        })
      } catch (err) {
        console.error('Supabase signup sync failed:', err)
      }
    }

    return NextResponse.json(
      {
        success: true,
        user: { id: user.id, firstName, lastName, email, role: user.role },
        redirectTo: '/profile',
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Auth signup error:', error)
    return NextResponse.json({ error: 'Failed to create account.' }, { status: 500 })
  }
}
