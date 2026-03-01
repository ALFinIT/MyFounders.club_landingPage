"use client"

import { motion } from 'framer-motion'
import { scrollRevealConfig } from '@/lib/animation-variants'
import { useRef, useState } from 'react'

function TiltCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [style, setStyle] = useState({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)' })

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const cx = rect.width / 2
    const cy = rect.height / 2
    const dx = (x - cx) / cx
    const dy = (y - cy) / cy
    const rotateY = dx * 8 // degrees
    const rotateX = -dy * 8
    const translateZ = 8
    setStyle({ transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)` })
  }

  const handleLeave = () => setStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)' })

  return (
    <motion.div
      ref={ref}
      className="rounded-2xl p-6 bg-[#0b0b0b] border border-white/8"
      style={{ ...style, boxShadow: '0 8px 32px rgba(255, 91, 35, 0.15)' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 28 }}
      viewport={scrollRevealConfig}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.02, boxShadow: '0 16px 40px rgba(255, 91, 35, 0.3)' }}
    >
      {children}
    </motion.div>
  )
}

export function ProblemSection() {
  const cards = [
    {
      title: '$4.5 billion',
      subtitle: 'flowed into GCC startups in Q3 2025 alone',
      body: 'Founders are still figuring it out alone.',
    },
    {
      title: 'Signal Overload',
      subtitle: 'New programmes and events every week',
      body: "64% of Gulf founders say the noise actively impairs their decision-making.",
    },
    {
      title: 'Missing Room',
      subtitle: 'Actionable clarity is rare',
      body: "The problem isn't access to information. It's the absence of a room where someone who's actually done this tells you what matters now for your stage, your sector, and your market.",
    },
  ]

  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header - Premium bi-directional fade */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          viewport={scrollRevealConfig}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.8), 0 2px 4px rgba(0, 0, 0, 0.6)' }}>
            The Problem
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/80 max-w-3xl mx-auto font-light drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
            The Gulf is awash with capital and programmes, yet founders still lack a simple room that provides clear, stage-appropriate guidance.
          </p>
        </motion.div>

        {/* Cards grid with tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-8">
          {cards.map((c, i) => (
            <TiltCard key={i} delay={i * 0.12}>
              <div className="flex flex-col h-full">
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-2">{c.title}</h3>
                  <p className="text-sm text-white/90 mb-4 font-medium">{c.subtitle}</p>
                  <p className="text-sm text-white font-light mt-auto">{c.body}</p>
                </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
