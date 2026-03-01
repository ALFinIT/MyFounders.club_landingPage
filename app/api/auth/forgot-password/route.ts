import { createClient } from '@supabase/supabase-js'

// Mark this route as dynamic - never cache
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 })
    }

    // Initialize Supabase client at runtime (not build time)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase environment variables')
      return Response.json(
        { error: 'Server configuration error' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Use Supabase's built-in password reset
    const { error } = await supabase.auth.admin.generateLink({
      type: 'recovery',
      email: email,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/auth?mode=recovery`,
      },
    })

    if (error) {
      console.error('Password reset error:', error)
      return Response.json(
        { error: error.message || 'Failed to send reset email' },
        { status: 500 }
      )
    }

    return Response.json({
      message: 'Password reset email sent successfully',
      email: email,
    })
  } catch (error) {
    console.error('Forgot password error:', error)
    return Response.json(
      { error: 'Failed to process password reset request' },
      { status: 500 }
    )
  }
}
