'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Users, TrendingUp, Globe, Building2 } from 'lucide-react'
import { scrollRevealConfig } from '@/lib/animation-variants'

const members = [
  {
    icon: Users,
    category: 'Founders',
    description: 'SaaS and fintech founders scaling across Saudi and the UAE',
    color: 'from-blue-500/20 to-blue-600/10'
  },
  {
    icon: TrendingUp,
    category: 'Deep-Tech & Climate',
    description: 'Innovators building at the frontier of technology and sustainability',
    color: 'from-green-500/20 to-green-600/10'
  },
  {
    icon: Building2,
    category: 'VCs & Family Offices',
    description: 'Angels, VCs, and family offices actively deploying in the GCC',
    color: 'from-purple-500/20 to-purple-600/10'
  },
  {
    icon: Globe,
    category: 'Operators',
    description: 'Across Dubai, Abu Dhabi, Riyadh, and Doha. With impact.',
    color: 'from-orange-500/20 to-orange-600/10'
  }
]

interface TiltState {
  rotateX: number
  rotateY: number
}

function RoomCard({ member }: { member: typeof members[0] }) {
  const Icon = member.icon
  const [tilt, setTilt] = useState<TiltState>({ rotateX: 0, rotateY: 0 })
  const [isHovering, setIsHovering] = useState(false)

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
      style={{ perspective: '1200px' }}
      initial={{ opacity: 0, y: 28, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 28, scale: 0.95 }}
      viewport={scrollRevealConfig}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="group h-full rounded-2xl p-8 border border-white/10 bg-[#0b0b0b] cursor-pointer will-change-transform"
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
          y: -10,
          boxShadow: '0 24px 48px rgba(255, 91, 35, 0.35)',
          transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br ${member.color} border border-white/10`}>
          <Icon className="w-7 h-7 text-orange-400" />
        </div>

        <h3 className="text-xl font-bold text-white mb-3">{member.category}</h3>
        <p className="text-white/95 leading-relaxed">{member.description}</p>
      </motion.div>
    </motion.div>
  )
}

export function WhosInTheRoomSection() {
  return (
    <section className="relative w-full py-16 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-16 lg:mb-24"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          viewport={scrollRevealConfig}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white" style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)'
          }}>
            Who's In the Room
          </h2>
          <p className="text-sm lg:text-base text-white/95 max-w-3xl mx-auto font-light leading-relaxed">
            This is not a mass community. Membership is reviewed. The room stays useful because of who's in it and who isn't.
          </p>
        </motion.div>

        {/* Members grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={scrollRevealConfig}
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.05,
              },
            },
          }}
        >
          {members.map((member, index) => (
            <RoomCard key={index} member={member} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
