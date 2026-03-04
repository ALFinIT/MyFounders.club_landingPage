import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

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
    const token = request.headers.get('authorization')?.replace('Bearer ', '').trim()
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

    if (!token || !supabaseUrl || !supabaseAnon) {
      return NextResponse.json({ error: 'OAuth is not configured.' }, { status: 400 })
    }

    const supabase = createClient(supabaseUrl, supabaseAnon)
    const { data, error } = await supabase.auth.getUser(token)
    if (error || !data?.user?.email) {
      return NextResponse.json({ error: 'Invalid OAuth session.' }, { status: 401 })
    }

    const firstName = String(data.user.user_metadata?.first_name ?? data.user.user_metadata?.full_name?.split(' ')?.[0] ?? 'Member')
    const lastName = String(data.user.user_metadata?.last_name ?? data.user.user_metadata?.full_name?.split(' ')?.slice(1).join(' ') ?? '')

    const user = {
      id: data.user.id,
      firstName,
      lastName,
      email: data.user.email,
      role: 'member' as const,
    }

    const response = NextResponse.json({ success: true, user, redirectTo: '/profile' }, { status: 200 })
    attachSessionCookies(response, user)
    return response
  } catch {
    return NextResponse.json({ error: 'Failed to establish OAuth session.' }, { status: 500 })
  }
}

