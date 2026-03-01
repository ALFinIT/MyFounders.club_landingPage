"use client"

import { motion } from 'framer-motion'
import HighQualityImage from '@/components/HighQualityImage'
import { animationVariants, scrollRevealConfig } from '@/lib/animation-variants'
import { useState } from 'react'
import Link from 'next/link'

function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error' | 'duplicate'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setStatus('sending')
    setErrorMessage('')
    
    try {
      const res = await fetch('/api/beehiv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.status === 409) {
        // Email already exists
        setStatus('duplicate')
        setErrorMessage('This email is already subscribed')
        setTimeout(() => setStatus('idle'), 1000)
        return
      }

      if (!res.ok) {
        setStatus('error')
        setErrorMessage(data.error || 'Error subscribing. Please try again.')
        setTimeout(() => setStatus('idle'), 1000)
        return
      }

      // Success - show message for 1 second then reset
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 1000)
    } catch (err) {
      console.error('Newsletter error', err)
      setStatus('error')
      setErrorMessage('Error subscribing. Please try again.')
      setTimeout(() => setStatus('idle'), 1000)
    }
  }

  return (
  <div className="w-full">
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-3 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-3 sm:p-4 shadow-xl"
    >
      {compact && (
        <span className="text-xs font-semibold text-orange-400 tracking-wider uppercase">
          Newsletter
        </span>
      )}

      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your professional email"
        required
        disabled={status === 'sending'}
        className="flex-1 w-full px-4 py-3 rounded-xl bg-black/40 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 transition-all disabled:opacity-50"
      />

      <button
        type="submit"
        disabled={status === 'sending'}
        className="px-6 py-3 rounded-xl bg-orange-500 text-white font-semibold text-sm hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/40 transition-all duration-300 disabled:opacity-50 whitespace-nowrap"
      >
        {status === 'sending'
          ? 'Joining...'
          : status === 'success'
          ? 'Subscribed'
          : 'Join Now'}
      </button>
    </form>

    {/* Success */}
    {status === 'success' && (
      <motion.p
        className="text-sm mt-3 text-center font-semibold text-orange-400"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        ✓ You’re now part of the Gulf founders circle.
      </motion.p>
    )}

    {/* Error */}
    {status === 'error' && (
      <motion.p
        className="text-xs text-red-400 mt-2 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {errorMessage}
      </motion.p>
    )}

    {/* Duplicate */}
    {status === 'duplicate' && (
      <motion.p
        className="text-xs text-yellow-500 mt-2 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {errorMessage}
      </motion.p>
    )}
  </div>
)

}
const allLinks = [
  { label: 'About', href: '/about/about-us' },
  { label: 'Privacy Policy', href: '/privacy/privacy-policy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Contact', href: '/contact' },
]

// const allLinks = [
//   { label: 'Platform', links: [
//     { text: 'Explore Network', href: '/platform/explore-network' },
//     { text: 'Opportunities', href: '/platform/opportunities' },
//   ] },
//   { label: 'Privacy', links: [
//     { text: 'Privacy Policy', href: '/privacy/privacy-policy' },
//     { text: 'Data Usage', href: '/privacy/data-usage' },
//     { text: 'Terms and Conditions', href: '/terms' },
//   ] },
//   { label: 'About', links: [
//     { text: 'About Us', href: '/about/about-us' },
//   ] },
//   { label: 'Social', links: [
//     { text: 'LinkedIn', url: 'https://www.linkedin.com/company/myfoundersclub-global' },
//     { text: 'Instagram', url: 'https://www.instagram.com/myfoundersclub.global/' },
//     { text: 'YouTube', url: 'https://www.youtube.com/@myfoundersclub.global' }
//   ] },
// ]

const gulfVisions = [
  { code: 'sa', label: 'Vision 2030' },
  { code: 'ae', label: 'Centennial 2071' },
  { code: 'qa', label: 'QNV 2030' },
  { code: 'om', label: 'Vision 2040' },
  { code: 'kw', label: 'Vision 2035' },
  { code: 'bh', label: 'EV 2030' },
]


