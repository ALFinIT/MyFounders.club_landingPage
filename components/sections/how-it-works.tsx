'use client'

import { motion } from 'framer-motion'
import { FileText, UserCheck, Users, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { animationVariants, scrollRevealConfig } from '@/lib/animation-variants'

const steps = [
  {
    icon: FileText,
    key: 'apply',
    title: 'Apply',
    description: 'Two minutes. Tell us who you are, where you are based, and what you are building. We review every application with care.',
  },
  {
    icon: UserCheck,
    key: 'profile',
    title: 'Profile & Next Step',
    description: 'If accepted, your founder profile goes live and we suggest the best next step tailored to your stage and goals.',
  },
  {
    icon: Users,
    key: 'connect',
    title: 'Join The Room',
    description: 'Attend matched circles, events, and deal rooms. Local track or GCC expansion depending on your plans.',
  },
  {
    icon: TrendingUp,
    key: 'grow',
    title: 'Build, Expand, Raise',
    description: 'Leverage community, intelligence, and corridors to grow in the Gulf and reach the right capital at the right time.',
  },
]

interface TiltState {
  rotateX: number
  rotateY: number
}

function StepCard({ step }: { step: typeof steps[0] }) {
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const Icon = step.icon

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const x = e.clientX - rect.left - centerX
    const y = e.clientY - rect.top - centerY

    const rotateX = (y / centerY) * 8
    const rotateY = (x / centerX) * -8

    setTilt({ rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 })
    setIsHovering(false)
  }

  return (
    <motion.div
      className="h-full perspective"
      style={{
        perspective: '1200px',
      }}
      variants={animationVariants.staggerItem}
    >
      <motion.article
        className="group h-full rounded-2xl p-8 sm:p-12 lg:p-14 border border-white/10 bg-[#0b0b0b] cursor-pointer will-change-transform"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: isHovering ? tilt.rotateX : 0,
          rotateY: isHovering ? tilt.rotateY : 0,
        }}
        transition={{
          rotateX: { duration: 0.2, ease: 'easeOut' },
          rotateY: { duration: 0.2, ease: 'easeOut' },
        }}
        style={{
          transformStyle: 'preserve-3d',
          transformPerspective: '1200px',
        }}
        whileHover={{
          y: -12,
          boxShadow: '0 24px 48px rgba(255, 91, 35, 0.35)',
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        <div className="flex items-start gap-6 relative z-10">
          <div className="flex-none">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl flex items-center justify-center bg-gradient-to-br from-orange-500/20 to-orange-500/8 border border-white/6 group-hover:from-orange-500/30 group-hover:to-orange-500/15 transition-colors duration-300">
              <Icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-orange-300" />
            </div>
          </div>

          <div className="flex-1">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 drop-shadow-lg" style={{
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
            }}>{step.title}</h3>
            <p className="text-base sm:text-lg lg:text-lg text-white/80 leading-relaxed group-hover:text-white/90 transition-colors duration-300 drop-shadow-lg" style={{
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
            }}>{step.description}</p>
          </div>
        </div>
      </motion.article>
    </motion.div>
  )
}

export function HowItWorksSection() {
  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16 sm:mb-20 lg:mb-24"
          variants={animationVariants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealConfig}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 drop-shadow-lg" style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)'
          }}>How It Works</h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl mx-auto drop-shadow-lg" style={{
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
          }}>Four premium steps. Clear, deliberate, and designed for founders.</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-14"
          variants={animationVariants.staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealConfig}
        >
          {steps.map((step) => (
            <StepCard key={step.key} step={step} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
