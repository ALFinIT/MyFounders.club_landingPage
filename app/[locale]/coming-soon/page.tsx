'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Zap, Calendar, Sparkles } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import SocialHomeButtons from '@/components/social-home-buttons'
import StatsContract from '@/components/StatsContract'

export default function ComingSoonPage() {
  const router = useRouter()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  }

  return (
    <>
      <Navbar />
      <SocialHomeButtons />
      
      <div className="min-h-screen w-full flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden pt-16 md:pt-18">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-blue-500/5 pointer-events-none" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center space-y-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Logo */}
        <motion.div variants={itemVariants} className="mb-4">
          <img 
            src="/App Icon Orange.svg" 
            alt="MyFoundersClub"
            className="w-36 sm:w-48 md:w-56 h-auto object-contain"
          />
        </motion.div>

        {/* Main Heading */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-orange-400 animate-pulse" />
            <span className="text-orange-400 font-semibold text-sm md:text-base">EXCITING NEWS</span>
            <Sparkles className="w-6 h-6 text-orange-400 animate-pulse" />
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
            <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 bg-clip-text text-transparent">
              Coming Soon
            </span>
            <span className="block text-white mt-3">MYFOUNDERSCLUB</span>
          </h1>

          <p className="text-gray-300 text-sm md:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            We're building something extraordinary. The MYFOUNDERSCLUB ecosystem platform is launching soon with powerful tools to connect founders, capital, and opportunity across the Gulf and beyond.
          </p>
        </motion.div>

        {/* Features Preview */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mt-6">
          <div className="p-4 rounded-xl border border-orange-500/20 bg-orange-500/5 backdrop-blur-sm">
            <Zap className="w-6 h-6 text-orange-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Fast Platform</h3>
            <p className="text-gray-400 text-sm">Lightning-quick ecosystem connections</p>
          </div>

          <div className="p-4 rounded-xl border border-orange-500/20 bg-orange-500/5 backdrop-blur-sm">
            <Calendar className="w-6 h-6 text-orange-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">New Features</h3>
            <p className="text-gray-400 text-sm">Innovative tools launching weekly</p>
          </div>

          <div className="p-4 rounded-xl border border-orange-500/20 bg-orange-500/5 backdrop-blur-sm">
            <Sparkles className="w-6 h-6 text-orange-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Premium Access</h3>
            <p className="text-gray-400 text-sm">Exclusive founder ecosystem</p>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6">
          {/* Go to Pricing */}
          <Link
            href="/#pricing"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl font-semibold text-white transition-all duration-300 shadow-xl shadow-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/50 hover:scale-105 active:scale-95"
          >
            <span className="flex items-center gap-2">
              View Pricing Plans
              <Zap className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </span>
          </Link>
        </motion.div>

        {/* Countdown or Info Section */}
        <motion.div 
          variants={itemVariants} 
          className="mt-8 p-4 rounded-2xl border border-blue-500/20 bg-blue-500/5 backdrop-blur-sm max-w-xl w-full"
        >
          <h3 className="text-lg font-semibold text-blue-300 mb-3 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            What to Expect
          </h3>
          <ul className="text-sm text-gray-300 space-y-2 text-left">
            <li className="flex items-start gap-3">
              <span className="text-orange-400 font-bold text-lg leading-none">✓</span>
              <span>Gulf-based ecosystem platform connecting founders globally</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-400 font-bold text-lg leading-none">✓</span>
              <span>Advanced matching with capital providers and strategic partners</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-400 font-bold text-lg leading-none">✓</span>
              <span>Exclusive access to premium networking events and programs</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-orange-400 font-bold text-lg leading-none">✓</span>
              <span>Real-time market insights and founder resources</span>
            </li>
          </ul>
        </motion.div>

        {/* Newsletter Signup */}
        <motion.div 
          variants={itemVariants} 
          className="mt-6 p-4 rounded-2xl border border-orange-500/30 bg-gradient-to-r from-orange-500/5 to-transparent backdrop-blur-sm max-w-xl w-full"
        >
          <h3 className="text-lg font-semibold text-white mb-4">Get Notified</h3>
          <p className="text-gray-300 text-sm mb-4">Be the first to know when MYFOUNDERSCLUB launches</p>
          <form className="flex gap-2" onSubmit={async (e) => {
            e.preventDefault()
            const form = e.currentTarget as HTMLFormElement
            const input = form.querySelector('input') as HTMLInputElement
            const email = input?.value || ''
            try {
              await fetch('/api/notify-contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ page: '/coming-soon', email }) })
              alert('Thanks, we will notify you')
              input.value = ''
            } catch (err) {
              alert('Failed to submit')
            }
          }}>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 rounded-lg bg-white/10 border border-orange-500/30 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white/20 transition-all text-sm"
            />
            <button type="submit" className="px-4 py-2 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold text-white text-sm transition-all active:scale-95">
              Notify Me
            </button>
          </form>
        </motion.div>

        {/* Trust Badges */}
        <motion.div variants={itemVariants} className="mt-12 flex flex-col items-center gap-4">
          <p className="text-gray-400 text-sm">Trusted by founders across the Gulf region</p>
          <div className="flex gap-4 text-gray-500 text-xs uppercase tracking-wider">
            <span>Secure • Fast • Reliable</span>
          </div>
        </motion.div>
        <StatsContract />
      </motion.div>

      {/* Floating Animation Elements */}
      <motion.div 
        className="absolute top-20 right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-20 left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.8, 0.5, 0.8] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </div>
    </>
  )
}
