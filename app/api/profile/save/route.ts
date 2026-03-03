import { NextRequest, NextResponse } from 'next/server'
import { appendLocalRecord, readLocalRecords, writeLocalRecords } from '@/utils/localDb'
import { createAdminClient } from '@/utils/supabase/admin'

type MemberRecord = {
  id: string
  firstName: string
  lastName: string
  email: string
  whatsapp: string
  linkedin: string
  twitter?: string
  instagram?: string
  website?: string
  avatarDataUrl?: string
  location: string
  nationality: string
  gender?: string
  role: string
  roleOther?: string
  status: 'active' | 'pending' | 'under_review'
  profileCompleted: boolean
  joinedAt: string
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const firstName = String(body?.firstName ?? '').trim()
    const lastName = String(body?.lastName ?? '').trim()
    const email = String(body?.email ?? '').trim().toLowerCase()
    const whatsapp = String(body?.whatsapp ?? '').trim()
    const linkedin = String(body?.linkedin ?? '').trim()
    const twitter = String(body?.twitter ?? '').trim()
    const instagram = String(body?.instagram ?? '').trim()
    const website = String(body?.website ?? '').trim()
    const avatarDataUrl = String(body?.avatarDataUrl ?? '').trim()
    const location = String(body?.location ?? '').trim()
    const nationality = String(body?.nationality ?? '').trim()
    const gender = String(body?.gender ?? '').trim()
    const role = String(body?.role ?? '').trim()
    const roleOther = String(body?.roleOther ?? '').trim()
    const acceptedTerms = Boolean(body?.acceptedTerms)

    if (!firstName || !lastName || !email || !whatsapp || !linkedin || !location || !nationality || !role || !acceptedTerms) {
      return NextResponse.json({ error: 'Please complete all required fields.' }, { status: 400 })
    }

    const members = (await readLocalRecords('members.json')) as MemberRecord[]
    const now = new Date().toISOString()
    const existingIdx = members.findIndex((m) => m.email === email)

    const member: MemberRecord = {
      id: existingIdx >= 0 ? members[existingIdx].id : crypto.randomUUID(),
      firstName,
      lastName,
      email,
      whatsapp,
      linkedin,
      twitter,
      instagram,
      website,
      avatarDataUrl,
      location,
      nationality,
      gender,
      role,
      roleOther,
      status: 'pending',
      profileCompleted: true,
      joinedAt: existingIdx >= 0 ? members[existingIdx].joinedAt : now,
    }

    if (existingIdx >= 0) members[existingIdx] = member
    else members.push(member)
    await writeLocalRecords('members.json', members)

    await appendLocalRecord('profiles_onboarding.json', { ...member, savedAt: now })

    const supabase = createAdminClient()
    if (supabase) {
      try {
        await supabase.from('profiles').upsert(
          {
            full_name: `${firstName} ${lastName}`.trim(),
            email,
            whatsapp,
            linkedin_url: linkedin,
            location,
            nationality,
            gender,
            role: roleOther ? `${role} (${roleOther})` : role,
            profile_completed: true,
            updated_at: now,
          },
          { onConflict: 'email' }
        )
      } catch (err) {
        console.error('Supabase profile sync failed:', err)
      }
    }

    return NextResponse.json({ success: true, message: 'Profile saved successfully.' }, { status: 200 })
  } catch (error) {
    console.error('Profile save error:', error)
    return NextResponse.json({ error: 'Failed to save profile.' }, { status: 500 })
  }
}
