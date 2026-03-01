'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Check, ArrowRight } from 'lucide-react'

const plans = [
  {
    name: 'Founder',
    price: 'Free',
    description: 'Perfect for getting started',
    features: [
      'Access to founder network',
      'Monthly ecosystem updates',
      'Job board access',
      'Basic analytics',
    ],
    popular: false,
  },
  {
    name: 'Scale',
    price: '$49',
    period: '/month',
    description: 'For growing companies',
    features: [
      'Everything in Founder',
      'Priority investor introductions',
      'Funding database access',
      'Advanced analytics',
      'Mentorship matching',
      'Event invitations',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For established players',
    features: [
      'Everything in Scale',
      'Dedicated account manager',
      'Custom API access',
      'White-label options',
      'Priority support 24/7',
      'Custom integrations',
    ],
    popular: false,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export function PricingSection() {
  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)' }}>
            Simple, Transparent Pricing
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto font-light" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
            Choose the plan that fits your stage and unlock the ecosystem.
          </p>
        </motion.div>

        {/* Pricing cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              className="relative group"
              variants={cardVariants}
              whileHover={{ y: -10 }}
            >
              {/* Card */}
              <div
                className={`relative h-full p-8 rounded-2xl border transition-all duration-300 ${
                  plan.popular
                    ? 'glass border-orange-500/50 bg-black/60 ring-1 ring-orange-500/20'
                    : 'glass border-white/10 bg-black/50 hover:border-white/20 hover:bg-black/60'
                }`}
              >
                {/* Popular badge */}
                {plan.popular && (
                  <motion.div
                      className="absolute -top-6 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold shadow-lg z-30"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Most Popular
                  </motion.div>
                )}

                {/* Plan name and price */}
                <h3 className="text-2xl font-light text-white mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6 font-light">{plan.description}</p>

                <div className="mb-8">
                  <span className="text-4xl font-light text-white">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground text-sm ml-2">{plan.period}</span>}
                </div>

                {/* CTA button */}
                <PricingCTA popular={plan.popular} />

                {/* Features list */}
                <div className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
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

        {/* Footer note */}
        <motion.p
          className="text-center text-muted-foreground text-sm mt-12 font-light"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          All plans include access to the WhatsApp community. No credit card required to start.
        </motion.p>
      </div>
    </section>
  )
}

function PricingCTA({ popular }: { popular?: boolean }) {
  const router = useRouter()

  return (
    <motion.button
      onClick={() => router.push('/auth')}
      className={`w-full py-3 rounded-lg font-semibold mb-8 flex items-center justify-center gap-2 transition-all ${
        popular
          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:shadow-2xl hover:shadow-orange-500/50'
          : 'glass glass-hover'
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      type="button"
    >
      Get Started
      <ArrowRight className="w-4 h-4" />
    </motion.button>
  )
}
