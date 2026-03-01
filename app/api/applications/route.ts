import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { appendLocalRecord } from '@/utils/localDb'
import { cookies } from 'next/headers'
import { readFileSync } from 'fs'
import { join } from 'path'

// Mark this route as dynamic - never cache
export const dynamic = 'force-dynamic'

// Get client IP from request
function getClientIP(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') || 'unknown'
  return ip
}

// Check for duplicates in local database
function checkLocalDuplicates(email: string, phone: string, ip: string): { exists: boolean; field?: string } {
  try {
    const filePath = join(process.cwd(), 'data', 'applications.json')
    const content = readFileSync(filePath, 'utf-8')
    const data = JSON.parse(content)
    const records = Array.isArray(data) ? data : data.value || []

    for (const record of records) {
      if (record.email?.toLowerCase() === email.toLowerCase()) {
        return { exists: true, field: 'email' }
      }
      if (record.phone === phone) {
        return { exists: true, field: 'phone' }
      }
      if (record._ip === ip) {
        return { exists: true, field: 'ip' }
      }
    }
  } catch (e) {
    console.error('Error checking local duplicates:', e)
  }

  return { exists: false }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      fullName,
      companyName,
      email,
      phone,
      onePitchSentence,
      proofOfWork,
      commitmentAmount,
      agreeCommitment,
    } = body

    if (!fullName || !companyName || !email || !phone || !onePitchSentence) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const clientIP = getClientIP(req)

    // Check for duplicates locally
    const localDuplicateCheck = checkLocalDuplicates(email, phone, clientIP)
    if (localDuplicateCheck.exists) {
      return NextResponse.json(
        {
          error: `This ${localDuplicateCheck.field} is already registered. One application per ${localDuplicateCheck.field} only.`,
          duplicate: true,
          field: localDuplicateCheck.field,
        },
        { status: 409 }
      )
    }

    let supabaseSaved = false
    let supabaseError = null
    let supabaseDuplicate = false

    // Try Supabase
    try {
      const cookieStore = await cookies()
      const supabase = await createClient(cookieStore)

      // Check for duplicates in Supabase
      const { data: existingEmail } = await supabase
        .from('applications')
        .select('id')
        .eq('email', email)
        .limit(1)

      const { data: existingPhone } = await supabase
        .from('applications')
        .select('id')
        .eq('phone', phone)
        .limit(1)

      if ((existingEmail && existingEmail.length > 0) || (existingPhone && existingPhone.length > 0)) {
        supabaseDuplicate = true
        supabaseError = existingEmail?.length ? 'email' : 'phone'
      } else {
        const { data, error } = await supabase
          .from('applications')
          .insert([
            {
              full_name: fullName,
              company_name: companyName,
              email,
              phone,
              one_pitch_sentence: onePitchSentence,
              proof_of_work: proofOfWork || null,
              commitment_amount: commitmentAmount || 'AED 500',
              agree_commitment: !!agreeCommitment,
              client_ip: clientIP,
            },
          ])
          .select()

        if (error) {
          supabaseError = error.message
          console.error('Supabase error:', error)
        } else {
          supabaseSaved = true
        }
      }
    } catch (e) {
      supabaseError = String(e)
      console.error('Supabase connection error:', e)
    }

    // If duplicate in Supabase, return error
    if (supabaseDuplicate) {
      return NextResponse.json(
        {
          error: `This ${supabaseError} is already registered in our system. One application per ${supabaseError} only.`,
          duplicate: true,
          field: supabaseError,
        },
        { status: 409 }
      )
    }

    // Save to local storage
    let localSaved = false
    try {
      await appendLocalRecord('applications.json', {
        fullName,
        companyName,
        email,
        phone,
        onePitchSentence,
        proofOfWork,
        commitmentAmount,
        agreeCommitment,
        _savedAt: new Date().toISOString(),
        _ip: clientIP,
        _source: 'application_form',
      })
      localSaved = true
    } catch (e) {
      console.error('Local persist failed:', e)
    }

    // Return success if either storage worked
    if (supabaseSaved || localSaved) {
      return NextResponse.json(
        {
          success: true,
          message: 'Application submitted successfully',
          data: { fullName, email, phone },
          savedTo: {
            supabase: supabaseSaved,
            local: localSaved,
          },
        },
        { status: 200 }
      )
    }

    // Only fail if both storages failed
    return NextResponse.json(
      {
        error: 'Failed to save application',
        details: supabaseError,
      },
      { status: 500 }
    )
  } catch (err) {
    console.error('Applications API error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
