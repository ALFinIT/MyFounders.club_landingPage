# MyFounders.Club - Landing Page

Build Locally. Champion Regionally. Scale Globally.

The Gulf's ecosystem operating system connecting founders, capital, and opportunity globally.

---

##  Project Overview

MyFounders.Club is a modern, interactive landing page for the premier founder community in the GCC region.

**Live Demo:** https://myfoundersclub.com

**Key Features:**
-  Multi-language support (English & Arabic)
-  Integrated payment processing (Telr, Stripe)
-  Newsletter subscription with Beehiv integration
-  Supabase database integration
-  Modern UI with hot orange neon effects
-  Lightning-fast performance (60s startup)
-  Fully responsive design
-  Interactive background with mouse tracking

---

##  Quick Start

`ash
# Install dependencies
pnpm install

# Setup environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
pnpm dev
`

Server runs at: **http://localhost:3000**

---

##  Documentation

Find detailed documentation in the docs/ folder:

- **[Setup Guide](./docs/setup/SETUP_GUIDE.md)** - Environment setup, installation, project structure
- **[Payment Integration](./docs/payment/PAYMENT_INTEGRATION.md)** - Payment gateways, configuration, testing
- **[Database Schema](./docs/database/SCHEMA.md)** - Tables, relationships, queries, backup

---

##  Project Structure

`
landing-page-myfounder/
 app/                    # Next.js 15 app directory
    api/               # Backend APIs
    [locale]/          # i18n routes (en, ar)
    layout.tsx         # Root layout
 components/            # React components
    landing-page.tsx   # Main landing page
    navbar.tsx         # Navigation with neon frame
    GridBackground.tsx # Interactive background
    sections/          # Page sections
 context/              # State management
    auth-context.tsx
    profile-context.tsx
 docs/                 # Documentation (setup, payment, database)
 lib/                  # Utilities & Supabase clients
 locales/              # Translations (en.json, ar.json)
 public/               # Static assets
 utils/                # Helper functions
`

---

##  Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 15.1** | Frontend framework |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **Supabase** | Database & auth |
| **Framer Motion** | Animations |
| **next-intl** | i18n (English/Arabic) |
| **Stripe & Telr** | Payment processing |

---

##  Design System

### Color Palette
- **Primary**: Hot Orange (#FF5B23) - CTA buttons, accents, neon effects
- **Background**: Pure Black (#000000)
- **Text**: White (#FFFFFF)
- **Secondary**: Gray (#9CA3AF)

### Typography
- **Headings**: Syne font (600-800 weight)
  - Hero: 800 weight, line-height 1.05, letter-spacing -0.02em
  - Sections: 700 weight
  - UI/Buttons: 600 weight, uppercase
- **Body**: DM Sans font (300-500 weight)
  - Regular: 400 weight, line-height 1.6
  - Light: 300 weight

---

##  Features

###  Landing Page
- Hero section with CTA
- Founder story & mission
- Problems & solutions
- Audience-specific features (Founders, International, Investors)
- How it works (4-step process)
- Beta signup form
- Newsletter subscription
- Interactive footer

###  Authentication
- Email-based signup/login
- Profile management
- Role-based access (Founder, Investor, Both)
- LocalStorage & Supabase sync

###  Payment Processing
- **Telr**: UAE payments (AED)
- **Stripe**: International (USD/EUR)
- Multiple subscription tiers (Founder Pass, Scale Plan, Enterprise)
- Monthly & annual billing
- Webhook integration

###  Email Integration
- Newsletter via Beehiv API
- WhatsApp signup tracking
- Background sync (non-blocking)

###  Multi-Language
- English (en) & Arabic (ar)
- RTL support for Arabic
- Language switcher in navbar

---

##  Environment Variables

`ash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Payment Gateways
TELR_STORE_ID=
TELR_AUTHKEY=
STRIPE_PUBLIC_KEY=
STRIPE_SECRET_KEY=

# Newsletter
BEEHIV_API_KEY_V2=
BEEHIV_API_URL_V2=
`

See [.env.example](./.env.example) for full list.

---

##  Deployment

### Build & Deploy

`ash
# Build for production
pnpm build

# Test production build locally
pnpm start

# Deploy to Vercel (recommended for Next.js)
vercel deploy
`

### Environment Setup (Production)

Set environment variables in your hosting platform dashboard.

### Performance

-  60s startup time (optimized i18n config)
-  Lazy-loaded components
-  Image optimization
-  CSS minification
-  Code splitting

---

##  Available Scripts

`ash
pnpm dev      # Start dev server (port 3000)
pnpm build    # Build for production
pnpm start    # Run production server
pnpm lint     # Run ESLint
`

---

##  Testing

### Manual Checklist
- [ ] Homepage loads in < 5 seconds
- [ ] Newsletter subscription works
- [ ] Payment modal opens correctly
- [ ] Language switcher works (en/ar)
- [ ] Mobile responsive on all breakpoints
- [ ] Form validation works
- [ ] API endpoints return correct data

### Test Credentials
- **Telr Test**: Use sandbox credentials from Telr merchant dashboard
- **Stripe Test**: Use sk_test_* keys
- **Supabase Test**: Use test project credentials

---

##  Troubleshooting

### Startup Slow?
-  i18n configuration moved to ./i18n/request.ts
-  Deprecated warning removed
-  Optimized startup time

### GridBackground Not Showing?
- Check globals.css background is set to pure black
- Verify GridBackground component is imported in layout.tsx
- Clear browser cache

### Payment Not Working?
- See [Payment Integration Guide](./docs/payment/PAYMENT_INTEGRATION.md)
- Verify API keys in .env.local
- Check Supabase tables exist

---

##  API Reference

### Newsletter Subscription
**POST** /api/beehiv
`json
{
  "email": "user@example.com"
}
`

### Create Payment
**POST** /api/payments/telr
`json
{
  "tier": "founder-pass",
  "billingCycle": "monthly",
  "email": "user@example.com",
  "fullName": "John Doe"
}
`

See [Payment Integration Guide](./docs/payment/PAYMENT_INTEGRATION.md) for full API docs.

---

##  Support & Contact

- **Email**: dev@myfoundersclub.com
- **GitHub**: [landing-page-myfounder](https://github.com/)
- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs

---

##  License

All rights reserved  2026 MyFounders.Club

---

##  Contributors

- Katerina Hayes - Founder & CEO
- Development Team

---

##  Roadmap

- [ ] Admin dashboard for stats
- [ ] Video testimonials
- [ ] Founder directory
- [ ] AI-powered matching
- [ ] Mobile app
- [ ] Video calling integration

---

**Last Updated:** February 25, 2026
**Version:** 1.0
**Status:** Production Ready 
