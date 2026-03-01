'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowRight, Lightbulb, TrendingUp } from 'lucide-react'
import { scrollRevealConfig } from '@/lib/animation-variants'

export function JoinCommunitySection() {
  const router = useRouter()

  const roles = [
    {
      id: 'founder',
      title: "If you're building in the GCC",
      subtitle: "You're in Dubai, Riyadh, Jeddah, Doha, Abu Dhabi, Manama, Kuwait City, or Muscat.",
      description: "You're past the idea stage. And you're realising that more events aren't the answer. What you actually need:",
      features: [
        "One clear next step. Not 40 options.",
        "Founders who've navigated Saudization, free zones, and Gulf fundraising.",
        "Warm introductions to investors already active in this region.",
        "A signal on where you stand compared to founders building alongside you.",
      ],
      icon: Lightbulb,
      cta: "I'm Building in the GCC",
    },
    {
      id: 'investor',
      title: "If you're expanding into the GCC",
      subtitle: "You've proven your model elsewhere. The Gulf is the next move.",
      description: "But you're asking the right questions: Which GCC market first? Who can you trust? How do deals really work here? How do you avoid 12 to 18 months of expensive cold starts?",
      features: [
        "Market Entry Navigation from founders who've chosen between UAE and Saudi.",
        "On-the-Ground Network for immediate pilots, hires, and partnerships.",
        "Global Corridors connecting your home market to Gulf investors and regulators.",
        "MyFounders.Club is the corridor in.",
      ],
      icon: TrendingUp,
      cta: "I'm Expanding into the GCC",
    },
  ]

  const handleSignUp = (role: string) => {
    router.push(`/auth?role=${role}&mode=signup`)
  }

  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8" id="who-for">
      <div className="max-w-6xl mx-auto">
        {/* Section header - Premium fade animation */}
        <motion.div
          className="text-center mb-16 sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          viewport={scrollRevealConfig}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-white drop-shadow-lg" style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 6px rgba(0, 0, 0, 0.8)'
          }}>
            Two types of founders belong here.
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/85 max-w-2xl mx-auto font-light drop-shadow-lg" style={{
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
          }}>
            Whether you're building in the Gulf or expanding into it, MFC is your operating system.
          </p>
        </motion.div>

        {/* Role cards with perfect centering */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 items-stretch lg:items-stretch justify-center">
          {roles.map((role, index) => {
            const Icon = role.icon
            return (
              <motion.div
                key={role.id}
                className="relative rounded-2xl p-6 sm:p-8 lg:p-10 border-2 border-orange-500/30 hover:border-orange-500/60 group overflow-hidden flex-1 max-w-xl transition-all duration-300"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 91, 35, 0.08) 0%, rgba(0, 0, 0, 0.2) 100%)',
                }}
                initial={{ opacity: 0, y: 28, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 28, scale: 0.96 }}
                viewport={scrollRevealConfig}
                transition={{ duration: 0.75, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
              >
                {/* Background accent glow */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-orange-500/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon - smooth scale on hover */}
                  <motion.div
                    className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg mb-4 sm:mb-6 bg-orange-500/20"
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-orange-400" />
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white drop-shadow-lg" style={{
                    textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)'
                  }}>
                    {role.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm sm:text-base mb-4 font-light drop-shadow-lg text-orange-300" style={{
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
                  }}>
                    {role.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-white/85 mb-6 sm:mb-8 leading-relaxed drop-shadow-lg" style={{
                    textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)'
                  }}>
                    {role.description}
                  </p>

                  {/* Features list - staggered on view */}
                  <motion.ul
                    className="space-y-2 sm:space-y-3 mb-8 sm:mb-10"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    viewport={scrollRevealConfig}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {role.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-3 text-xs sm:text-sm text-white/85 drop-shadow-lg" style={{
                          textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
                        }}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        viewport={{ once: false }}
                        transition={{ duration: 0.5, delay: idx * 0.08 }}
                      >
                        <span className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-orange-400" />
                        {feature}
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* CTA Button - Centered & Premium */}
                  <motion.button
                    onClick={() => handleSignUp(role.id)}
                    className="w-full py-3 sm:py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 group/btn bg-gradient-to-r from-orange-500 to-orange-600 hover:shadow-2xl hover:shadow-orange-500/50 text-white"
                    whileHover={{
                      scale: 1.04,
                      y: -2,
                      boxShadow: '0 16px 40px rgba(255, 91, 35, 0.4)',
                      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                    }}
                    whileTap={{ scale: 0.97, transition: { duration: 0.15 } }}
                  >
                    {role.cta}
                    <motion.div
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </motion.div>
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Trust indicators - smooth fade in */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          viewport={scrollRevealConfig}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-white/60 text-xs sm:text-sm font-light">
            Join 500+ founders and investors building the future of the Gulf
          </p>
        </motion.div>
      </div>
    </section>
  )
}