export function Footer() {
  return (
    <footer id="site-footer" className="w-full bg-black pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* PART 1: Logo + Branding */}
        <motion.div
          variants={animationVariants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealConfig}
          className="pb-6"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

  {/* Left: Logo + Branding */}
  <div className="flex items-start gap-4">
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="w-16 h-16 flex items-center justify-center flex-shrink-0">
        <div className="text-3xl font-bold text-orange-500">★</div>
      </div>
      <div>
        <p className="text-2xl md:text-3xl font-bold tracking-wide text-white">
          MY FOUNDER CLUBS
        </p>
        <p className="mt-1 text-sm md:text-base text-gray-300 font-light">
          Your Gateway to Gulf Opportunities
        </p>
      </div>
    </div>
  </div>

  {/* Right: Newsletter */}
  <div className="w-full lg:w-auto">
    <NewsletterForm compact />
  </div>

</div>

        </motion.div>

        {/* PART 2: Office Details (left) + Links (right columns) */}
        {/* <motion.div
          variants={animationVariants.fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={scrollRevealConfig}
          className="mb-12 pb-8 border-b border-white/10" 
        >*/}
          {/* Main grid with office details (left) + link columns (right) */}
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 md:gap-8"> */}
           { /* Left: office details */}
            {/* <div className="md:col-span-2 lg:col-span-2">
              <div className="text-xs sm:text-sm text-white/80 space-y-1" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)' }}>
                <div>Office 1003, Latifa Tower,</div>
                <div>Sheikh Zayed Road (north)</div>
                <div>Sector, Dubai, UAE</div>
               
                <div className="mt-3">
                  <a href="mailto:katerina@khgroup7.com" className="text-white/80 hover:text-white break-all">katerina@khgroup7.com</a>
                </div>
                <div>
                  <a href="https://khgroup7.com" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white">khgroup7.com</a>
                </div>
              </div>
            </div> */}

            {/* Right: Link columns */}
            {/* {allLinks.map((sec, i) => (
              <div key={i} className="sm:col-span-1 lg:col-span-1">
                <h3 className="text-xs uppercase tracking-widest text-white/80 font-semibold mb-3 drop-shadow-lg" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)' }}>{sec.label}</h3>
                <ul className="space-y-2">
                  {sec.links.map((l: any, idx: number) => (
                    <li key={idx}>
                      {l.url ? (
                        <a href={l.url} target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-white/70 hover:text-orange-400 transition-colors font-light" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)' }}>{l.text}</a>
                      ) : (
                        <Link href={l.href} onMouseEnter={() => typeof window !== 'undefined' && (window as any).__next_prefetch && (window as any).__next_prefetch(l.href)} className="text-xs sm:text-sm text-white/70 hover:text-orange-400 transition-colors font-light" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.6)' }}>{l.text}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div> */}

          
        {/* </motion.div> */}

        {/* PART 4: Footer bottom - 3 column layout */}
        <motion.div className="text-center">
          {/* <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">My Founders Club</h3>
            <p className="text-white/80 text-sm">Your Gateway to Gulf Opportunities</p>
          </div> */}

          {/* Flags */}

        <div className="mb-4 text-lg flex flex-wrap justify-center items-center gap-3">
  {gulfVisions.map((item, index) => (
    <div key={index} className="flex items-center gap-2">
      <span className={`fi fi-${item.code} w-6 h-4`} />
      <span>{item.label}</span>

      {index !== gulfVisions.length - 1 && (
        <span className="mx-2 text-white/40">|</span>
      )}
    </div>
  ))}
</div>




          <div className="flex justify-center gap-6 mb-4 text-sm">
  {allLinks.map((link, index) => (
    <Link
      key={index}
      href={link.href}
      className="text-white/70 hover:text-orange-400 transition-colors"
    >
      {link.label}
    </Link>
  ))}
</div>

          <p className="text-xs text-white/50">© 2025 My Founders Club. All Rights Reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
