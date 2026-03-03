import { NextResponse } from 'next/server'

function clearSessionCookies(response: NextResponse) {
  const options = {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  }

  response.cookies.set('mfc_session', '', options)
  response.cookies.set('mfc_role', '', options)
  response.cookies.set('mfc_user', '', options)
}

export async function POST() {
  const response = NextResponse.json({ success: true }, { status: 200 })
  clearSessionCookies(response)
  return response
}
