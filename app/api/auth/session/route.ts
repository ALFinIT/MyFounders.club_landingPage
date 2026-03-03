import { NextRequest, NextResponse } from 'next/server'

type SessionUser = {
  id: string
  firstName?: string
  lastName?: string
  email?: string
  role?: 'member' | 'admin'
}

export async function GET(request: NextRequest) {
  const hasSession = request.cookies.get('mfc_session')?.value === 'active'
  const rawUser = request.cookies.get('mfc_user')?.value

  if (!hasSession || !rawUser) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 })
  }

  try {
    const user = JSON.parse(decodeURIComponent(rawUser)) as SessionUser
    if (!user?.id || !user?.email) {
      return NextResponse.json({ authenticated: false, user: null }, { status: 401 })
    }
    return NextResponse.json({ authenticated: true, user }, { status: 200 })
  } catch {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 })
  }
}
