'use client'

import { createClient } from '@/utils/supabase/client'

/**
 * Migration utility to transfer localStorage data to Supabase
 * 
 * Usage in browser console:
 * import { migrateLocalStorageToSupabase } from '@/lib/migrations/migrateLocalStorageToSupabase'
 * await migrateLocalStorageToSupabase()
 */

interface WhatsAppSignup {
  firstName: string
  phone: string
}

interface Application {
  fullName: string
  companyName: string
  email: string
  phone: string
  onePitchSentence: string
  proofOfWork?: string
  commitmentAmount?: string
  agreeCommitment?: boolean
}

interface UserProfile {
  userId: string
  name: string
  email: string
  [key: string]: any
}

export async function migrateLocalStorageToSupabase() {
  console.log('🔄 Starting migration from localStorage to Supabase...')

  const supabase = createClient()
  let successCount = 0
  let errorCount = 0

  try {
    // ===== MIGRATE WHATSAPP SIGNUPS =====
    console.log('\n📱 Migrating WhatsApp signups...')
    const whatsappKey = 'whatsapp_signups'
    const whatsappData = localStorage.getItem(whatsappKey)

    if (whatsappData) {
      try {
        const signups: WhatsAppSignup[] = JSON.parse(whatsappData)
        console.log(`Found ${signups.length} WhatsApp signups`)

        for (const signup of signups) {
          const { error } = await supabase
            .from('whatsapp_signups')
            .insert([
              {
                first_name: signup.firstName,
                phone: signup.phone,
              },
            ])

          if (error) {
            console.error(`❌ Failed to migrate WhatsApp signup:`, error)
            errorCount++
          } else {
            successCount++
            console.log(`✅ Migrated: ${signup.firstName} (${signup.phone})`)
          }
        }
      } catch (err) {
        console.error('Error parsing WhatsApp data:', err)
        errorCount++
      }
    }

    // ===== MIGRATE APPLICATIONS =====
    console.log('\n📋 Migrating applications...')
    const applicationsKey = 'applications'
    const applicationsData = localStorage.getItem(applicationsKey)

    if (applicationsData) {
      try {
        const applications: Application[] = JSON.parse(applicationsData)
        console.log(`Found ${applications.length} applications`)

        for (const app of applications) {
          const { error } = await supabase
            .from('applications')
            .insert([
              {
                full_name: app.fullName,
                company_name: app.companyName,
                email: app.email,
                phone: app.phone,
                one_pitch_sentence: app.onePitchSentence,
                proof_of_work: app.proofOfWork || null,
                commitment_amount: app.commitmentAmount || 'AED 500',
                agree_commitment: app.agreeCommitment || false,
              },
            ])

          if (error) {
            console.error(`❌ Failed to migrate application:`, error)
            errorCount++
          } else {
            successCount++
            console.log(`✅ Migrated: ${app.fullName} (${app.companyName})`)
          }
        }
      } catch (err) {
        console.error('Error parsing applications data:', err)
        errorCount++
      }
    }

    // ===== MIGRATE PROFILES =====
    console.log('\n👤 Migrating profiles...')
    const profilesKey = 'profiles'
    const profilesData = localStorage.getItem(profilesKey)

    if (profilesData) {
      try {
        const profiles: UserProfile[] = JSON.parse(profilesData)
        console.log(`Found ${profiles.length} profiles`)

        for (const profile of profiles) {
          const { error } = await supabase
            .from('profiles')
            .insert([
              {
                user_id: profile.userId,
                name: profile.name,
                email: profile.email,
                company: profile.company || null,
                phone: profile.phone || null,
              },
            ])

          if (error) {
            console.error(`❌ Failed to migrate profile:`, error)
            errorCount++
          } else {
            successCount++
            console.log(`✅ Migrated: ${profile.name}`)
          }
        }
      } catch (err) {
        console.error('Error parsing profiles data:', err)
        errorCount++
      }
    }

    // ===== SUMMARY =====
    console.log('\n' + '='.repeat(50))
    console.log('📊 MIGRATION SUMMARY')
    console.log('='.repeat(50))
    console.log(`✅ Successfully migrated: ${successCount} records`)
    console.log(`❌ Failed: ${errorCount} records`)
    console.log('='.repeat(50))

    return {
      success: true,
      successCount,
      errorCount,
      message: `Migration complete! ${successCount} records migrated, ${errorCount} failed.`,
    }
  } catch (err) {
    console.error('Fatal migration error:', err)
    return {
      success: false,
      successCount,
      errorCount,
      message: `Migration failed: ${err}`,
    }
  }
}

/**
 * Verify migration by checking row counts
 */
export async function verifyMigration() {
  console.log('🔍 Verifying migration...\n')

  const supabase = createClient()

  try {
    const [whatsappRes, applicationsRes, profilesRes] = await Promise.all([
      supabase.from('whatsapp_signups').select('id', { count: 'exact' }),
      supabase.from('applications').select('id', { count: 'exact' }),
      supabase.from('profiles').select('id', { count: 'exact' }),
    ])

    console.log(
      `📱 WhatsApp signups: ${whatsappRes.count || 0} records`
    )
    console.log(
      `📋 Applications: ${applicationsRes.count || 0} records`
    )
    console.log(
      `👤 Profiles: ${profilesRes.count || 0} records`
    )

    const totalRecords =
      (whatsappRes.count || 0) +
      (applicationsRes.count || 0) +
      (profilesRes.count || 0)

    console.log(`\n✅ Total records in Supabase: ${totalRecords}`)

    return {
      success: true,
      whatsapp_signups: whatsappRes.count || 0,
      applications: applicationsRes.count || 0,
      profiles: profilesRes.count || 0,
      total: totalRecords,
    }
  } catch (err) {
    console.error('Verification failed:', err)
    return {
      success: false,
      error: err,
    }
  }
}

/**
 * Clear localStorage after successful migration (OPTIONAL - USE WITH CAUTION)
 * Only use after verifying data in Supabase
 */
export function clearLocalStorageAfterMigration() {
  const confirm = window.confirm(
    '⚠️  This will delete localStorage data. Make sure you verified it in Supabase first!\n\nContinue?'
  )

  if (!confirm) {
    console.log('❌ Clear cancelled')
    return
  }

  localStorage.removeItem('whatsapp_signups')
  localStorage.removeItem('applications')
  localStorage.removeItem('profiles')
  localStorage.removeItem('users')

  console.log('✅ localStorage cleared')
}
