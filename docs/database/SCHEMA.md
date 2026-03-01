# Database Schema & Setup

Supabase database schema for MyFoundersClub.

---

## 📊 Tables Overview

### 1. newsletter_signups

Stores newsletter subscriber information.

```sql
CREATE TABLE newsletter_signups (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email VARCHAR(255) UNIQUE NOT NULL,
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'active',
  source VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_newsletter_email ON newsletter_signups(email);
```

**Columns:**
- `id` - Unique subscriber ID
- `email` - Subscriber email (unique)
- `subscribed_at` - Subscription timestamp
- `status` - 'active', 'unsubscribed', 'bounced'
- `source` - Where signup came from (website, app, etc)
- `created_at` - Record creation time
- `updated_at` - Last update time

---

### 2. subscriptions

Main subscription records for customers.

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID,
  email VARCHAR(255) REQUIRED,
  full_name VARCHAR(255),
  tier_name VARCHAR(100) NOT NULL,
  billing_cycle VARCHAR(20) NOT NULL,
  amount_aed DECIMAL(10, 2),
  amount_usd DECIMAL(10, 2),
  currency VARCHAR(10),
  status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(100),
  gateway_reference VARCHAR(255),
  subscription_start_date TIMESTAMP WITH TIME ZONE,
  subscription_end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_subscriptions_email ON subscriptions(email);
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_gateway ON subscriptions(gateway_reference);
```

**Columns:**
- `id` - Unique subscription ID
- `user_id` - Customer user ID (optional)
- `email` - Customer email
- `full_name` - Customer name
- `tier_name` - Subscription tier (founder-pass, scale-plan, enterprise)
- `billing_cycle` - 'monthly' or 'annual'
- `amount_aed` - Price in AED
- `amount_usd` - Price in USD
- `currency` - Payment currency
- `status` - pending | completed | failed | cancelled | expired
- `payment_method` - telr | stripe | payfort | 2checkout
- `gateway_reference` - Payment gateway transaction ID
- `subscription_start_date` - Subscription start
- `subscription_end_date` - Next renewal date
- `created_at` - Record creation time
- `updated_at` - Last update time

---

### 3. payment_transactions

Complete history of all payment attempts.

```sql
CREATE TABLE payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID NOT NULL REFERENCES subscriptions(id),
  reference VARCHAR(255) UNIQUE,
  amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(10) NOT NULL,
  status VARCHAR(50) NOT NULL,
  gateway_response TEXT,
  error_message TEXT,
  telr_tranref VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_transactions_reference ON payment_transactions(reference);
CREATE INDEX idx_transactions_subscription ON payment_transactions(subscription_id);
CREATE INDEX idx_transactions_status ON payment_transactions(status);
CREATE INDEX idx_transactions_created ON payment_transactions(created_at);
```

**Columns:**
- `id` - Unique transaction ID
- `subscription_id` - Related subscription
- `reference` - Unique payment reference (MFC-*)
- `amount` - Transaction amount
- `currency` - Transaction currency (AED/USD)
- `status` - pending | completed | failed
- `gateway_response` - Full response from gateway
- `error_message` - Error details if failed
- `telr_tranref` - Telr transaction reference
- `created_at` - Transaction time
- `updated_at` - Last update time

---

### 4. pricing_tiers

Pricing configuration for subscription tiers.

```sql
CREATE TABLE pricing_tiers (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  tier_name VARCHAR(100) UNIQUE NOT NULL,
  display_name VARCHAR(255) NOT NULL,
  description TEXT,
  features JSONB,
  price_monthly_aed DECIMAL(10, 2),
  price_annual_aed DECIMAL(10, 2),
  price_monthly_usd DECIMAL(10, 2),
  price_annual_usd DECIMAL(10, 2),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Default data
INSERT INTO pricing_tiers VALUES
  (1, 'founder-pass', 'Founder Pass', 'Perfect for early-stage founders', 
   '["Feature 1", "Feature 2"]'::jsonb, 2500, 25000, 680, 6800, true, NOW(), NOW()),
  (2, 'scale-plan', 'Scale Plan', 'For scaling startups',
   '["Feature 1", "Feature 2", "Feature 3"]'::jsonb, 5000, 50000, 1360, 13600, true, NOW(), NOW()),
  (3, 'enterprise', 'Enterprise', 'Custom for enterprises',
   '["All features", "Custom support"]'::jsonb, 15000, 150000, 4080, 40800, true, NOW(), NOW());

-- Index
CREATE INDEX idx_pricing_tier_name ON pricing_tiers(tier_name);
```

**Columns:**
- `id` - Tier ID
- `tier_name` - Internal tier name
- `display_name` - Public display name
- `description` - Tier description
- `features` - Array of features (JSONB)
- `price_monthly_aed` - Monthly price in AED
- `price_annual_aed` - Annual price in AED
- `price_monthly_usd` - Monthly price in USD
- `price_annual_usd` - Annual price in USD
- `is_active` - Active/inactive flag
- `created_at` - Creation time
- `updated_at` - Last update time

---

## 🔄 Relationships

```
pricing_tiers (1) ──── (N) subscriptions
payment_transactions ──→ subscriptions
```

---

## 📝 Query Examples

### Get All Active Subscriptions

```sql
SELECT * FROM subscriptions 
WHERE status = 'completed' 
ORDER BY created_at DESC;
```

### Get Revenue by Tier

```sql
SELECT tier_name, COUNT(*) as total, SUM(amount_aed) as revenue_aed
FROM subscriptions 
WHERE status = 'completed'
GROUP BY tier_name;
```

### Get Failed Transactions

```sql
SELECT * FROM payment_transactions 
WHERE status = 'failed' 
ORDER BY created_at DESC 
LIMIT 20;
```

### Update Pricing

```sql
UPDATE pricing_tiers 
SET price_monthly_aed = 3000 
WHERE tier_name = 'founder-pass';
```

### Check Newsletter Subscribers

```sql
SELECT COUNT(*) as total FROM newsletter_signups 
WHERE status = 'active';
```

---

## 🔐 Row Level Security (RLS)

Enable RLS for sensitive tables:

```sql
-- Enable RLS
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_transactions ENABLE ROW LEVEL SECURITY;

-- Allow users to see their own subscriptions
CREATE POLICY user_subscriptions ON subscriptions
  FOR SELECT USING (user_id = auth.uid());

-- Allow service role full access (for API)
CREATE POLICY service_role_full ON subscriptions
  FOR ALL USING (auth.role() = 'service_role');
```

---

## 📊 Data Retention

- **Newsletter signups**: Keep indefinitely (with status flag)
- **Subscriptions**: Keep indefinitely (for business records)
- **Payment transactions**: Keep 7 years (legal requirement)
- **Logs**: Keep 90 days

---

## 🆘 Troubleshooting

### Database Connection Issues

```bash
# Test Supabase connection
curl https://[PROJECT_ID].supabase.co/rest/v1/
  -H "Authorization: Bearer [ANON_KEY]"
```

### Missing Tables

Re-run migration from `supabase/migrations/` SQL files.

### Subscription Not Updating

Check `payment_transactions` table for errors on related transaction.

---

## ✅ Backup & Recovery

Regular automated backups:
- Daily backups (30-day retention)
- Weekly backups (12-week retention)
- Monthly snapshots (1-year retention)

Manual backup:
```bash
pg_dump postgresql://... > backup.sql
```

---

**Last Updated:** February 25, 2026
**Version:** 1.0
