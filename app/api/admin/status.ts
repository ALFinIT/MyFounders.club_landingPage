import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

/**
 * Database Status Verification Endpoint
 * 
 * This endpoint checks if all required Supabase tables exist and are accessible
 * and provides a detailed status report.
 * 
 * Usage:
 * curl http://localhost:3000/api/admin/status
 * 
 * Response will show which tables exist and which are missing
 */

interface TableInfo {
  name: string
  exists: boolean
  error?: string
}

interface StatusResponse {
  timestamp: string
  database: {
    supabase: {
      connected: boolean
      error?: string
      tables: TableInfo[]
      allTablesExist: boolean
    }
    local: {
      applicationsFile: boolean
      whatsappFile: boolean
      newsletterFile: boolean
    }
  }
  summary: {
    readyForProduction: boolean
    missingTables: string[]
    nextSteps: string[]
  }
}

async function checkTableExists(
  supabase: any,
  tableName: string
): Promise<{ exists: boolean; error?: string }> {
  try {
    const { data, error } = await supabase
      .from(tableName)
      .select('*', { count: 'exact', head: true })

    if (error) {
      if (error.message.includes('Could not find the table')) {
        return { exists: false, error: `Table '${tableName}' does not exist` }
      }
      return { exists: false, error: error.message }
    }

    return { exists: true }
  } catch (err) {
    return {
      exists: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}

async function checkLocalFiles(): Promise<{
  applicationsFile: boolean
  whatsappFile: boolean
  newsletterFile: boolean
}> {
  try {
    const fs = await import('fs/promises')
    const path = await import('path')

    const dataDir = path.default.join(process.cwd(), 'data')

    const appExists = await fs.default
      .access(path.default.join(dataDir, 'applications.json'))
      .then(() => true)
      .catch(() => false)

    const whatsappExists = await fs.default
      .access(path.default.join(dataDir, 'whatsapp_signups.json'))
      .then(() => true)
      .catch(() => false)

    const newsletterExists = await fs.default
      .access(path.default.join(dataDir, 'newsletters.json'))
      .then(() => true)
      .catch(() => false)

    return {
      applicationsFile: appExists,
      whatsappFile: whatsappExists,
      newsletterFile: newsletterExists,
    }
  } catch {
    return {
      applicationsFile: false,
      whatsappFile: false,
      newsletterFile: false,
    }
  }
}

export async function GET(): Promise<NextResponse<StatusResponse>> {
  const timestamp = new Date().toISOString()

  try {
    const cookieStore = await cookies()
    const supabase = await createClient(cookieStore)

    // Check if we can connect to Supabase
    const requiredTables = [
      'whatsapp_signups',
      'applications',
      'newsletter_signups',
      'profiles',
    ]

    const tableStatus: TableInfo[] = []
    let supabaseConnected = true
    let supabaseError: string | undefined

    for (const table of requiredTables) {
      const { exists, error } = await checkTableExists(supabase, table)
      tableStatus.push({
        name: table,
        exists,
        error,
      })

      if (!exists && !supabaseError) {
        supabaseError = error
      }
    }

    const allTablesExist = tableStatus.every((t) => t.exists)

    // Check local files
    const localFiles = await checkLocalFiles()

    const missingTables = tableStatus
      .filter((t) => !t.exists)
      .map((t) => t.name)

    const nextSteps: string[] = []

    if (!allTablesExist) {
      nextSteps.push('CREATE_SUPABASE_TABLES')
    }

    if (localFiles.applicationsFile) {
      nextSteps.push('MIGRATE_LOCAL_DATA_TO_SUPABASE')
    }

    if (allTablesExist && !localFiles.applicationsFile) {
      nextSteps.push('SYSTEM_READY_FOR_USE')
    }

    const response: StatusResponse = {
      timestamp,
      database: {
        supabase: {
          connected: supabaseConnected && allTablesExist,
          error: supabaseError,
          tables: tableStatus,
          allTablesExist,
        },
        local: localFiles,
      },
      summary: {
        readyForProduction: allTablesExist,
        missingTables,
        nextSteps,
      },
    }

    return NextResponse.json(response, { status: 200 })
  } catch (err) {
    console.error('Status check error:', err)

    const errorResponse: StatusResponse = {
      timestamp,
      database: {
        supabase: {
          connected: false,
          error: err instanceof Error ? err.message : 'Unknown error',
          tables: [],
          allTablesExist: false,
        },
        local: {
          applicationsFile: false,
          whatsappFile: false,
          newsletterFile: false,
        },
      },
      summary: {
        readyForProduction: false,
        missingTables: ['all'],
        nextSteps: ['DEBUG_CONNECTION_ERROR'],
      },
    }

    return NextResponse.json(errorResponse, { status: 500 })
  }
}
