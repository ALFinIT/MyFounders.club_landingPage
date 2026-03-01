'use client'

import { motion } from 'framer-motion'
import HighQualityImage from '@/components/HighQualityImage'
import { useState } from 'react'
import { Users, Zap, TrendingUp, MapPin, Wrench, Award } from 'lucide-react'
import { scrollRevealVariants, containerVariants, itemVariants } from '@/lib/motion-system'

// Gulf startup ecosystem companies
const founders = [
  {
    name: 'Ahmed Al Zahrani',
    company: 'Careem',
    image: '/founders/founder1.jpg',
  },
  {
    name: 'Omar Hassan',
    company: 'Noon',
    image: '/founders/founder1.jpg',
  },
  {
    name: 'Sara Al Mansoori',
    company: 'Talabat',
    image: '/founders/founder1.jpg',
  },
  {
    name: 'Faisal Khan',
    company: 'Namshi',
    image: '/founders/founder1.jpg',
  },
  {
    name: 'Yousef Ali',
    company: 'ADIB',
    image: '/founders/founder1.jpg',
  },
]

const stats = [
  { number: '500+', label: 'Active Members', icon: Users },
  { number: '100+', label: 'Investors Connected', icon: Zap },
  { number: '$10M+', label: 'Capital Facilitated', icon: TrendingUp },
  { number: '6', label: 'GCC Countries', icon: MapPin },
  { number: '200+', label: 'Service Providers', icon: Wrench },
  { number: '85%', label: 'Member Satisfaction', icon: Award }
]

export function SocialProofSection() {
  const [dragX, setDragX] = useState(0)

  return (
    <section className="relative w-full py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: false, margin: '-100px' }}
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg text-orange-400" style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)'
          }}>
            Current Ecosystem
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-100px' }}
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <motion.div
                key={index}
                className="text-center bg-gradient-to-br from-orange-500/10 to-orange-600/5 backdrop-blur-sm border border-orange-500/30 rounded-xl p-4 hover:border-orange-500/50 transition-colors group"
                variants={itemVariants}
              >
                <div className="flex justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-orange-400 mb-1">
                  {stat.number}
                </h3>
                <p className="text-sm text-white/80">
                  {stat.label}
                </p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Featured Members */}
        <motion.div
          className="text-center"
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: false, margin: '-100px' }}
        >
          <h3 className="text-xl font-semibold text-orange-400 mb-4">Featured Members Include:</h3>
          <p className="text-white/90 mb-2">
            <strong className="text-white">Founders:</strong> Careem, Noon, Fetchr alumni
          </p>
          <p className="text-white/90 mb-2">
            <strong className="text-white">Investors:</strong> BECO Capital, Nuwa Capital, Shorooq Partners
          </p>
          <p className="text-white/90">
            <strong className="text-white">Service providers:</strong> leading Gulf law firms, Big 4 accounting, cloud partners
          </p>
        </motion.div>
      </div>
    </section>
  )
}
