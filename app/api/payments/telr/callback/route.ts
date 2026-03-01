import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Mark this route as dynamic
export const dynamic = 'force-dynamic'

const nodemailer = require('nodemailer')

// Initialize clients lazily
function initializeClients() {
  const TELR_STORE_ID = process.env.TELR_STORE_ID || ''
  const TELR_AUTHKEY = process.env.TELR_AUTHKEY || ''

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are not configured')
  }

  const transporterInstance = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  const supabaseInstance = createClient(supabaseUrl, supabaseKey)

  return {
    TELR_STORE_ID,
    TELR_AUTHKEY,
    transporter: transporterInstance,
    supabase: supabaseInstance,
  }
}

/**
 * Handle Telr payment callbacks (webhook)
 * Telr POSTs payment status updates to this endpoint
 * 
 * Can receive data as:
 * - JSON (Content-Type: application/json)
 * - Form data (Content-Type: application/x-www-form-urlencoded)
 * - Query params (GET request)
 */
export async function POST(req: NextRequest) {
  return handleCallback(req)
}

export async function GET(req: NextRequest) {
  return handleCallback(req)
}

async function handleCallback(req: NextRequest) {
  try {
    const { TELR_STORE_ID, TELR_AUTHKEY, transporter, supabase } = initializeClients()

    let data: any = {}

    // Parse data based on content type
    const contentType = req.headers.get('content-type') || ''

    if (contentType.includes('application/json')) {
      // JSON request body
      data = await req.json()
    } else if (contentType.includes('application/x-www-form-urlencoded')) {
      // Form data
      const formData = await req.formData()
      Array.from(formData.entries()).forEach(([key, value]) => {
        data[key] = value
      })
    } else {
      // Try to get from query params
      const url = new URL(req.url)
      url.searchParams.forEach((value, key) => {
        data[key] = value
      })
    }

    console.log('📥 Telr Callback Received:', {
      timestamp: new Date().toISOString(),
      refno: data.refno || data.ref,
      status: data.status,
      amount: data.amount,
    })

    // Extract payment reference (could be 'refno', 'ref', 'reference')
    const reference = data.refno || data.ref || data.reference

    if (!reference) {
      console.error('❌ Missing payment reference in callback')
      return NextResponse.json(
        { error: 'Missing payment reference' },
        { status: 400 }
      )
    }

    // Find subscription by payment ID
    const { data: subscription, error: findError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('payment_id', reference)
      .single()

    if (findError || !subscription) {
      console.error('❌ Subscription not found:', { reference, error: findError })
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }

    // Determine payment status
    // Telr status: "1" = success, "0" = failed, "A" = pending
    const paymentStatus = 
      data.status === '1' || data.status === 'A' ? 'completed' : 
      data.status === '0' ? 'failed' : 
      'pending'

    console.log('📊 Processing payment:', {
      reference,
      status: paymentStatus,
      email: subscription.email,
    })

    // Update subscription record
    const { error: updateError } = await supabase
      .from('subscriptions')
      .update({
        payment_status: paymentStatus,
        subscription_status: paymentStatus === 'completed' ? 'active' : 'inactive',
        updated_at: new Date().toISOString(),
      })
      .eq('id', subscription.id)

    if (updateError) {
      console.error('❌ Error updating subscription:', updateError)
      return NextResponse.json({ error: 'Failed to update subscription' }, { status: 500 })
    }

    // Log transaction
    try {
      await supabase.from('payment_transactions').insert({
        subscription_id: subscription.id,
        transaction_type: 'initial',
        amount_aed: subscription.amount_aed,
        amount_usd: subscription.amount_usd,
        currency: 'AED',
        payment_gateway: 'telr',
        gateway_transaction_id: data.tranref || data.ref || reference,
        gateway_response: JSON.stringify({
          refno: reference,
          status: data.status,
          amount: data.amount,
          timestamp: new Date().toISOString(),
        }),
        status: paymentStatus,
        completed_at: paymentStatus === 'completed' ? new Date().toISOString() : null,
        error_message: paymentStatus === 'failed' ? 'Payment declined by Telr' : null,
      })
    } catch (transError) {
      console.error('⚠️ Failed to log transaction:', transError)
      // Don't fail the callback if transaction logging fails
    }

    // Send confirmation email if successful
    if (paymentStatus === 'completed') {
      try {
        await sendConfirmationEmail(
          transporter,
          subscription.email,
          subscription.full_name,
          subscription.tier,
          subscription.billing_cycle,
          subscription.amount_aed
        )

        // Mark email as sent
        await supabase
          .from('subscriptions')
          .update({
            confirmation_email_sent: true,
            confirmation_email_sent_at: new Date().toISOString(),
          })
          .eq('id', subscription.id)

        console.log('✉️ Confirmation email sent to', subscription.email)
      } catch (emailError) {
        console.error('⚠️ Failed to send confirmation email:', emailError)
        // Don't fail the payment if email fails
      }
    }

    console.log('✅ Callback processed successfully')

    return NextResponse.json({
      success: true,
      message: `Payment ${paymentStatus}`,
      subscriptionId: subscription.id,
    })
  } catch (error) {
    console.error('❌ Telr callback error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Callback processing failed' },
      { status: 500 }
    )
  }
}

/**
 * Send confirmation email after successful payment
 */
async function sendConfirmationEmail(
  transporter: any,
  email: string,
  fullName: string,
  tier: string,
  billingCycle: string,
  amountAED: number
): Promise<void> {
  try {
    const tierName = tier.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')

    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@myfounders.club',
      to: email,
      subject: 'Payment Confirmed - Welcome to My Founders Club',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0;">Welcome to MyFoundersClub!</h1>
          </div>

          <div style="padding: 30px; background: #f9f9f9; border-radius: 0 0 8px 8px;">
            <p>Hi <strong>${fullName}</strong>,</p>

            <p>Thank you for subscribing to <strong>${tierName}</strong> on MyFoundersClub. Your payment has been successfully processed.</p>

            <div style="background: white; padding: 20px; border-left: 4px solid #ff6b35; margin: 20px 0;">
              <h3 style="margin: 0 0 15px 0;">Subscription Details</h3>
              <p style="margin: 8px 0;"><strong>Plan:</strong> ${tierName}</p>
              <p style="margin: 8px 0;"><strong>Billing Cycle:</strong> ${billingCycle.charAt(0).toUpperCase() + billingCycle.slice(1)}</p>
              <p style="margin: 8px 0;"><strong>Amount Paid:</strong> AED ${amountAED.toFixed(2)}</p>
              <p style="margin: 8px 0;"><strong>Status:</strong> <span style="color: #22c55e; font-weight: bold;">Active</span></p>
            </div>

            <p>Your subscription is now active. You can access all the benefits and features immediately.</p>

            <p style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #ff6b35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Go to Dashboard</a>
            </p>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">

            <div style="background: #f0fdf4; padding: 15px; border-radius: 5px; border-left: 4px solid #22c55e;">
              <p style="margin: 0; color: #166534;"><strong>Next Steps:</strong></p>
              <ul style="margin: 10px 0 0 20px; color: #166534;">
                <li>Join our WhatsApp founder channel</li>
                <li>Complete your profile at /setup-profile</li>
                <li>Connect with other founders in the ecosystem</li>
              </ul>
            </div>

            <p style="color: #666; font-size: 12px; text-align: center; margin-top: 30px;">
              If you have any questions, please contact our support team at <a href="mailto:support@myfounders.club" style="color: #ff6b35;">support@myfounders.club</a>
            </p>
          </div>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
  } catch (error) {
    console.error('❌ Email sending failed:', error)
    throw error
  }
}

