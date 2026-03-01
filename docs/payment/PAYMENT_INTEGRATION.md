# Payment Integration Guide

Complete setup and documentation for payment processing (Telr, Stripe, and UAE payment gateways).

## 📋 Overview

MyFoundersClub supports multiple payment methods:
- **Telr** - UAE payments (AED)
- **Stripe** - International payments (USD/EUR)
- **PayFort** (Optional) - AWS PayFort for UAE
- **2Checkout** (Optional) - International alternative

---

## 🔧 Environment Configuration

### `.env.local` Setup

```bash
# ============================================================================
# STRIPE CONFIGURATION (International Payments)
# ============================================================================
STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxx

# ============================================================================
# TELR CONFIGURATION (UAE Payments - AED)
# ============================================================================
TELR_API_KEY=xxxxxxxxxxxxxxxx
TELR_STORE_ID=xxxx
TELR_AUTHKEY=xxxxxxxxxxxxxxxx

# ============================================================================
# PAYFORT CONFIGURATION (Optional)
# ============================================================================
PAYFORT_MERCHANT_IDENTIFIER=xxxxxxxx
PAYFORT_AUTHORIZATION_KEY=xxxxxxxxxxxxxxxx
PAYFORT_SANDBOX_MODE=true

# ============================================================================
# 2CHECKOUT CONFIGURATION (Optional)
# ============================================================================
TWOCHECKOUT_PUBLISHABLE_KEY=xxxxxxxxxxxxxxxx
TWOCHECKOUT_SECRET_KEY=xxxxxxxxxxxxxxxx
```

### Getting API Keys

1. **Stripe**: https://dashboard.stripe.com/apikeys
2. **Telr**: https://telr.com/merchants
3. **PayFort**: AWS PayFort merchant console
4. **2Checkout**: https://www.2checkout.com/

---

## 📊 Database Schema

### Pricing Tiers Table

| Tier Name | Display Name | Monthly AED | Annual AED | Monthly USD | Annual USD |
|-----------|-------------|------------|-----------|------------|-----------|
| founder-pass | Founder Pass | 2,500 | 25,000 | 680 | 6,800 |
| scale-plan | Scale Plan | 5,000 | 50,000 | 1,360 | 13,600 |
| enterprise | Enterprise | 15,000 | 150,000 | 4,080 | 40,800 |

### Update Pricing

```sql
UPDATE pricing_tiers 
SET price_monthly_aed = 3000 
WHERE tier_name = 'founder-pass';
```

### Subscription Status Values

- `pending` - Payment awaiting confirmation
- `completed` - Active subscription
- `failed` - Payment failed
- `cancelled` - Subscription cancelled
- `expired` - Subscription expired

---

## 🔗 API Endpoints

### Create Payment

**POST** `/api/payments/telr`

Request:
```json
{
  "tier": "founder-pass",
  "billingCycle": "monthly",
  "email": "user@example.com",
  "fullName": "John Doe",
  "userId": "optional-user-id"
}
```

Response:
```json
{
  "success": true,
  "reference": "MFC-founder-pass-1739629920000-abc123def",
  "subscriptionId": "sub_12345...",
  "telrPaymentUrl": "https://telr.com/gateway/process.php"
}
```

### Payment Callback Webhook

**POST/GET** `/api/payments/telr/callback`

Accepts Telr webhook data and updates subscription status automatically.

---

## 🧩 Frontend Components

### PaymentModal
**Location:** `components/PaymentModal.tsx`

- Collects customer information
- Displays pricing for selected tier
- Handles payment initiation
- Supports monthly and annual billing
- Mobile responsive

### Payment Form Integration
**Location:** `components/payment-form.tsx`

- Embedded payment form
- Real-time price calculation
- Currency selection
- Error messaging

---

## ✅ Implementation Checklist

- [x] Database tables created (subscriptions, payment_transactions, pricing_tiers)
- [x] Telr payment API endpoint
- [x] Payment callback webhook
- [x] Frontend modal component
- [x] Email notifications on purchase
- [x] Admin dashboard for subscription tracking
- [x] Error handling and logging
- [x] Payment status synchronization

---

## 🧪 Testing

### Test Telr Payments

1. Use test credentials from Telr sandbox
2. Test payment URL: `https://telr.com/gateway/process.php` (test mode)
3. Monitor webhook callbacks in Supabase
4. Check subscription status updates

### Test Data

```
Tier: founder-pass
Cycle: monthly
Amount: AED 2,500
Email: test@example.com
Name: Test User
```

---

## 🐛 Troubleshooting

### Payment Not Completing

1. Verify Telr credentials in `.env.local`
2. Check webhook URL is publicly accessible
3. Review payment_transactions table for errors
4. Check Telr merchant dashboard for transaction logs

### Webhook Not Triggering

1. Confirm callback URL is correct
2. Check firewall/networking rules
3. Review Telr webhook configuration
4. Verify signature validation

### Pricing Not Updating

1. Confirm pricing_tiers table exists
2. Verify tier names match in code
3. Clear database cache
4. Restart application

---

## 📝 Transaction Log

All transactions are recorded in the `payment_transactions` table with:
- Transaction ID
- Reference number
- Amount (AED/USD)
- Status
- Timestamp
- Telr transaction reference
- Error messages (if failed)

---

## 🔐 Security Best Practices

1. ✅ Never commit API keys to git
2. ✅ Use environment variables for all secrets
3. ✅ Validate webhook signatures
4. ✅ Encrypt sensitive data in database
5. ✅ Enable HTTPS only
6. ✅ Rate limit payment endpoints
7. ✅ Log all financial transactions
8. ✅ Regular security audits

---

## 📞 Support

For payment integration issues, contact:
- **Telr Support**: support@telr.com
- **Stripe Support**: https://support.stripe.com
- **Dev Team**: dev@myfoundersclub.com

---

**Last Updated:** February 25, 2026
**Version:** 1.0
