import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

// Mark this route as dynamic - never cache
export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const cookieStore = await cookies()
    const supabase = await createClient(cookieStore)

    const { data, error } = await supabase
      .from('newsletter_signups')
      .select('*')
      .order('subscribed_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json(data || [], { status: 200 })
  } catch (err) {
    console.error('Admin newsletter error', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
