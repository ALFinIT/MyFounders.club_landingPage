'use client'

import { motion } from 'framer-motion'
import HighQualityImage from '@/components/HighQualityImage'
import { Compass, Users, Zap, TrendingUp, Award, Globe } from 'lucide-react'
import { scrollRevealConfig } from '@/lib/animation-variants'

const features = [
  {
    icon: Zap,
    title: "AI Next-Step Engine",
    description: "Your situation goes in. One clear recommendation comes out. The right programme, investor, or move for your stage, sector, and geography.",
    image: '/images/marketInsights.jpg',
  },
  {
    icon: Users,
    title: "Curated Founder Circles",
    description: "Small groups of 8 to 10 founders at your level. Confidential. The kind of room where people tell you what they actually think.",
    image: '/images/investor-directory.JPG',
  },
  {
    icon: Award,
    title: "Monthly Pitch Nights & Dinners",
    description: "Real rooms with founders, angels, VCs, and ecosystem partners. Conversations that move deals forward.",
    image: '/images/mentorship.jpeg',
  },
  {
    icon: TrendingUp,
    title: "Investor Access",
    description: "Warm introductions to investors and family offices actively deploying in the Gulf. Based on your profile and readiness score.",
    image: '/images/growth-tools.JPG',
  },
  {
    icon: Compass,
    title: "Market Entry Navigation",
    description: "Practical intelligence from founders who've already chosen between UAE and Saudi and can tell you what they'd do differently.",
    image: '/images/founders-hub.jpeg',
  },
  {
    icon: Globe,
    title: "Global Corridors",
    description: "Structured bridges between your home market and the Gulf's investors, regulators, and partners.",
    image: '/images/ecosystem.jpeg',
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative w-full py-16 lg:py-32 px-4 sm:px-6 lg:px-8">
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
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-lg" style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)'
          }}>
            What MyFounders Club Does
          </h2>
          <p className="text-sm lg:text-base text-white/95 max-w-2xl mx-auto font-light drop-shadow-lg">
            One room Two clear use cases No panels
          </p>
        </motion.div>

        {/* Features grid - staggered reveal */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          exit="hidden"
          viewport={scrollRevealConfig}
          variants={{
            hidden: { opacity: 1 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.11,
                delayChildren: 0.05,
              },
            },
          }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                className="group relative rounded-2xl overflow-hidden flex flex-col border border-white/10 bg-[#0b0b0b] transition-colors duration-300"
                variants={{
                  hidden: { opacity: 0, y: 28, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.7,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
              >
                {/* Image - visible, no overlays or gradient */}
                <div className="relative h-44 sm:h-44 lg:h-48 overflow-hidden">
                  <HighQualityImage
                    src={feature.image || '/placeholder.svg'}
                    alt={feature.title}
                    fill
                    objectFit="cover"
                    className="object-cover"
                    quality={100}
                  />
                </div>

                {/* Content - matte black card */}
                <div className="bg-[#0b0b0b] p-5 lg:p-6 flex-grow flex flex-col border-t border-white/5">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 bg-transparent flex-shrink-0">
                    <Icon className="w-5 h-5 text-orange-500" />
                  </div>

                  <h3 className="text-lg font-semibold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-white/95 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
