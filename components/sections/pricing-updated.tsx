'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, X, ChevronRight, ChevronLeft } from 'lucide-react'
import { PaymentModal } from '@/components/PaymentModal'
import { scrollRevealConfig } from '@/lib/animation-variants'

const plans = [
  {
    name: 'Founder Access Pass',
    price: 'AED 25',
    period: '/month',
    description: 'WhatsApp-only access',
    features: [
      'Private WhatsApp founder channel',
      'Early access to programs & invites',
      'Monthly ecosystem updates',
      'Founder network directory',
    ],
    popular: false,
    cta: 'Get Access',
  },
  {
    name: 'Scale Plan',
    price: 'Custom',
    description: 'Suite of services, form-based',
    buckets: [
      {
        title: 'Market Entry & Ops',
        items: [
          'Company registration',
          'Accounting & audit',
          'Digital transformation',
        ],
      },
      {
        title: 'Growth & Capital',
        items: [
          'Go-to-market strategy',
          'Fundraising advisory',
          'M&A sourcing',
          'Business development',
        ],
      },
      {
        title: 'Visibility & Influence',
        items: [
          'Trade missions',
          'Media & PR',
          'Marketing & positioning',
          'Reputation management',
        ],
      },
    ],
    popular: true,
    cta: 'Inquire',
  },
  {
    name: 'Partner Networks',
    price: 'Custom',
    description: 'Private channel for institutional players',
    features: [
      'Curated founder deal flow',
      'Investment signals & insights',
      'Event co-hosting',
      'Custom reporting',
    ],
    popular: false,
    cta: 'Learn More',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For institutions seeking signal not noise',
    features: [
      'Sponsorship packages',
      'Proprietary data & insights',
      'Dedicated relationship manager',
      'Custom integrations',
      'Sector-specific reporting',
      'Priority support 24/7',
    ],
    popular: false,
    cta: 'Contact',
  },
]

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
  exit: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 32,
    scale: 0.94,
    transition: {
      duration: 0.5,
      ease: [0.4, 0.0, 0.2, 1],
    },
  },
}

// ─── Partner Networks Multi-Step Form Modal ───────────────────────────────────

const WHATSAPP_LINKS: Record<string, string> = {
  'UAE': 'https://chat.whatsapp.com/UAE-market-entry-link',
  'Saudi Arabia': 'https://chat.whatsapp.com/saudi-market-entry-link',
  default: 'https://chat.whatsapp.com/gcc-founders-general-link',
}

function PartnerNetworksModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    role: '',
    primaryCountry: '',
    outsideGCCLocation: '',
    city: '',
    gulfStatus: '',
    companyName: '',
    websiteLinkedin: '',
    stage: '',
    sectors: [] as string[],
    otherSector: '',
    gulfMarkets: [] as string[],
    achieve12Months: '',
    biggestQuestion: '',
    usefulPeople: '',
  })

  const set = (k: string, v: any) => setForm(p => ({ ...p, [k]: v }))

  const toggleArr = (key: 'sectors' | 'gulfMarkets', val: string) => {
    setForm(p => ({
      ...p,
      [key]: p[key].includes(val) ? p[key].filter(x => x !== val) : [...p[key], val],
    }))
  }

  const whatsappLink = WHATSAPP_LINKS[form.primaryCountry] || WHATSAPP_LINKS.default

  const inputCls = 'w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 text-sm'
  const radioCls = (active: boolean) => `flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all text-sm ${active ? 'border-orange-500 bg-orange-500/10 text-orange-200' : 'border-white/10 bg-white/5 text-gray-300 hover:border-white/20'}`
  const chipCls = (active: boolean) => `px-3 py-1.5 rounded-lg border text-xs font-medium cursor-pointer transition-all ${active ? 'border-orange-500 bg-orange-500/20 text-orange-200' : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20'}`

  const handleSubmit = async () => {
    // Send welcome email via existing notify-contact API
    try {
      await fetch('/api/notify-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: 'Partner Networks – Gulf Map Submission',
          message: `Role: ${form.role}\nCountry: ${form.primaryCountry}\nCity: ${form.city}\nGulf Status: ${form.gulfStatus}\nCompany: ${form.companyName}\nWebsite: ${form.websiteLinkedin}\nStage: ${form.stage}\nSectors: ${form.sectors.join(', ')}\nMarkets: ${form.gulfMarkets.join(', ')}\nAchieve: ${form.achieve12Months}\nBiggest Question: ${form.biggestQuestion}\nUseful People: ${form.usefulPeople}`,
        }),
      })
    } catch (_) {}
    setSubmitted(true)
  }

  const totalSteps = 4

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Modal */}
        <motion.div
          className="relative w-full max-w-lg bg-[#0d0d0d] border border-orange-500/30 rounded-2xl shadow-2xl overflow-hidden"
          style={{ boxShadow: '0 24px 64px rgba(255,91,35,0.25)' }}
          initial={{ opacity: 0, y: 32, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 32, scale: 0.95 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-white/10">
            <div>
              <p className="text-xs text-orange-400 font-medium mb-1">Help build the Gulf's live startup map – and join the room that runs on it.</p>
              {!submitted && <p className="text-white/50 text-xs">Step {step} of {totalSteps}</p>}
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress bar */}
          {!submitted && (
            <div className="flex gap-1 px-6 pt-3">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div key={i} className={`flex-1 h-0.5 rounded-full transition-all duration-300 ${i < step ? 'bg-orange-500' : 'bg-white/10'}`} />
              ))}
            </div>
          )}

          {/* Body */}
          <div className="px-6 py-6 max-h-[70vh] overflow-y-auto">
            {submitted ? (
              <motion.div
                className="text-center py-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="w-14 h-14 rounded-full bg-orange-500/20 border border-orange-500/50 flex items-center justify-center mx-auto mb-5">
                  <Check className="w-7 h-7 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Thanks – you're in.</h3>
                <p className="text-white/70 text-sm leading-relaxed mb-6">
                  Your answers feed the live Gulf startup map we're building.<br />
                  Next step: join the WhatsApp group for your segment.
                </p>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/40 transition-all"
                >
                  Join WhatsApp Group
                  <ArrowRight className="w-4 h-4" />
                </a>
                <p className="text-white/40 text-xs mt-4">A welcome email is on its way with details about your group and how your data helps build the Gulf intelligence layer.</p>
              </motion.div>
            ) : (
              <AnimatePresence mode="wait">
                {/* Step 1 – Role */}
                {step === 1 && (
                  <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <h3 className="text-lg font-bold text-white mb-4">What's your role?</h3>
                    {['Operator / C-level', 'Government / Free Zone / Ecosystem', 'Corporate / MNC entering GCC'].map(r => (
                      <label key={r} className={radioCls(form.role === r)} onClick={() => set('role', r)}>
                        <input type="radio" className="sr-only" checked={form.role === r} readOnly />
                        <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${form.role === r ? 'border-orange-500 bg-orange-500' : 'border-white/30'}`} />
                        {r}
                      </label>
                    ))}
                  </motion.div>
                )}

                {/* Step 2 – Where You're Building */}
                {step === 2 && (
                  <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <h3 className="text-lg font-bold text-white mb-4">Where are you building?</h3>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Primary country</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['UAE', 'Saudi Arabia', 'Qatar', 'Bahrain', 'Kuwait', 'Oman', 'Outside GCC'].map(c => (
                          <label key={c} className={radioCls(form.primaryCountry === c)} onClick={() => set('primaryCountry', c)}>
                            <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${form.primaryCountry === c ? 'border-orange-500 bg-orange-500' : 'border-white/30'}`} />
                            {c}
                          </label>
                        ))}
                      </div>
                      {form.primaryCountry === 'Outside GCC' && (
                        <input className={`${inputCls} mt-3`} placeholder="Where are you based?" value={form.outsideGCCLocation} onChange={e => set('outsideGCCLocation', e.target.value)} />
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">City</label>
                      <input className={inputCls} placeholder="e.g. Dubai, Riyadh, London" value={form.city} onChange={e => set('city', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Are you:</label>
                      {['Based in the Gulf', 'Entering the Gulf in the next 12 months'].map(s => (
                        <label key={s} className={`${radioCls(form.gulfStatus === s)} mb-2`} onClick={() => set('gulfStatus', s)}>
                          <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${form.gulfStatus === s ? 'border-orange-500 bg-orange-500' : 'border-white/30'}`} />
                          {s}
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Step 3 – Your Company */}
                {step === 3 && (
                  <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <h3 className="text-lg font-bold text-white mb-4">Your company</h3>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Company name</label>
                      <input className={inputCls} placeholder="Your company name" value={form.companyName} onChange={e => set('companyName', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Website / LinkedIn URL</label>
                      <input className={inputCls} placeholder="https://yourcompany.com or linkedin.com/in/..." value={form.websiteLinkedin} onChange={e => set('websiteLinkedin', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Stage</label>
                      <div className="grid grid-cols-2 gap-2">
                        {['Idea', 'Pre-seed', 'Seed', 'Series A+', 'Established corporate'].map(s => (
                          <label key={s} className={radioCls(form.stage === s)} onClick={() => set('stage', s)}>
                            <span className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${form.stage === s ? 'border-orange-500 bg-orange-500' : 'border-white/30'}`} />
                            {s}
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Sector (multi-select)</label>
                      <div className="flex flex-wrap gap-2">
                        {['Fintech', 'SaaS', 'AI / Data', 'Healthtech', 'Climate / Energy', 'Logistics', 'Consumer', 'Other'].map(s => (
                          <button key={s} type="button" onClick={() => toggleArr('sectors', s)} className={chipCls(form.sectors.includes(s))}>{s}</button>
                        ))}
                      </div>
                      {form.sectors.includes('Other') && (
                        <input className={`${inputCls} mt-3`} placeholder="Please specify sector" value={form.otherSector} onChange={e => set('otherSector', e.target.value)} />
                      )}
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Main Gulf markets you care about (multi-select)</label>
                      <div className="flex flex-wrap gap-2">
                        {['UAE', 'Saudi', 'Qatar', 'Bahrain', 'Kuwait', 'Oman'].map(m => (
                          <button key={m} type="button" onClick={() => toggleArr('gulfMarkets', m)} className={chipCls(form.gulfMarkets.includes(m))}>{m}</button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 4 – What You're Trying to Do */}
                {step === 4 && (
                  <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                    <h3 className="text-lg font-bold text-white mb-4">What are you trying to do in the Gulf?</h3>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">What are you trying to achieve in the Gulf over the next 12 to 18 months?</label>
                      <textarea className={`${inputCls} resize-none`} rows={2} placeholder="e.g. Close our first Gulf enterprise deal and establish a local entity" value={form.achieve12Months} onChange={e => set('achieve12Months', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">What is your single biggest question about the region right now?</label>
                      <textarea className={`${inputCls} resize-none`} rows={2} placeholder="e.g. Which market should we enter first – UAE or Saudi?" value={form.biggestQuestion} onChange={e => set('biggestQuestion', e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Which type of people would be most useful for you to meet?</label>
                      <textarea className={`${inputCls} resize-none`} rows={2} placeholder="e.g. Saudi fintech founders, Dubai logistics operators, Qatari investors" value={form.usefulPeople} onChange={e => set('usefulPeople', e.target.value)} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>

          {/* Footer navigation */}
          {!submitted && (
            <div className="flex gap-3 px-6 pb-6 pt-2 border-t border-white/10">
              {step > 1 && (
                <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm transition-all">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
              )}
              {step < totalSteps ? (
                <button
                  onClick={() => setStep(s => s + 1)}
                  disabled={step === 1 && !form.role}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg text-sm hover:shadow-lg hover:shadow-orange-500/40 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {step === 1 ? 'Start (30 seconds)' : 'Continue'} <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg text-sm hover:shadow-lg hover:shadow-orange-500/40 transition-all"
                >
                  Submit <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function PricingSectionUpdated() {
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean
    tier?: string
    billingCycle?: 'monthly' | 'annual'
    amount?: number
  }>({ isOpen: false })
  const [partnerModalOpen, setPartnerModalOpen] = useState(false)

  const handlePlan = (planName: string, amount: number) => {
    if (planName === 'Founder Access Pass') {
      setPaymentModal({ isOpen: true, tier: 'founder-pass', billingCycle: 'monthly', amount })
    } else if (planName === 'Partner Networks') {
      setPartnerModalOpen(true)
    } else if (planName === 'Enterprise') {
      window.location.href = 'mailto:enterprise@myfounders.club?subject=Enterprise%20Partnership%20Inquiry'
    } else {
      alert(`Contact us for ${planName} pricing: support@myfounders.club`)
    }
  }

  return (
    <section id="pricing" className="relative w-full py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          viewport={scrollRevealConfig}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 drop-shadow-lg" style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)'
          }}>
            What It Costs
          </h2>
          <p className="text-lg text-white/85 max-w-2xl mx-auto font-light drop-shadow-lg" style={{
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
          }}>
            For founders: the core is free. The Gulf doesn't need another paywall between founders and clarity.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={scrollRevealConfig}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.35 } }}
            >
              {/* Card */}
              <div
                className={`relative h-full p-8 rounded-2xl border transition-all duration-300 ${
                  plan.popular
                    ? 'glass border-orange-500/40 bg-orange-500/5 ring-1 ring-orange-500/30'
                    : 'glass border-white/10 bg-black/40 hover:border-white/20 hover:bg-black/50'
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <motion.div
                    className="absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold shadow-lg z-30"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Popular
                  </motion.div>
                )}

                {/* Plan name and price */}
                <h3 className="text-2xl font-light text-white mb-2">{plan.name}</h3>
                <p className="text-white/85 text-sm mb-6 font-light">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-4xl font-light text-white">{plan.price}</span>
                  {plan.period && <span className="text-white/70 text-sm ml-2">{plan.period}</span>}
                </div>

                {/* CTA button */}
                <motion.button
                  onClick={() => handlePlan(plan.name, plan.name === 'Founder Access Pass' ? 25 : 0)}
                  className={`w-full py-3 rounded-lg font-semibold mb-8 flex items-center justify-center gap-2 transition-all ${
                    plan.popular
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-2xl hover:shadow-orange-500/50'
                      : 'glass glass-hover'
                  }`}
                  whileHover={{ scale: 1.04, y: -2, transition: { duration: 0.3 } }}
                  whileTap={{ scale: 0.98 }}
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                {/* Features list */}
                <div className="space-y-4">
                  {plan.features && plan.features.map((feature, featureIndex) => (
                    <motion.div
                      key={featureIndex}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + featureIndex * 0.05 }}
                    >
                      <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-muted-foreground">{feature}</span>
                    </motion.div>
                  ))}

                  {plan.buckets && plan.buckets.map((bucket, bucketIndex) => (
                    <div key={bucketIndex} className="mt-6 pt-6 border-t border-white/10">
                      <h4 className="text-sm font-semibold text-white mb-3">{bucket.title}</h4>
                      <ul className="space-y-2">
                        {bucket.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex items-start gap-3">
                            <Check className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                            <span className="text-xs text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Glow effect for popular */}
              {plan.popular && (
                <motion.div
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/0 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 pointer-events-none"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(255, 91, 35, 0.1)',
                      '0 0 40px rgba(255, 91, 35, 0.2)',
                      '0 0 20px rgba(255, 91, 35, 0.1)',
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ isOpen: false })}
        tier={paymentModal.tier || 'founder-pass'}
        billingCycle={paymentModal.billingCycle || 'monthly'}
        amount={paymentModal.amount || 25}
      />
    </section>
  )
}
