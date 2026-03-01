import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Mark this route as dynamic - never cache, always run at request time
export const dynamic = 'force-dynamic'

const Stripe = require('stripe')
const nodemailer = require('nodemailer')

// Initialize clients lazily inside handlers
function initializeClients() {
  const stripeInstance = new (typeof Stripe === 'function' ? Stripe : Stripe.default)(process.env.STRIPE_SECRET_KEY || '', {
    apiVersion: '2024-06-20',
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase environment variables are not configured')
  }

  const supabaseInstance = createClient(supabaseUrl, supabaseKey)

  const transporterInstance = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })

  return { stripe: stripeInstance, supabase: supabaseInstance, transporter: transporterInstance }
}

/**
 * POST /api/payments/stripe/create-payment-intent
 * 
 * Creates a Stripe payment intent for the subscription
 * 
 * Request body:
 * {
 *   "tier": "founder-pass",
 *   "billingCycle": "monthly",
 *   "email": "user@example.com",
 *   "fullName": "John Doe"
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const { stripe, supabase, transporter } = initializeClients()

    const body = await req.json()
    const { tier, billingCycle, email, fullName, userId } = body

    if (!tier || !billingCycle || !email || !fullName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate tier and billing cycle
    const validTiers = ['founder-pass', 'scale-plan', 'enterprise']
    const validBillingCycles = ['monthly', 'annual']

    if (!validTiers.includes(tier) || !validBillingCycles.includes(billingCycle)) {
      return NextResponse.json(
        { error: 'Invalid tier or billing cycle' },
        { status: 400 }
      )
    }

    // Get pricing from database
    const { data: pricingData, error: pricingError } = await supabase
      .from('pricing_tiers')
      .select('*')
      .eq('tier_name', tier)
      .single()

    if (pricingError || !pricingData) {
      return NextResponse.json(
        { error: 'Pricing tier not found' },
        { status: 404 }
      )
    }

    // Get amount in cents (Stripe works with cents)
    const amountAED = billingCycle === 'monthly' 
      ? pricingData.price_monthly_aed 
      : pricingData.price_annual_aed
    
    const amountUSD = billingCycle === 'monthly'
      ? pricingData.price_monthly_usd
      : pricingData.price_annual_usd

    // Convert AED to USD (Stripe typically processes in USD)
    const amountCents = Math.round(amountUSD * 100)

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: 'usd',
      description: `${tier} subscription - ${billingCycle}`,
      metadata: {
        tier,
        billingCycle,
        email,
        fullName,
        userId: userId || '',
      },
      receipt_email: email,
    })

    // Save subscription record with pending status
    const { data: subscription, error: subscriptionError } = await supabase
      .from('subscriptions')
      .insert({
        user_id: userId || email,
        email,
        full_name: fullName,
        tier,
        billing_cycle: billingCycle,
        amount_aed: amountAED,
        amount_usd: amountUSD,
        currency: 'USD',
        payment_gateway: 'stripe',
        payment_status: 'pending',
        payment_id: paymentIntent.id,
        subscription_status: 'active',
        start_date: new Date().toISOString(),
        ip_address: req.headers.get('x-forwarded-for') || '',
      })
      .select()
      .single()

    if (subscriptionError) {
      console.error('Error creating subscription record:', subscriptionError)
    }

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      subscriptionId: subscription?.id,
    })
  } catch (error) {
    console.error('Stripe payment error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Payment processing failed' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/payments/stripe/confirm-payment
 * 
 * Confirms payment and updates subscription status
 * 
 * Request body:
 * {
 *   "paymentIntentId": "pi_xxxxx",
 *   "subscriptionId": "uuid"
 * }
 */
export async function PUT(req: NextRequest) {
  try {
    const { stripe, supabase, transporter } = initializeClients()
    
    const body = await req.json()
    const { paymentIntentId, subscriptionId } = body

    if (!paymentIntentId || !subscriptionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Retrieve payment intent from Stripe
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)

    // Update subscription status based on payment intent
    if (paymentIntent.status === 'succeeded') {
      const { data: subscription, error: updateError } = await supabase
        .from('subscriptions')
        .update({
          payment_status: 'completed',
          subscription_status: 'active',
          confirmation_email_sent: false, // Will be set to true after email sent
          updated_at: new Date().toISOString(),
        })
        .eq('id', subscriptionId)
        .select()
        .single()

      if (!updateError) {
        // Send confirmation email
        await sendConfirmationEmail(
          transporter,
          subscription.email,
          subscription.full_name,
          subscription.tier,
          subscription.billing_cycle,
          subscription.amount_usd
        )

        // Update email sent flag
        await supabase
          .from('subscriptions')
          .update({ confirmation_email_sent: true, confirmation_email_sent_at: new Date().toISOString() })
          .eq('id', subscriptionId)
      }

      // Log transaction
      await supabase.from('payment_transactions').insert({
        subscription_id: subscriptionId,
        transaction_type: 'initial',
        amount_aed: subscription.amount_aed,
        amount_usd: subscription.amount_usd,
        currency: 'USD',
        payment_gateway: 'stripe',
        gateway_transaction_id: paymentIntentId,
        gateway_response: JSON.stringify(paymentIntent),
        status: 'completed',
        completed_at: new Date().toISOString(),
      })

      return NextResponse.json({
        success: true,
        message: 'Payment confirmed successfully',
        subscription,
      })
    } else if (paymentIntent.status === 'requires_payment_method') {
      return NextResponse.json(
        { error: 'Payment requires additional authentication' },
        { status: 400 }
      )
    } else {
      // Log failed transaction
      await supabase
        .from('subscriptions')
        .update({
          payment_status: 'failed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', subscriptionId)

      await supabase.from('payment_transactions').insert({
        subscription_id: subscriptionId,
        transaction_type: 'initial',
        payment_gateway: 'stripe',
        gateway_transaction_id: paymentIntentId,
        gateway_response: JSON.stringify(paymentIntent),
        status: 'failed',
        error_message: `Payment status: ${paymentIntent.status}`,
      })

      return NextResponse.json(
        { error: 'Payment failed' },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error('Stripe confirmation error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Confirmation failed' },
      { status: 500 }
    )
  }
}

/**
 * Send confirmation email after successful payment
 */
async function sendConfirmationEmail(
  mailTransporter: any,
  email: string,
  fullName: string,
  tier: string,
  billingCycle: string,
  amount: number
): Promise<void> {
  try {
    const tierName = tier.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    
    const mailOptions = {
      from: process.env.SMTP_FROM || 'noreply@myfounders.club',
      to: email,
      subject: 'Welcome to MyFoundersClub - Subscription Confirmed',
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
              <p style="margin: 8px 0;"><strong>Amount Paid:</strong> \$${amount.toFixed(2)}</p>
            </div>
            
            <p>Your subscription is now active. You can access all the benefits and features immediately.</p>
            
            <p style="text-align: center; margin-top: 30px;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #ff6b35; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">Go to Dashboard</a>
            </p>
            
            <p style="color: #666; font-size: 12px; text-align: center; margin-top: 30px;">
              If you have any questions, please contact our support team at support@myfounders.club
            </p>
          </div>
        </div>
      `,
    }

    await mailTransporter.sendMail(mailOptions)
    console.log(`✅ Confirmation email sent to ${email}`)
  } catch (error) {
    console.error('Email sending failed:', error)
    // Don't throw - email failure shouldn't block payment process
  }
}
