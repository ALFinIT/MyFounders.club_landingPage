'use client'

import { Navbar } from '@/components/navbar'
import { motion } from 'framer-motion'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function AcceptedPage() {
  return (
    <>
      <Navbar />
      <main className="w-full min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-2xl w-full text-center">
          {/* Success icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full opacity-20 blur-xl animate-pulse" />
              <div className="relative w-full h-full rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/50 flex items-center justify-center">
                <CheckCircle2 className="w-12 h-12 text-orange-400" />
              </div>
            </div>
          </div>

          {/* Main message */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white mb-6">
            Welcome to the Shortlist.
          </h1>

          <p className="text-xl text-muted-foreground mb-8 font-light leading-relaxed">
            You've been accepted. You're now part of an exclusive group of founders building the future of the Gulf ecosystem.
          </p>

          {/* Next steps */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-12">
            <h2 className="text-2xl font-light text-white mb-6">What's Next?</h2>
            <div className="space-y-4 text-left">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Check Your Email</h3>
                  <p className="text-muted-foreground font-light">
                    We've sent you a welcome message with your WhatsApp group link and onboarding details.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Join the WhatsApp Channel</h3>
                  <p className="text-muted-foreground font-light">
                    Connect with other founders, get real-time updates, and access exclusive opportunities.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-semibold text-sm">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-white mb-1">Schedule Your Onboarding Call</h3>
                  <p className="text-muted-foreground font-light">
                    We'll walk you through available programs and how to maximize your membership.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <button className="group relative inline-flex items-center justify-center px-10 py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl font-semibold text-white transition-all duration-300 shadow-xl shadow-orange-500/40 overflow-hidden w-full sm:w-auto">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <span className="relative flex items-center justify-center">
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              </button>
            </Link>
            <Link href="/">
              <button className="group relative inline-flex items-center justify-center px-10 py-4 glass glass-hover font-semibold text-white rounded-2xl overflow-hidden w-full sm:w-auto">
                <span className="relative flex items-center justify-center">
                  Back to Home
                </span>
              </button>
            </Link>
          </div>

          {/* Footer note */}
          <p className="text-sm text-muted-foreground mt-8 font-light">
            Questions? Reach out to <a href="mailto:hello@myfounderclub.com" className="text-orange-400 hover:text-orange-300">hello@myfounderclub.com</a>
          </p>
        </div>
      </main>
    </>
  )
}
