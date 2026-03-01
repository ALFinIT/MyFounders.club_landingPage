'use client'

import React from "react"

import { motion } from 'framer-motion'
import { MessageCircle, Check } from 'lucide-react'
import { useState } from 'react'

const benefits = [
  'Weekly investor & funding updates',
  'Founder-only events and meetups',
  'Partnership and hiring opportunities',
  'Direct ecosystem announcements',
]

export function WhatsAppCTASection() {
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [phoneError, setPhoneError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setPhoneError('')

    const formData = new FormData(e.currentTarget)
    const payload = {
      firstName: formData.get('firstName'),
      phone: formData.get('phone'),
    }

    try {
      const res = await fetch('/api/whatsapp/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit')
      }

      setSubmitted(true)
      // Redirect to WhatsApp community after 1.5 seconds
      setTimeout(() => {
        window.open('https://chat.whatsapp.com/JV8WTSINaSs8HUUYMdEOEe?mode=gi_t', '_blank')
      }, 1500)
    } catch (err) {
      console.error('WhatsApp submit error:', err)
      setPhoneError('Error submitting form. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative w-full py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-500/5 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 14, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4">
        <motion.div
          className="glass glass-hover p-6 sm:p-10 lg:p-16"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.97 }}
          viewport={{ once: false, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Header */}
          <motion.div
            className="flex items-center justify-center w-16 h-16 mx-auto mb-8 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30"
            whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
          >
            <MessageCircle className="w-8 h-8 text-orange-400" />
          </motion.div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 text-white drop-shadow-lg" style={{ textShadow: '0 3px 10px rgba(0, 0, 0, 0.8)' }}>
            Join the Founders WhatsApp Circle
          </h2>

          <p className="text-center text-gray-300 mb-8 text-lg leading-relaxed" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
            Get real-time ecosystem updates, events, funding alerts, and curated opportunities directly in our private WhatsApp community.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex items-start gap-3 p-2 sm:p-3 rounded-lg bg-white/5 border border-white/10"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                viewport={{ once: false }}
                transition={{ delay: 0.1 + index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Check className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-300" style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.7)' }}>{benefit}</span>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500/50 focus:bg-white/10 transition-all"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.input
                  type="tel"
                  name="phone"
                  placeholder="+971 50 000 0000"
                  required
                  className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-muted-foreground focus:outline-none focus:bg-white/10 transition-all ${
                    phoneError ? 'border-red-500/50 focus:border-red-500/50' : 'border-white/10 focus:border-orange-500/50'
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  viewport={{ once: false }}
                  transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {phoneError && (
                <p className="text-sm text-red-400 text-center">{phoneError}</p>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-2xl hover:shadow-orange-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.03, y: -2, transition: { duration: 0.3 } }}
                whileTap={{ scale: 0.97 }}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      className="w-5 h-5 rounded-full border-2 border-white border-t-transparent"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Joining...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5" />
                    Join WhatsApp Community
                  </>
                )}
              </motion.button>
              <p className="text-center text-xs text-muted-foreground">
                No spam. High-value ecosystem updates only.
              </p>
            </form>
          ) : (
            <motion.div
              className="text-center py-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.div
                className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500/20 to-orange-600/10 border border-orange-500/30 flex items-center justify-center"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 0.5 }}
              >
                <Check className="w-8 h-8 text-orange-400" />
              </motion.div>
              <p className="text-lg font-semibold text-white mb-2">Welcome to the Circle!</p>
              <p className="text-muted-foreground mb-4">
                Redirecting to WhatsApp in a moment...
              </p>
              <p className="text-xs text-white/60">
                If not redirected, <a href="https://chat.whatsapp.com/JV8WTSINaSs8HUUYMdEOEe?mode=gi_t" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:text-orange-300 underline">click here</a>
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
