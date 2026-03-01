'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowRight, Lightbulb, TrendingUp } from 'lucide-react'

export function WhoItForSection() {
  const router = useRouter()

  const roles = [
    {
      id: 'founder',
      title: 'For Founders',
      subtitle: 'Building Your Vision',
      description: 'Access investor networks, funding opportunities, mentorship, and resources to scale your startup in the Gulf.',
      features: [
        'Direct access to curated investors',
        'Funding & growth resources',
        'Expert mentorship programs',
        'Market insights & benchmarks',
      ],
      icon: Lightbulb,
      gradient: 'from-orange-500/20 to-orange-500/5',
      borderColor: 'border-orange-500/30',
      hoverBorder: 'lg:hover:border-orange-500/60',
      cta: 'Sign Up as Founder',
    },
    {
      id: 'investor',
      title: 'For Investors',
      subtitle: 'Find Your Next Investment',
      description: 'Discover vetted startup opportunities, connect with founders, and grow your portfolio with the Gulf\'s most promising companies.',
      features: [
        'Curated deal flow & startups',
        'Founder profiles & traction data',
        'Investment community access',
        'Portfolio tracking tools',
      ],
      icon: TrendingUp,
      gradient: 'from-orange-500/20 to-orange-500/5',
      borderColor: 'border-orange-500/30',
      hoverBorder: 'lg:hover:border-orange-500/60',
      cta: 'Sign Up as Investor',
    },
  ]

  const handleSignUp = (role: string) => {
    router.push(`/auth?role=${role}`)
  }

  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 font-sans drop-shadow-lg" style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 6px rgba(0, 0, 0, 0.8)'
          }}>
            Who It's For
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 max-w-2xl mx-auto font-light drop-shadow-lg" style={{
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
          }}>
            Whether you're a visionary founder or a strategic investor, MyFoundersClub connects you with the right opportunities.
          </p>
        </motion.div>

        {/* Role cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {roles.map((role, index) => {
            const Icon = role.icon
            return (
              <motion.div
                key={role.id}
                className={`relative rounded-2xl p-6 sm:p-8 lg:p-10 border-2 transition-all duration-300 ${role.borderColor} ${role.hoverBorder} group overflow-hidden`}
                style={{
                  background: `linear-gradient(135deg, ${role.id === 'founder' ? 'rgba(255, 91, 35, 0.08)' : 'rgba(59, 130, 246, 0.08)'} 0%, rgba(0, 0, 0, 0.2) 100%)`,
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                {/* Background accent */}
                <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${role.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-lg mb-4 sm:mb-6 bg-orange-500/20`}>
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 text-orange-400`} />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl font-bold mb-2 font-sans drop-shadow-lg" style={{
                    textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)'
                  }}>
                    {role.title}
                  </h3>

                  {/* Subtitle */}
                  <p className={`text-sm sm:text-base mb-4 font-light drop-shadow-lg text-orange-300`} style={{
                    textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
                  }}>
                    {role.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-300 mb-6 sm:mb-8 leading-relaxed drop-shadow-lg" style={{
                    textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)'
                  }}>
                    {role.description}
                  </p>

                  {/* Features list */}
                  <ul className="space-y-2 sm:space-y-3 mb-8 sm:mb-10">
                    {role.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300 drop-shadow-lg" style={{
                        textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
                      }}>
                        <span className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-orange-400`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    onClick={() => handleSignUp(role.id)}
                    className={`w-full py-3 sm:py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 group/btn bg-orange-500 hover:bg-orange-600 text-white`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {role.cta}
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Stats Section Below Cards */}
        <motion.div
          className="mt-16 sm:mt-20 lg:mt-24 pt-16 sm:pt-20 lg:pt-24 border-t border-white/10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-10 sm:mb-14">
            {[
              { number: '500+', label: 'Active Founders' },
              { number: '150+', label: 'Angel Investors' },
              { number: '25+', label: 'Venture Funds' },
              { number: '1000+', label: 'Monthly Opportunities' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              >
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-orange-400 mb-2 drop-shadow-lg" style={{
                  textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
                }}>
                  {stat.number}
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 font-medium drop-shadow-lg" style={{
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
                }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.p
            className="text-center text-base sm:text-lg text-gray-200 font-medium max-w-2xl mx-auto drop-shadow-lg"
            style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Join thousands of builders in the Gulf startup ecosystem
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
