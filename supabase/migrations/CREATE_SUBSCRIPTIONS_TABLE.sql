/**
 * Subscriptions Table Migration for MyFoundersClub
 * 
 * This creates the subscriptions table for managing payment and subscription data
 * 
 * Run this in Supabase SQL Editor:
 * 1. Go to https://app.supabase.com
 * 2. Select project: ibpqvfqhmecgyevjbtqo
 * 3. Click "SQL Editor" → "New Query"
 * 4. Paste all SQL below
 * 5. Click "Run"
 */

-- ============================================================================
-- SUBSCRIPTIONS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  
  -- Subscription Details
  tier VARCHAR(50) NOT NULL, -- 'founder-pass', 'scale-plan', 'enterprise'
  billing_cycle VARCHAR(10) NOT NULL, -- 'monthly', 'annual'
  
  -- Pricing
  amount_aed DECIMAL(10, 2) NOT NULL,
  amount_usd DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'AED',
  
  -- Payment Information
  payment_gateway VARCHAR(50) NOT NULL, -- 'stripe', 'telr', 'payfort', '2checkout'
  payment_status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed', 'refunded'
  payment_id VARCHAR(255), -- Payment gateway transaction ID
  payment_method VARCHAR(50), -- 'credit_card', 'debit_card', 'bank_transfer'
  
  -- Subscription Status
  subscription_status VARCHAR(50) NOT NULL DEFAULT 'active', -- 'active', 'paused', 'cancelled', 'expired'
  start_date TIMESTAMPTZ NOT NULL,
  renewal_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  
  -- Communication
  confirmation_email_sent BOOLEAN DEFAULT FALSE,
  confirmation_email_sent_at TIMESTAMPTZ,
  
  -- Metadata
  notes TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT subscriptions_valid_tier CHECK (tier IN ('founder-pass', 'scale-plan', 'enterprise')),
  CONSTRAINT subscriptions_valid_billing CHECK (billing_cycle IN ('monthly', 'annual')),
  CONSTRAINT subscriptions_valid_status CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  CONSTRAINT subscriptions_valid_sub_status CHECK (subscription_status IN ('active', 'paused', 'cancelled', 'expired'))
);

-- ============================================================================
-- PAYMENT TRANSACTIONS TABLE (for detailed payment history)
-- ============================================================================
CREATE TABLE IF NOT EXISTS payment_transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  subscription_id UUID NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  
  -- Transaction Details
  transaction_type VARCHAR(50) NOT NULL, -- 'initial', 'renewal', 'refund', 'adjustment'
  amount_aed DECIMAL(10, 2) NOT NULL,
  amount_usd DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'AED',
  
  -- Payment Gateway Info
  payment_gateway VARCHAR(50) NOT NULL,
  gateway_transaction_id VARCHAR(255),
  gateway_response TEXT, -- Full response from gateway (JSON)
  
  -- Status
  status VARCHAR(50) NOT NULL DEFAULT 'pending', -- 'pending', 'completed', 'failed'
  error_message TEXT,
  
  -- Timestamps
  attempted_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  
  CONSTRAINT transactions_valid_type CHECK (transaction_type IN ('initial', 'renewal', 'refund', 'adjustment')),
  CONSTRAINT transactions_valid_status CHECK (status IN ('pending', 'completed', 'failed'))
);

-- ============================================================================
-- PRICING TIERS CONFIGURATION TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS pricing_tiers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tier_name VARCHAR(50) NOT NULL UNIQUE, -- 'founder-pass', 'scale-plan', 'enterprise'
  
  -- Display Info
  display_name VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Pricing
  price_monthly_aed DECIMAL(10, 2) NOT NULL,
  price_annual_aed DECIMAL(10, 2) NOT NULL,
  price_monthly_usd DECIMAL(10, 2),
  price_annual_usd DECIMAL(10, 2),
  
  -- Features (JSON array)
  features JSONB DEFAULT '[]'::jsonb,
  
  -- Settings
  is_active BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- INDEXES (for performance)
-- ============================================================================
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_email ON subscriptions(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_payment_status ON subscriptions(payment_status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_subscription_status ON subscriptions(subscription_status);
CREATE INDEX IF NOT EXISTS idx_subscriptions_created_at ON subscriptions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_subscription_id ON payment_transactions(subscription_id);
CREATE INDEX IF NOT EXISTS idx_payment_transactions_status ON payment_transactions(status);

-- ============================================================================
-- INSERT DEFAULT PRICING TIERS
-- ============================================================================
INSERT INTO pricing_tiers (tier_name, display_name, description, price_monthly_aed, price_annual_aed, price_monthly_usd, price_annual_usd, features, display_order) 
VALUES 
  (
    'founder-pass',
    'Founder Pass',
    'Perfect for early-stage founders launching their journey',
    2500.00,
    25000.00,
    680.00,
    6800.00,
    '[
      "Access to founder network",
      "Monthly mentorship sessions",
      "Event access pass",
      "Resource library",
      "Community messaging"
    ]'::jsonb,
    1
  ),
  (
    'scale-plan',
    'Scale Plan',
    'For founders ready to scale and accelerate growth',
    5000.00,
    50000.00,
    1360.00,
    13600.00,
    '[
      "Everything in Founder Pass",
      "Priority investor introductions",
      "One-on-one advisory sessions",
      "Market access program",
      "Pitch deck reviews",
      "Fundraising support"
    ]'::jsonb,
    2
  ),
  (
    'enterprise',
    'Enterprise',
    'Custom solutions for organizations and corporate partners',
    15000.00,
    150000.00,
    4080.00,
    40800.00,
    '[
      "Everything in Scale Plan",
      "Dedicated account manager",
      "Custom program design",
      "Private events & workshops",
      "Priority support (24/7)",
      "Corporate partnership benefits"
    ]'::jsonb,
    3
  )
ON CONFLICT (tier_name) DO NOTHING;

-- ============================================================================
-- ENABLE ROW LEVEL SECURITY (RLS) FOR SUBSCRIPTIONS
-- ============================================================================
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_tiers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read pricing tiers (public)
CREATE POLICY "pricing_tiers_select_public" ON pricing_tiers
  FOR SELECT
  TO public
  USING (is_active = true);

-- Allow authenticated users to read own subscriptions
CREATE POLICY "subscriptions_select_own" ON subscriptions
  FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Allow inserts for subscription creation
CREATE POLICY "subscriptions_insert_public" ON subscriptions
  FOR INSERT
  TO public
  WITH CHECK (true);

-- ============================================================================
-- COMPLETE ✅
-- ============================================================================
-- Verify tables created:
-- 1. Go to "Table Editor" in Supabase
-- 2. You should see:
--    - subscriptions
--    - payment_transactions
--    - pricing_tiers
--
-- Then proceed with:
-- 1. API route setup (see PAYMENT_INTEGRATION_GUIDE.md)
-- 2. Environment variables configuration
-- 3. Payment component implementation
