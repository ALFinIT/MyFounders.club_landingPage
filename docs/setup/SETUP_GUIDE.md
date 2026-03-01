# Project Setup Guide

Complete setup instructions for MyFoundersClub development environment.

## 📋 Prerequisites

- Node.js 18+ (recommended 20+)
- npm or pnpm (recommended pnpm for faster installs)
- Git
- Supabase account (https://supabase.com)
- Telr merchant account (https://telr.com)

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone <repository-url>
cd landing-page-myfounder
```

### 2. Install Dependencies

```bash
pnpm install
# or
npm install
```

### 3. Setup Environment Variables

Copy `.env.example` and create `.env.local`:

```bash
cp .env.example .env.local
```

### 4. Configure `.env.local`

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Telr Payment Gateway
TELR_STORE_ID=your_store_id
TELR_AUTHKEY=your_auth_key

# Stripe (Optional)
STRIPE_PUBLIC_KEY=your_public_key
STRIPE_SECRET_KEY=your_secret_key

# Beehiv Newsletter
BEEHIV_API_KEY_V2=your_api_key
BEEHIV_API_URL_V2=your_api_url
```

### 5. Start Development Server

```bash
pnpm dev
# or
npm run dev
```

Server starts at: http://localhost:3000

---

## 🗄️ Database Setup

### Supabase Configuration

1. Go to https://app.supabase.com
2. Select your project
3. Click **SQL Editor** → **New Query**
4. Run migration files from `supabase/migrations/`
5. Verify tables are created:
   - `newsletter_signups`
   - `subscriptions`
   - `payment_transactions`
   - `pricing_tiers`

### Data Directory

Local test data stored in:
- `data/newsletter_signups.json` - Newsletter subscribers
- `data/applications.json` - Application submissions
- `data/whatsapp_signups.json` - WhatsApp signups

---

## 📦 Project Structure

```
landing-page-myfounder/
├── app/                    # Next.js app directory
│   ├── [locale]/          # i18n locale routes
│   ├── api/               # API routes
│   │   ├── beehiv/        # Newsletter integration
│   │   ├── newsletter/    # Subscribe endpoint
│   │   ├── payments/      # Payment processing
│   │   └── ...
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── landing-page.tsx   # Main landing page
│   ├── navbar.tsx         # Navigation bar
│   ├── payment-form.tsx   # Payment form
│   ├── GridBackground.tsx # Interactive background
│   └── sections/          # Page sections
├── context/              # Context providers
│   ├── auth-context.tsx
│   └── profile-context.tsx
├── lib/                  # Utilities
│   └── supabase/         # Supabase clients
├── public/               # Static assets
├── docs/                 # Documentation
│   ├── payment/          # Payment docs
│   ├── setup/            # Setup guides
│   ├── database/         # Database schemas
│   └── api/              # API documentation
├── i18n/                 # Internationalization
├── locales/              # Translation files (ar.json, en.json)
├── supabase/             # Migrations and SQL
└── utils/                # Helper functions
```

---

## 🎨 Design System

### Colors

- **Primary**: Hot Orange (#FF5B23)
- **Background**: Pure Black (#000000)
- **Text**: White (#FFFFFF)
- **Secondary**: Gray (#9CA3AF)

### Typography

**Headings (Syne Font)**
- Hero headings: 800 weight, line-height 1.05, letter-spacing -0.02em
- Section titles: 700 weight, line-height 1.1
- UI labels: 600 weight, uppercase, letter-spacing 0.05em

**Body (DM Sans Font)**
- Body text: 400 weight, line-height 1.6
- Light text: 300 weight, line-height 1.5
- Form inputs: 400-500 weight, line-height 1.5

---

## 🌐 Internationalization (i18n)

Supported languages: English (en) & Arabic (ar)

Translation files: `locales/en.json`, `locales/ar.json`

### Using Translations

```tsx
import { useTranslations } from 'next-intl'

export default function Component() {
  const t = useTranslations()
  return <h1>{t('nav.cta')}</h1>
}
```

---

## 🔐 API Configuration

### Newsletter Subscription

**POST** `/api/beehiv`

```json
{
  "email": "user@example.com"
}
```

Syncs with:
- Local JSON file (data/newsletter_signups.json)
- Supabase (newsletter_signups table)
- Beehiv API

### Payment Processing

**POST** `/api/payments/telr`

See [Payment Integration Guide](./payment/PAYMENT_INTEGRATION.md)

---

## 🚢 Deployment

### Build for Production

```bash
pnpm build
# or
npm run build
```

### Start Production Server

```bash
pnpm start
# or
npm start
```

### Environment for Production

Ensure these are set in your hosting platform:
- All Supabase credentials (read-only recommended)
- Telr API keys
- Stripe keys (if used)
- Beehiv API keys
- NEXT_PUBLIC_SITE_URL

---

## 📋 Scripts

```bash
# Development
pnpm dev           # Start dev server
pnpm build         # Build for production
pnpm start         # Run production server
pnpm lint          # Run ESLint

# Database
# Run migrations from supabase/migrations/
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Newsletter signup works
- [ ] Payment flow completes
- [ ] Translations switch (en/ar)
- [ ] Mobile responsive
- [ ] Forms validate correctly
- [ ] API endpoints return expected data

---

## 🐛 Debugging

### Enable Debug Mode

```bash
# Next.js debug
DEBUG=* pnpm dev

# Supabase debug
export NEXT_PUBLIC_SUPABASE_URL=...
export NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=...
```

### Check Logs

- Browser console: `F12`
- Server logs: Terminal output
- Supabase: Logs in dashboard
- Email: Check spam folder

---

## 📚 Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [next-intl](https://next-intl-docs.vercel.app/)

---

**Last Updated:** February 25, 2026
**Version:** 1.0
