'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Rocket, TrendingUp, DollarSign, Building2, Zap, CheckCircle2 } from 'lucide-react'
import { scrollRevealVariants, containerVariants, itemVariants } from '@/lib/motion-system'

const reasons = [
  {
    title: 'Gulf-Based Founders',
    points: [
      'Stop spending months on programmes, grants, and investors that were never right for your stage',
      'Find founders who understand the actual texture of building here, including Saudization, Emirates ID, hiring in a city of expats, and selling to government entities',
      'Get into rooms where the conversation is about real numbers. Not vision.'
    ]
  },
  {
    title: 'International Founders',
    points: [
      'Skip 12 to 18 months of wandering conferences and cold coffee chats',
      'Land with a clear sequence of moves and the warm introductions that make them real',
      'Build trust faster in a region where relationships are the infrastructure'
    ]
  }
]

const whoThisIsFor = [
  { icon: Rocket, label: 'Startups seeking Gulf capital or market entry' },
  { icon: TrendingUp, label: 'SMEs expanding regionally or seeking corporate contracts' },
  { icon: DollarSign, label: 'Investors looking for vetted GCC deal flow' },
  { icon: Building2, label: 'Family Offices seeking strategic Gulf exposure' },
  { icon: Zap, label: 'Service Providers wanting qualified startup/SME clients' }
]

interface TiltState {
  rotateX: number
  rotateY: number
}

function WhyJoinCard({ reason }: { reason: typeof reasons[0] }) {
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const x = e.clientX - rect.left - centerX
    const y = e.clientY - rect.top - centerY

    const rotateX = (y / centerY) * 10
    const rotateY = (x / centerX) * -10

    setTilt({ rotateX, rotateY })
  }

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 })
    setIsHovering(false)
  }

  return (
    <motion.div
      className="h-full perspective"
      style={{ perspective: '1200px' }}
      variants={scrollRevealVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={{ once: false, margin: '-100px' }}
    >
      <motion.div
        className="group h-full rounded-2xl p-8 border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-orange-600/5 cursor-pointer will-change-transform hover:border-orange-500/50 transition-colors"
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
          y: -8,
          boxShadow: '0 20px 48px rgba(255, 91, 35, 0.15)',
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        <h3 className="text-2xl font-bold text-orange-400 mb-6">{reason.title}</h3>
        
        <ul className="space-y-4">
          {reason.points.map((point, idx) => (
            <motion.li
              key={idx}
              className="flex gap-4 text-white/95"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ delay: idx * 0.1 }}
            >
              <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 mt-0.5">
                <CheckCircle2 size={16} />
              </span>
              <span className="leading-relaxed">{point}</span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </motion.div>
  )
}
export function WhyJoinSection() {
  return (
    <section className="relative w-full py-16 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white" style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)'
          }}>
            Build Locally. Champion Regionally. Scale Globally.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Why Join Cards */}
          <motion.div
            className="flex flex-col gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
          >
            {reasons.map((reason, idx) => (
              <WhyJoinCard key={idx} reason={reason} />
            ))}
          </motion.div>

          {/* Who This Is For */}
          <motion.div
            className="flex flex-col gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
          >
            <h3 className="text-2xl font-bold text-orange-400 mb-2">Who This Is For:</h3>
            {whoThisIsFor.map((item, idx) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={idx}
                  className="flex items-center gap-4 p-4 rounded-lg border border-orange-500/30 bg-gradient-to-r from-orange-500/5 to-orange-600/5 hover:border-orange-500/50 transition-colors"
                  variants={itemVariants}
                  whileHover={{ x: 8, transition: { duration: 0.2 } }}
                >
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400">
                    <IconComponent size={18} />
                  </div>
                  <span className="text-white/95 leading-relaxed">{item.label}</span>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* What You Get */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-orange-400 mb-6 text-center">What You Get:</h3>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: '-100px' }}
          >
            {[
              'Validated Profile in our Gulf ecosystem database',
              'WhatsApp Community Access with founders, investors, and partners',
              'Direct Introductions based on your needs',
              'Government Program Alerts (Vision 2030/2071 opportunities)',
              'Event Invitations (Demo Days, investor meetups)',
              'Priority Access to capital, partnerships, and regional expansion support'
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-lg border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-orange-600/5"
                variants={itemVariants}
              >
                <CheckCircle2 className="flex-shrink-0 w-5 h-5 text-orange-400 mt-0.5" />
                <span className="text-white/90 text-sm leading-relaxed">{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Investment Details */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 backdrop-blur-sm border border-orange-500/30 rounded-xl p-8 max-w-2xl mx-auto hover:border-orange-500/50 transition-colors">
            <h3 className="text-2xl font-bold text-orange-400 mb-4">Investment: $120/year</h3>
            <p className="text-white/90 mb-2">(one-time payment, annual renewal)</p>
            <p className="text-white/90 mb-2">Decision: 48 to 72 hours after application</p>
            <p className="text-white/90">Access: Immediate WhatsApp group invite upon approval</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
