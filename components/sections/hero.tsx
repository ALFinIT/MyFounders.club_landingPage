'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import HighQualityImage from '../HighQualityImage'
import { ArrowRight, Zap } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
      duration: 0.8,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1], // premium smooth ease
    },
  },
}

const headingVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}
export function HeroSection() {
  return (
      <section id="hero" className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center" style={{ minHeight: '100vh', paddingTop: '40px' }}>
        {/* Full-width banner placed at top of hero only */}
      <div className="w-full mt-12 relative -top-6">

  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex justify-center">
    <img 
      src="/images/App Icon Orange.svg"
      alt="MyFoundersClub Banner"
      className="w-64 sm:w-80 md:w-[600px] lg:w-[750px] h-auto object-contain"
    />
  </div>
</div>


      <motion.div
        className="relative z-10 max-w-6xl text-center flex flex-col items-center -mt-6 px-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-6 mb-6">

          <motion.div className="space-y-4" variants={itemVariants}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] hero-heading font-extrabold drop-shadow-xl" style={{
              textShadow: '0 6px 20px rgba(0, 0, 0, 0.95), 0 3px 8px rgba(0, 0, 0, 0.8)'
            }}>
              <motion.span 
                className="block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                Build in the Gulf
              </motion.span>
              <motion.span 
                className="block text-[#FF5B23] font-black"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.9 }}
              >
                Wired to the world.
              </motion.span>
              <motion.span 
                className="block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
              </motion.span>
            </h1>

            <motion.p 
              className="mt-4 mx-auto hero-subheading neon-subheading max-w-[900px] text-center text-sm sm:text-base md:text-lg leading-relaxed drop-shadow-lg text-white font-medium" 
              style={{
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.85), 0 2px 6px rgba(0, 0, 0, 0.7)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              MyFounders.Club is the startup intelligence layer for Gulf founders and the institutions that back them  bringing together a local founder community with AI-powered ecosystem data so the right founders and capital find each other faster.
            </motion.p>
            
            <motion.p 
              className="mt-2 mx-auto text-base sm:text-lg md:text-xl max-w-[900px] text-center leading-relaxed drop-shadow-lg text-white font-medium"
              style={{
                textShadow: '0 4px 12px rgba(0, 0, 0, 0.85), 0 2px 6px rgba(0, 0, 0, 0.7)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85, duration: 0.8 }}
            >
             One application. One payment. Unlimited connections.
            </motion.p>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center w-full px-2" variants={itemVariants}>
            <HeroCTA />
          </motion.div>
        </div>

        <SocialProof />
      </motion.div>

      <ScrollIndicator />
    </section>
  )
}

function HeroCTA() {
  const router = useRouter()

  return (
    <>
      <motion.button
        onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
        className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl font-bold text-white transition-all duration-300 shadow-xl shadow-orange-500/50 w-full sm:w-auto max-w-[340px] overflow-hidden"
        whileHover={{ scale: 1.06, y: -4, boxShadow: '0 20px 50px rgba(255, 91, 35, 0.6)' }}
        whileTap={{ scale: 0.94 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.6 }}
        aria-label="Request Access"
        type="button"
      >
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 2 }}
          style={{ opacity: 0.2 }}
        />
        <span className="relative flex items-center">
          Apply Now &nbsp;
          <motion.div animate={{ y: [1, 0, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}>
             →
          </motion.div>
        </span>
      </motion.button>

      <motion.button
        onClick={() => router.push('/fit')}
        className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-white/15 border-2 border-white/40 hover:border-orange-400/80 rounded-2xl font-semibold text-white transition-all duration-300 w-full sm:w-auto max-w-[340px] backdrop-blur-sm"
        whileHover={{ scale: 1.06, y: -4, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderColor: 'rgba(255, 140, 0, 0.8)' }}
        whileTap={{ scale: 0.94 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.6 }}
        aria-label="Is This For You"
        type="button"
      >
        <span className="relative flex items-center">
          Is This For You ?
        </span>
      </motion.button>
    </>
  )
}

function SocialProof() {
  return (
    <motion.div className="flex flex-col items-center justify-center gap-4 text-sm -mt-2" variants={itemVariants}>
      <p className="neon-subheading font-bold text-center text-white drop-shadow-lg" style={{ textShadow: '0 3px 10px rgba(0, 0, 0, 0.8)' }}>
        <span title="Saudi Arabia">🇸🇦</span> Vision 2030 &nbsp;|&nbsp; <span title="UAE">🇦🇪</span> Centennial 2071 &nbsp;|&nbsp; <span title="Qatar">🇶🇦</span> QNV 2030 &nbsp;|&nbsp; <span title="Oman">🇴🇲</span> Vision 2040 &nbsp;|&nbsp; <span title="Kuwait">🇰🇼</span> Vision 2035 &nbsp;|&nbsp; <span title="Bahrain">🇧🇭</span> EV 2030
      </p>
    </motion.div>
  )
}

function ScrollIndicator() {
  return (
    <motion.div 
      className="relative w-full flex flex-col items-center gap-2 mt-8" 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, 12, 0] }} 
      transition={{ delay: 1.3, duration: 2.2, repeat: Infinity }}
    >
      <motion.p 
        className="text-xs slow-blink text-white/90 uppercase tracking-widest font-medium drop-shadow-lg"
        style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}
      >
        Scroll to explore
      </motion.p>
      <motion.div 
        className="w-[2px] h-8 bg-gradient-to-b from-orange-500 via-orange-400 to-transparent rounded-full"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      />
    </motion.div>
  )
}
