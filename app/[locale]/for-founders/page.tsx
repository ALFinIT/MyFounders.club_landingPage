'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function FounderPage() {
  const t = useTranslations()

  return (
    <div className="min-h-screen bg-black">
      {/* NAV */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-[5%] py-[18px] bg-black/90 backdrop-blur-xl border-b border-orange-500/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/" className="flex items-center gap-3 font-syne font-bold text-lg text-white no-underline">
          <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
            <path d="M8 30 L20 8 L32 30" stroke="#FF5B23" strokeWidth="2.8" fill="none" strokeLinejoin="round"/>
            <path d="M14 30 L26 30" stroke="#FF5B23" strokeWidth="2.8"/>
            <path d="M27 12 L35 20 L27 28" stroke="white" strokeWidth="2" fill="none" strokeLinejoin="round"/>
          </svg>
          <span>MyFounders<span className="text-orange-500">.</span>Club</span>
        </Link>
      </motion.nav>

      {/* HERO */}
      <section className="pt-28 px-[5%] py-20 bg-black min-h-screen flex items-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-syne font-black text-[3.5rem] md:text-[4.5rem] leading-tight text-white mb-6">
              For <span className="text-orange-500">Gulf Founders</span>
            </h1>
            <p className="font-dm-sans text-xl text-gray-300 max-w-2xl">
              Navigate the entire Gulf ecosystem. Access capital. Build community. Scale globally.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              { title: 'Early Stage', desc: 'Find your co-founder & seed capital' },
              { title: 'Growth Stage', desc: 'Connect with series investors' },
              { title: 'Scale Stage', desc: 'Access growth capital & global networks' }
            ].map((item, i) => (
              <div key={i} className="border border-orange-500/30 bg-orange-500/5 p-8 rounded">
                <h3 className="font-syne font-bold text-xl text-white mb-2">{item.title}</h3>
                <p className="font-dm-sans text-gray-400">{item.desc}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
