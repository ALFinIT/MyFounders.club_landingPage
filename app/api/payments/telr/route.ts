import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Mark this route as dynamic - never cache, always run at request time
export const dynamic = 'force-dynamic'

const crypto = require('crypto')
const nodemailer = require('nodemailer')

// Initialize clients lazily inside handlers
function initializeClients() {
  const TELR_API_KEY = process.env.TELR_API_KEY || ''
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
    TELR_API_KEY,
    TELR_STORE_ID,
    TELR_AUTHKEY,
    transporter: transporterInstance,
    supabase: supabaseInstance,
  }
}

/**
 * POST /api/payments/telr
 * 
 * Handles payment processing through Telr gateway
 * Supports: Card, Telr Wallet, Google Pay, Apple Pay
 * All payments processed in AED for UAE operations
 * 
 * Request body:
 * {
 *   "tier": "founder-pass",
 *   "billingCycle": "monthly",
 *   "email": "user@example.com",
 *   "fullName": "John Doe",
 *   "phoneNumber": "+971501234567",
 *   "country": "AE",
 *   "city": "Dubai",
 *   "address": "123 Business Street",
 *   "businessName": "Company Name",
 *   "paymentMethod": "card" | "telr" | "gpay" | "applepay"
 * }
 */
export async function POST(req: NextRequest) {
  try {
    const { TELR_API_KEY, TELR_STORE_ID, TELR_AUTHKEY, transporter, supabase } = initializeClients()

    const body = await req.json()
    const { 
      tier, 
      billingCycle, 
      email, 
      fullName, 
      userId,
      phoneNumber,
      country,
      city,
      address,
      businessName,
      paymentMethod = 'card' // Default to card
    } = body

    if (!tier || !billingCycle || !email || !fullName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
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

    // Get amount in AED
    const amountAED = billingCycle === 'monthly' 
      ? pricingData.price_monthly_aed 
      : pricingData.price_annual_aed

    // Generate unique reference
    const reference = `MFC-${tier}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Route to appropriate payment method handler
    let paymentResponse

    switch(paymentMethod) {
      case 'card':
        paymentResponse = await processCardPayment(
          amountAED, reference, email, fullName, phoneNumber,
          country, city, address, tier, billingCycle, supabase
        )
        break
      case 'telr':
        paymentResponse = await processTelrWalletPayment(
          amountAED, reference, email, fullName, phoneNumber,
          country, city, address, tier, billingCycle, supabase
        )
        break
      case 'gpay':
        paymentResponse = await processGooglePayPayment(
          amountAED, reference, email, fullName, phoneNumber,
          country, city, address, tier, billingCycle, supabase
        )
        break
      case 'applepay':
        paymentResponse = await processApplePayPayment(
          amountAED, reference, email, fullName, phoneNumber,
          country, city, address, tier, billingCycle, supabase
        )
        break
      default:
        return NextResponse.json(
          { error: 'Invalid payment method' },
          { status: 400 }
        )
    }

    return NextResponse.json(paymentResponse)
  } catch (error) {
    console.error('Payment processing error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Payment processing failed' },
      { status: 500 }
    )
  }
}

/**
 * Process Credit/Debit Card Payment (Visa, Mastercard)
 * Routes through Telr gateway for PCI compliance
 */
async function processCardPayment(
  amountAED: number,
  reference: string,
  email: string,
  fullName: string,
  phoneNumber: string,
  country: string,
  city: string,
  address: string,
  tier: string,
  billingCycle: string,
  supabase: any
) {
  const { TELR_STORE_ID, TELR_AUTHKEY } = initializeClients()

  // Create payment data for Telr card processing
  const paymentData = {
    store: TELR_STORE_ID,
    authkey: TELR_AUTHKEY,
    type: 'json',
    amount: Math.round(amountAED * 100), // Convert to fils (cents)
    currency: 'AED',
    description: `${tier} subscription - ${billingCycle} | Card Payment`,
    reference,
    email,
    fname: fullName.split(' ')[0],
    lname: fullName.split(' ')[1] || '',
    phone: phoneNumber || '',
    country: country || 'AE',
    city: city || '',
    address: address || '',
    notify: 1,
    ipn: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/telr/callback`,
    return: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success`,
    cancel: `${process.env.NEXT_PUBLIC_APP_URL}/payment-failed`,
    test: process.env.NODE_ENV === 'development' ? 1 : 0,
  }

  // Generate Telr authentication signature
  const crypto = require('crypto')
  const signatureString = `${TELR_STORE_ID}${paymentData.amount}${paymentData.currency}${TELR_AUTHKEY}`
  const authSignature = crypto.createHash('sha256').update(signatureString).digest('hex')
  ;(paymentData as any).signature = authSignature

  // Save subscription record with pending status
  const { data: subscription } = await supabase
    .from('subscriptions')
    .insert({
      user_id: email,
      email,
      full_name: fullName,
      phone_number: phoneNumber || null,
      country: country || 'AE',
      city: city || null,
      address: address || null,
      tier,
      billing_cycle: billingCycle,
      amount_aed: amountAED,
      currency: 'AED',
      payment_gateway: 'telr',
      payment_method: 'card',
      payment_status: 'pending',
      payment_id: reference,
      subscription_status: 'inactive',
      start_date: new Date().toISOString(),
    })
    .select()
    .single()

  return {
    success: true,
    paymentData,
    paymentMethod: 'card',
    telrPaymentUrl: `https://telr.com/gateway/process.php`,
    subscriptionId: subscription?.id,
    reference,
  }
}

/**
 * Process Telr Wallet Payment
 * Direct Telr wallet payment for UAE customers
 */
async function processTelrWalletPayment(
  amountAED: number,
  reference: string,
  email: string,
  fullName: string,
  phoneNumber: string,
  country: string,
  city: string,
  address: string,
  tier: string,
  billingCycle: string,
  supabase: any
) {
  const { TELR_STORE_ID, TELR_AUTHKEY } = initializeClients()

  // Telr wallet payment configuration
  const paymentData = {
    store: TELR_STORE_ID,
    authkey: TELR_AUTHKEY,
    type: 'json',
    amount: Math.round(amountAED * 100),
    currency: 'AED',
    description: `${tier} subscription - ${billingCycle} | Telr Wallet`,
    reference,
    email,
    fname: fullName.split(' ')[0],
    lname: fullName.split(' ')[1] || '',
    phone: phoneNumber || '',
    country: country || 'AE',
    city: city || '',
    address: address || '',
    tpay: 1, // Enable Telr Pay wallet
    notify: 1,
    ipn: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/telr/callback`,
    return: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success`,
    cancel: `${process.env.NEXT_PUBLIC_APP_URL}/payment-failed`,
  }

  const crypto = require('crypto')
  const signatureString = `${TELR_STORE_ID}${paymentData.amount}${paymentData.currency}${TELR_AUTHKEY}`
  const authSignature = crypto.createHash('sha256').update(signatureString).digest('hex')
  ;(paymentData as any).signature = authSignature

  const { data: subscription } = await supabase
    .from('subscriptions')
    .insert({
      user_id: email,
      email,
      full_name: fullName,
      phone_number: phoneNumber || null,
      country: country || 'AE',
      city: city || null,
      address: address || null,
      tier,
      billing_cycle: billingCycle,
      amount_aed: amountAED,
      currency: 'AED',
      payment_gateway: 'telr',
      payment_method: 'telr_wallet',
      payment_status: 'pending',
      payment_id: reference,
      subscription_status: 'inactive',
      start_date: new Date().toISOString(),
    })
    .select()
    .single()

  return {
    success: true,
    paymentData,
    paymentMethod: 'telr_wallet',
    telrPaymentUrl: `https://telr.com/gateway/process.php`,
    subscriptionId: subscription?.id,
    reference,
  }
}

/**
 * Process Google Pay Payment
 * Google Pay transactions through Telr gateway
 */
async function processGooglePayPayment(
  amountAED: number,
  reference: string,
  email: string,
  fullName: string,
  phoneNumber: string,
  country: string,
  city: string,
  address: string,
  tier: string,
  billingCycle: string,
  supabase: any
) {
  const { TELR_STORE_ID, TELR_AUTHKEY } = initializeClients()

  // Google Pay configuration
  const paymentData = {
    store: TELR_STORE_ID,
    authkey: TELR_AUTHKEY,
    type: 'json',
    amount: Math.round(amountAED * 100),
    currency: 'AED',
    description: `${tier} subscription - ${billingCycle} | Google Pay`,
    reference,
    email,
    fname: fullName.split(' ')[0],
    lname: fullName.split(' ')[1] || '',
    phone: phoneNumber || '',
    country: country || 'AE',
    city: city || '',
    address: address || '',
    notify: 1,
    ipn: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/telr/callback`,
    return: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success`,
    cancel: `${process.env.NEXT_PUBLIC_APP_URL}/payment-failed`,
  }

  const crypto = require('crypto')
  const signatureString = `${TELR_STORE_ID}${paymentData.amount}${paymentData.currency}${TELR_AUTHKEY}`
  const authSignature = crypto.createHash('sha256').update(signatureString).digest('hex')
  ;(paymentData as any).signature = authSignature

  const { data: subscription } = await supabase
    .from('subscriptions')
    .insert({
      user_id: email,
      email,
      full_name: fullName,
      phone_number: phoneNumber || null,
      country: country || 'AE',
      city: city || null,
      address: address || null,
      tier,
      billing_cycle: billingCycle,
      amount_aed: amountAED,
      currency: 'AED',
      payment_gateway: 'telr',
      payment_method: 'google_pay',
      payment_status: 'pending',
      payment_id: reference,
      subscription_status: 'inactive',
      start_date: new Date().toISOString(),
    })
    .select()
    .single()

  return {
    success: true,
    paymentData,
    paymentMethod: 'google_pay',
    telrPaymentUrl: `https://telr.com/gateway/process.php`,
    subscriptionId: subscription?.id,
    reference,
  }
}

/**
 * Process Apple Pay Payment
 * Apple Pay transactions through Telr gateway
 */
async function processApplePayPayment(
  amountAED: number,
  reference: string,
  email: string,
  fullName: string,
  phoneNumber: string,
  country: string,
  city: string,
  address: string,
  tier: string,
  billingCycle: string,
  supabase: any
) {
  const { TELR_STORE_ID, TELR_AUTHKEY } = initializeClients()

  // Apple Pay configuration
  const paymentData = {
    store: TELR_STORE_ID,
    authkey: TELR_AUTHKEY,
    type: 'json',
    amount: Math.round(amountAED * 100),
    currency: 'AED',
    description: `${tier} subscription - ${billingCycle} | Apple Pay`,
    reference,
    email,
    fname: fullName.split(' ')[0],
    lname: fullName.split(' ')[1] || '',
    phone: phoneNumber || '',
    country: country || 'AE',
    city: city || '',
    address: address || '',
    notify: 1,
    ipn: `${process.env.NEXT_PUBLIC_APP_URL}/api/payments/telr/callback`,
    return: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success`,
    cancel: `${process.env.NEXT_PUBLIC_APP_URL}/payment-failed`,
  }

  const crypto = require('crypto')
  const signatureString = `${TELR_STORE_ID}${paymentData.amount}${paymentData.currency}${TELR_AUTHKEY}`
  const authSignature = crypto.createHash('sha256').update(signatureString).digest('hex')
  ;(paymentData as any).signature = authSignature

  const { data: subscription } = await supabase
    .from('subscriptions')
    .insert({
      user_id: email,
      email,
      full_name: fullName,
      phone_number: phoneNumber || null,
      country: country || 'AE',
      city: city || null,
      address: address || null,
      tier,
      billing_cycle: billingCycle,
      amount_aed: amountAED,
      currency: 'AED',
      payment_gateway: 'telr',
      payment_method: 'apple_pay',
      payment_status: 'pending',
      payment_id: reference,
      subscription_status: 'inactive',
      start_date: new Date().toISOString(),
    })
    .select()
    .single()

  return {
    success: true,
    paymentData,
    paymentMethod: 'apple_pay',
    telrPaymentUrl: `https://telr.com/gateway/process.php`,
    subscriptionId: subscription?.id,
    reference,
  }
}

/**
 * POST /api/payments/telr/callback
 * 
 * Handles Telr payment callback/webhook
 * Telr sends payment status updates to this endpoint
 */
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json()
    const { reference, status, transactionId, amount } = body

    if (!reference) {
      return NextResponse.json(
        { error: 'Missing payment reference' },
        { status: 400 }
      )
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Find subscription by payment ID
    const { data: subscription, error: fetchError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('payment_id', reference)
      .single()

    if (fetchError || !subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    // Update subscription status based on payment status
    const paymentStatus = status === '0' ? 'completed' : 'failed'

    if (paymentStatus === 'completed') {
      const { data: updatedSubscription, error: updateError } = await supabase
        .from('subscriptions')
        .update({
          payment_status: 'completed',
          subscription_status: 'active',
          confirmation_email_sent: false,
          updated_at: new Date().toISOString(),
        })
        .eq('id', subscription.id)
        .select()
        .single()

      if (!updateError) {
        // Send confirmation email
        await sendConfirmationEmail(
          subscription.email,
          subscription.full_name,
          subscription.tier,
          subscription.billing_cycle,
          subscription.amount_aed
        )

        // Update email sent flag
        await supabase
          .from('subscriptions')
          .update({ confirmation_email_sent: true, confirmation_email_sent_at: new Date().toISOString() })
          .eq('id', subscription.id)
      }

      // Log transaction
      await supabase.from('payment_transactions').insert({
        subscription_id: subscription.id,
        transaction_type: 'initial',
        amount_aed: subscription.amount_aed,
        amount_usd: subscription.amount_usd,
        currency: 'AED',
        payment_gateway: 'telr',
        gateway_transaction_id: transactionId,
        gateway_response: JSON.stringify(body),
        status: 'completed',
        completed_at: new Date().toISOString(),
      })

      return NextResponse.json({
        success: true,
        message: 'Payment confirmed',
      })
    } else {
      // Log failed transaction
      await supabase
        .from('subscriptions')
        .update({
          payment_status: 'failed',
          updated_at: new Date().toISOString(),
        })
        .eq('id', subscription.id)

      await supabase.from('payment_transactions').insert({
        subscription_id: subscription.id,
        transaction_type: 'initial',
        amount_aed: subscription.amount_aed,
        amount_usd: subscription.amount_usd,
        currency: 'AED',
        payment_gateway: 'telr',
        gateway_transaction_id: transactionId,
        gateway_response: JSON.stringify(body),
        status: 'failed',
        error_message: 'Payment declined by Telr',
      })

      return NextResponse.json({
        success: false,
        message: 'Payment failed',
      }, { status: 400 })
    }
  } catch (error) {
    console.error('Telr callback error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Callback processing failed' },
      { status: 500 }
    )
  }
}

/**
 * Send confirmation email after successful payment (AED)
 */
async function sendConfirmationEmail(
  email: string,
  fullName: string,
  tier: string,
  billingCycle: string,
  amountAED: number
): Promise<void> {
  try {
    const { transporter } = initializeClients()
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
              <p style="margin: 8px 0;"><strong>Amount Paid:</strong> AED ${amountAED.toFixed(2)}</p>
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

    await transporter.sendMail(mailOptions)
    console.log(`✅ Confirmation email sent to ${email}`)
  } catch (error) {
    console.error('Email sending failed:', error)
  }
}
