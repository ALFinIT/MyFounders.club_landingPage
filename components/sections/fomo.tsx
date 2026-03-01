'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, AlertCircle } from 'lucide-react'

export function FOMOSection() {
  const qualifications = [
    'Founder-led company (tech-agnostic)',
    'Revenue or funding traction',
    'Team in place or building',
    'Vision for Gulf/Global expansion or regional impact',
    'Coachable and committed long-term',
  ]

  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Main narrative */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8 text-left"
        >
          {/* First paragraph */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-white drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.8)' }}>
              This isn't a waitlist.
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed font-light" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)' }}>
              It's a <span className="text-orange-400 font-semibold">shortlist. <br />
              </span> We're building the Gulf's most selective founder community not for gatekeeping, but for signal. Every member has been vetted, qualified, and committed to moving fast.
            </p>
          </div>

          {/* Second paragraph */}
          <p className="text-sm sm:text-base lg:text-lg text-gray-300 leading-relaxed font-light" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.7)' }}>
           <span className="text-orange-400 font-semibold"> The founders in this shortlist don't wait for announcements.</span> <br />They get the <span className="text-orange-400 font-semibold">advantage:</span> <br />first access to capital, strategic partners, and opportunities before they're public knowledge.
          </p>
        </motion.div>

        {/* Qualification checklist */}
        <motion.div
          className="mt-16 p-8 rounded-2xl glass border border-orange-500/20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-lg sm:text-xl lg:text-2xl font-light text-white mb-6 sm:mb-8 drop-shadow-lg" style={{ textShadow: '0 3px 10px rgba(0, 0, 0, 0.8)' }}>You Should Apply If...</h3>
          <div className="space-y-3 sm:space-y-4">
            {qualifications.map((qualification, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-4"
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                viewport={{ once: false }}
                transition={{ delay: 0.08 + index * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm lg:text-base text-gray-300 leading-relaxed" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)' }}>{qualification}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Who shouldn't apply */}
        <motion.div
          className="mt-8 p-8 rounded-2xl glass border border-orange-500/20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-lg sm:text-xl lg:text-2xl font-light text-white mb-4 sm:mb-6 flex items-center gap-2 drop-shadow-lg" style={{ textShadow: '0 3px 10px rgba(0, 0, 0, 0.8)' }}>
            <AlertCircle className="w-6 h-6 text-orange-400" />
            You Should Not Apply If...
          </h3>
          <ul className="space-y-3 text-gray-300" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)' }}>
            <li>• You're still in the ideation phase</li>
            <li>• You're looking for validation, not execution</li>
            <li>• You're not ready to commit 12+ months</li>
            <li>• You're just looking for a discount or "status"</li>
          </ul>
        </motion.div>

        {/* Closing statement */}
        <motion.p
          className="text-lg text-white font-light text-center mt-12 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          viewport={{ once: false }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          The shortlist closes when it's full. <span className="text-orange-400 font-semibold">Don't wait.</span>
        </motion.p>
      </div>
    </section>
  )
}
