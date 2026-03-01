'use client'

import { motion } from 'framer-motion'
import { animationVariants, scrollRevealConfig } from '@/lib/animation-variants'
import { useEffect, useState } from 'react'

interface StatCounter {
  value: number
  label: string
  suffix?: string
}

const stats: StatCounter[] = [
  { value: 500, label: 'Active Founders', suffix: '+' },
  { value: 150, label: 'Angel Investors', suffix: '+' },
  { value: 25, label: 'Venture Funds', suffix: '+' },
  { value: 1000, label: 'Monthly Opportunities', suffix: '+' },
]

function Counter({ value, label, suffix }: StatCounter) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let currentValue = 0
          const increment = Math.ceil(value / 50)
          const timer = setInterval(() => {
            currentValue += increment
            if (currentValue >= value) {
              setDisplayValue(value)
              clearInterval(timer)
            } else {
              setDisplayValue(currentValue)
            }
          }, 30)

          return () => clearInterval(timer)
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById(`counter-${label}`)
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [value, label])

  return (
    <motion.div
      id={`counter-${label}`}
      className="text-center"
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 28, scale: 0.95 }}
      viewport={scrollRevealConfig}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="text-3xl sm:text-4xl lg:text-6xl font-light text-orange-500 mb-2 sm:mb-3">
        {displayValue}
        {suffix}
      </p>
      <p className="text-white/85 text-xs sm:text-base font-light" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)' }}>{label}</p>
    </motion.div>
  )
}

export function StatsSection() {
  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Decorative background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />
        </div>

        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-16 relative z-10"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          viewport={scrollRevealConfig}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)' }}>
            Why Founders Join
          </h2>
          <motion.div
            className="max-w-4xl mx-auto space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            viewport={scrollRevealConfig}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <motion.p
              className="text-base sm:text-lg text-white/85 font-light leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              viewport={scrollRevealConfig}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-semibold">Gulf-based founders join to:</span> Stop spending months on programmes, grants, and investors that were never right for their stage. Find founders who understand the actual texture of building here, including Saudization, Emirates ID, hiring in a city of expats, and selling to government entities. Get into rooms where the conversation is about real numbers. Not vision.
            </motion.p>
            <motion.p
              className="text-base sm:text-lg text-white/85 font-light leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              viewport={scrollRevealConfig}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-semibold">International founders expanding into the GCC join to:</span> Skip 12 to 18 months of wandering conferences and cold coffee chats. Land with a clear sequence of moves and the warm introductions that make them real. Build trust faster in a region where relationships are the infrastructure.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Stats grid */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:gap-12">
          {stats.map((stat) => (
            <Counter key={stat.label} {...stat} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          viewport={scrollRevealConfig}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-white/85 mb-6" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
            Join thousands of builders in the Gulf startup ecosystem
          </p>
          {/* <motion.button
            className="px-8 py-4 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Today
          </motion.button> */}
        </motion.div>
      </div>
    </section>
  )
}
