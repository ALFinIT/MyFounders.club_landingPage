import { NextResponse } from 'next/server'
import { readLocalRecords } from '@/utils/localDb'
import { createAdminClient } from '@/utils/supabase/admin'

const TOTAL_CAPACITY = 500

type SubmissionRecord = {
  confirmed?: boolean
}

function clampSpots(value: number) {
  if (Number.isNaN(value)) return TOTAL_CAPACITY
  return Math.max(0, Math.min(TOTAL_CAPACITY, value))
}

export async function GET() {
  try {
    const local = (await readLocalRecords('survey_submissions.json')) as SubmissionRecord[]
    const localConfirmed = local.filter((entry) => entry?.confirmed !== false).length

    let confirmed = localConfirmed
    const supabase = createAdminClient()
    if (supabase) {
      try {
        const { count } = await supabase
          .from('survey_submissions')
          .select('*', { count: 'exact', head: true })
        if (typeof count === 'number') {
          confirmed = Math.max(confirmed, count)
        }
      } catch (error) {
        console.error('Supabase spot count failed:', error)
      }
    }

    const remaining = clampSpots(TOTAL_CAPACITY - confirmed)
    return NextResponse.json(
      {
        totalCapacity: TOTAL_CAPACITY,
        totalConfirmedBookings: confirmed,
        remainingSpots: remaining,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Spot counter error:', error)
    return NextResponse.json(
      {
        totalCapacity: TOTAL_CAPACITY,
        totalConfirmedBookings: 0,
        remainingSpots: TOTAL_CAPACITY,
      },
      { status: 200 }
    )
  }
}
