/**
 * Supabase Database Setup & Migration Guide
 * 
 * This guide helps you:
 * 1. Create database tables in Supabase
 * 2. Migrate existing localStorage data to Supabase
 * 3. Verify the connection
 */

// ============================================================================
// STEP 1: CREATE TABLES IN SUPABASE
// ============================================================================
/**
 * 1. Log in to your Supabase project: https://app.supabase.com
 * 2. Go to SQL Editor (in the sidebar)
 * 3. Click "New Query"
 * 4. Copy and paste the entire content of: supabase/init.sql
 * 5. Click "Run" to execute
 * 
 * This creates three tables:
 * - whatsapp_signups (First Name, Phone)
 * - applications (Full application form data)
 * - profiles (User profile data)
 */

// ============================================================================
// STEP 2: CONFIGURE ENVIRONMENT VARIABLES
// ============================================================================
/**
 * Create/Update .env.local in your project root:
 */
export const ENV_EXAMPLE = `
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://ibpqvfqhmecgyevjbtqo.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=sb_publishable_m8LmfPh0IJ0g2byAa1pfSQ_WC96lNZc
`;

// ============================================================================
// STEP 3: MIGRATE LOCALSTORAGE DATA TO SUPABASE
// ============================================================================
/**
 * If you have existing localStorage data, use the migration script:
 * See: lib/migrations/migrateLocalStorageToSupabase.ts
 * 
 * This will:
 * 1. Extract all localStorage data
 * 2. Transform it to match Supabase table schema
 * 3. Upload to Supabase tables
 * 4. Verify the data synced successfully
 */

// ============================================================================
// STEP 4: VERIFY CONNECTION
// ============================================================================
/**
 * Run: pnpm dev
 * 
 * Then:
 * 1. Submit a WhatsApp form
 * 2. Go to Supabase Dashboard → whatsapp_signups table
 * 3. Verify the new entry appears
 * 
 * Repeat for "Secure Your Spot" form → applications table
 */

// ============================================================================
// DATABASE SCHEMA REFERENCE
// ============================================================================
export const DATABASE_SCHEMA = {
  whatsapp_signups: {
    id: 'uuid (auto-generated)',
    first_name: 'text',
    phone: 'text',
    created_at: 'timestamptz (auto)',
  },
  applications: {
    id: 'uuid (auto-generated)',
    full_name: 'text (required)',
    company_name: 'text (required)',
    email: 'text (required)',
    phone: 'text (required)',
    one_pitch_sentence: 'text (required)',
    proof_of_work: 'text (optional)',
    commitment_amount: 'text (default: AED 500)',
    agree_commitment: 'boolean (default: false)',
    created_at: 'timestamptz (auto)',
  },
  profiles: {
    id: 'uuid (auto-generated)',
    user_id: 'text (unique)',
    name: 'text',
    company: 'text',
    email: 'text',
    phone: 'text',
    created_at: 'timestamptz (auto)',
  },
};

export default DATABASE_SCHEMA;
