import { NextResponse } from 'next/server'
import { readLocalRecords, writeLocalRecords } from '@/utils/localDb'

type Member = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  location: string
  nationality: string
  status: 'active' | 'pending' | 'under_review'
  profileCompleted: boolean
  joinedAt: string
  whatsapp?: string
  linkedin?: string
}

const seedMembers: Member[] = [
  {
    id: 'm-1',
    firstName: 'Katerina',
    lastName: 'Hayes',
    email: 'katerina@foundrylabs.ai',
    role: 'Startup Founder / Co-Founder',
    location: 'Dubai, UAE',
    nationality: 'Greek',
    status: 'active',
    profileCompleted: true,
    joinedAt: '2026-02-11T10:40:00.000Z',
    whatsapp: '+971501112233',
    linkedin: 'https://linkedin.com/in/katerina-hayes',
  },
  {
    id: 'm-2',
    firstName: 'Faisal',
    lastName: 'Al-Nuaimi',
    email: 'faisal@nabdh.vc',
    role: 'Investor (VC, Angel, Syndicate)',
    location: 'Doha, Qatar',
    nationality: 'Qatari',
    status: 'pending',
    profileCompleted: true,
    joinedAt: '2026-02-19T08:10:00.000Z',
  },
  {
    id: 'm-3',
    firstName: 'Sarah',
    lastName: 'Rahman',
    email: 'sarah@scalebridge.co',
    role: 'Service Provider',
    location: 'Riyadh, Saudi Arabia',
    nationality: 'British',
    status: 'under_review',
    profileCompleted: false,
    joinedAt: '2026-02-23T14:20:00.000Z',
  },
]

export async function GET() {
  try {
    const records = (await readLocalRecords('members.json')) as Member[]
    if (!Array.isArray(records) || records.length === 0) {
      await writeLocalRecords('members.json', seedMembers)
      return NextResponse.json({ members: seedMembers }, { status: 200 })
    }
    return NextResponse.json({ members: records }, { status: 200 })
  } catch (error) {
    console.error('Admin members API error:', error)
    return NextResponse.json({ error: 'Failed to fetch members.' }, { status: 500 })
  }
}
