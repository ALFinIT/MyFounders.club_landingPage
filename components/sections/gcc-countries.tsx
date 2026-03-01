'use client'

import { motion } from 'framer-motion'
import { containerVariants, itemVariants, scrollRevealVariants } from '@/lib/motion-system'
import { Globe, TrendingUp, Award, MapPin, Zap, Building2 } from 'lucide-react'

const IconComponent = ({ type }: { type: number }) => {
  const icons = [Globe, TrendingUp, Award, MapPin, Zap, Building2]
  const Icon = icons[type % icons.length]
  return <Icon className="w-5 h-5 text-orange-500 flex-shrink-0" />
}

const countries = [
  {
    flag: '🇦🇪',
    name: 'Abu Dhabi & Dubai, UAE',
    details: [
      '8-hour flight to 4 billion people',
      '1 trillion plus sovereign wealth funds',
      '40+ free zones with instant global banking',
      'Gateway to Africa, South Asia, Europe',
    ],
  },
  {
    flag: '🇸🇦',
    name: 'Riyadh, Saudi Arabia',
    details: [
      '500 billion plus mega-projects (NEOM, Red Sea, Qiddiya)',
      '35 million population, Vision 2030 transformation',
      'Priority sectors: Tech, Tourism, Entertainment, Green Energy',
      'Largest GCC market with government-backed scale',
    ],
  },
  {
    flag: '🇶🇦',
    name: 'Doha, Qatar',
    details: [
      'Highest GDP per capita globally',
      'Qatar Investment Authority: 475 billion AUM',
      'Education City Innovation Hub',
      'Finance, EdTech, Sports Tech opportunities',
    ],
  },
  {
    flag: '🇴🇲',
    name: 'Muscat, Oman',
    details: [
      'Duqm Port: Indian Ocean trade gateway',
      'Sustainability focus, tourism investment',
      'Emerging startup ecosystem less competition',
      'First-mover advantages, logistics hub',
    ],
  },
  {
    flag: '🇰🇼',
    name: 'Kuwait City, Kuwait',
    details: [
      'Kuwait Investment Authority: 738 billion (oldest sovereign fund)',
      'Strong financial services sector',
      'Untapped tech adoption potential',
      'Patient capital, institutional partnerships',
    ],
  },
  {
    flag: '🇧🇭',
    name: 'Manama, Bahrain',
    details: [
      'MENA financial hub, 100+ international banks',
      'FinTech-friendly regulation sandbox programs',
      'Bahrain FinTech Bay Startup Bahrain',
      'Regulatory innovation, FinTech paradise',
    ],
  },
]

export function GCCCountriesSection() {
  return (
    <section className="relative w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/95">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Six Countries. One Ecosystem. Infinite Reach.
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Access the most dynamic startup markets across the Gulf region
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {countries.map((country, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group bg-gradient-to-br from-orange-500/10 to-orange-600/5 border border-orange-500/30 rounded-xl p-6 hover:border-orange-500/50 transition-all duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-orange-500 mb-4 flex items-center gap-2">
                <span className="text-2xl leading-none">{country.flag}</span>
                {country.name}
              </h3>
              <ul className="space-y-3">
                {country.details.map((detail, idx) => (
                  <motion.li
                    key={idx}
                    variants={itemVariants}
                    className="flex gap-3 text-white/80 text-sm leading-relaxed"
                  >
                    <IconComponent type={idx} />
                    <span>{detail}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}