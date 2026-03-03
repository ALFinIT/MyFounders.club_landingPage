import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

export function createAdminClient() {
  if (!supabaseUrl || (!serviceRoleKey && !anonKey)) return null
  return createClient(supabaseUrl, serviceRoleKey ?? anonKey!)
}
