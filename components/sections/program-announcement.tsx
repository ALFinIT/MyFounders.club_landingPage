'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function ProgramAnnouncementSection() {
  const sectors = [
    'FinTech',
    'SaaS',
    'Health Tech',
    'E-Commerce',
    'EdTech',
    'Media & Content',
    'Supply Chain',
    'Sector-agnostic tech founders also considered',
  ]

  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Main heading */}
        <motion.h2
          className="text-2xl sm:text-5xl lg:text-6xl font-bold text-white text-center mb-4 sm:mb-6 drop-shadow-lg"
          style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.8)' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          Don't Wait for the Announcement.
        </motion.h2>

        {/* Subheading */}
        <motion.p
          className="text-sm sm:text-base lg:text-lg text-gray-300 text-center mb-10 sm:mb-16 font-light"
          style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Get the advantage. Access programs, partners, and capital <span className="text-white">before they're public</span>.
        </motion.p>

        {/* Sector pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          {sectors.map((sector, index) => (
            <motion.div
              key={index}
              className="px-4 py-2 rounded-full glass border border-orange-500/30 text-sm text-gray-300 hover:border-orange-500/50 hover:text-orange-400 transition-all"
              style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)' }}
              whileHover={{ scale: 1.06, transition: { duration: 0.25 } }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              viewport={{ once: false }}
              transition={{ delay: 0.04 + index * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {sector}
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.button
            className="group relative inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl font-semibold text-white transition-all duration-300 shadow-xl shadow-orange-500/40 overflow-hidden"
            whileHover={{ scale: 1.05, y: -3, boxShadow: '0 20px 40px rgba(255, 91, 35, 0.5)', transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.96 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative flex items-center">
              Secure My Early Access
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.div>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
