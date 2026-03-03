import { NextRequest, NextResponse } from 'next/server'
import { readLocalRecords } from '@/utils/localDb'

type SessionUser = {
  email?: string
}

export async function GET(request: NextRequest) {
  try {
    const raw = request.cookies.get('mfc_user')?.value
    if (!raw) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    let session: SessionUser | null = null
    try {
      session = JSON.parse(decodeURIComponent(raw)) as SessionUser
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const email = String(session?.email ?? '').trim().toLowerCase()
    if (!email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const members = (await readLocalRecords('members.json')) as Array<Record<string, unknown>>
    const found = members.find((m) => String(m?.email ?? '').trim().toLowerCase() === email) ?? null

    return NextResponse.json({ member: found }, { status: 200 })
  } catch (error) {
    console.error('Profile me API error:', error)
    return NextResponse.json({ error: 'Failed to load profile.' }, { status: 500 })
  }
}
