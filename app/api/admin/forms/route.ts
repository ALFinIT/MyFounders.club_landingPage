import { NextResponse } from 'next/server'
import { readLocalRecords } from '@/utils/localDb'

type WaitlistRecord = {
  id?: string
  firstName?: string
  lastName?: string
  email?: string
  country?: string
  stage?: string
  goal?: string
  createdAt?: string
}

type SurveyRecord = {
  id?: string
  clientSubmissionId?: string
  submittedAt?: string
  answers?: {
    fullName?: string
    companyName?: string
    role?: string
    country?: string
    industry?: string
    stage?: string
  }
}

export async function GET() {
  try {
    const waitlist = (await readLocalRecords('applications.json')) as WaitlistRecord[]
    const survey = (await readLocalRecords('survey_submissions.json')) as SurveyRecord[]

    return NextResponse.json(
      {
        waitlist: Array.isArray(waitlist) ? waitlist : [],
        surveySubmissions: Array.isArray(survey) ? survey : [],
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Admin forms API error:', error)
    return NextResponse.json({ error: 'Failed to fetch form details.' }, { status: 500 })
  }
}
