'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Loader2, AlertCircle, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import SocialHomeButtons from '@/components/social-home-buttons'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  tier: string
  billingCycle: 'monthly' | 'annual'
  amount: number
}

export function PaymentModal({
  isOpen,
  onClose,
  tier,
  billingCycle,
  amount,
}: PaymentModalProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    country: 'AE',
    city: '',
    address: '',
    businessName: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setError('')
  }

  // Validate email format
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()

    // Check if user is authenticated
    if (!user) {
      setError('Please log in to complete your payment')
      setTimeout(() => {
        const returnUrl = `/pricing?tier=${tier}&billing=${billingCycle}`
        router.push(`/auth?returnUrl=${encodeURIComponent(returnUrl)}`)
      }, 800)
      return
    }

    setLoading(true)
    setError('')

    try {
      // Validate required fields
      if (!formData.fullName.trim()) {
        setError('Full name is required')
        setLoading(false)
        return
      }
      if (!formData.email.trim()) {
        setError('Email address is required')
        setLoading(false)
        return
      }
      // Validate email format
      if (!validateEmail(formData.email)) {
        setError('Please enter a valid email address (format: user@example.com)')
        setLoading(false)
        return
      }
      if (!formData.phoneNumber.trim()) {
        setError('Phone number is required')
        setLoading(false)
        return
      }
      if (!formData.city.trim()) {
        setError('City is required')
        setLoading(false)
        return
      }
      if (!formData.address.trim()) {
        setError('Address is required')
        setLoading(false)
        return
      }

      // Validate phone format (basic validation)
      const phoneRegex = /^[\d+\-\s()]+$/
      if (!phoneRegex.test(formData.phoneNumber)) {
        setError('Please enter a valid phone number')
        setLoading(false)
        return
      }

      // Call Telr payment API - Telr handles all payment methods internally
      const response = await fetch('/api/payments/telr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tier,
          billingCycle,
          email: formData.email,
          fullName: formData.fullName,
          phoneNumber: formData.phoneNumber,
          country: formData.country,
          city: formData.city,
          address: formData.address,
          businessName: formData.businessName || 'N/A',
          userId: `user-${Date.now()}`,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Payment initialization failed')
      }

      const paymentData = await response.json()

      // Redirect to Telr hosted checkout page
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = 'https://telr.com/gateway/process.php'

      // Add payment data as form fields
      Object.entries(paymentData.paymentData).forEach(([key, value]) => {
        const input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = String(value)
        form.appendChild(input)
      })

      document.body.appendChild(form)
      form.submit()
      document.body.removeChild(form)
    } catch (err) {
      console.error('Payment error:', err)
      setError(err instanceof Error ? err.message : 'Failed to initialize payment')
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop with fixed positioning */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Social Widget */}
          <div className="fixed z-[1001] bottom-6 right-6 pointer-events-auto">
            <SocialHomeButtons />
          </div>

          {/* Modal Container - Fits entire viewport */}
          <div className="fixed inset-0 z-[1000] flex items-center justify-center pointer-events-none pt-20 md:pt-24 pb-4">
            <motion.div
              className="w-full max-w-2xl mx-2 md:mx-4 pointer-events-auto"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-xl border border-orange-500/30 bg-black shadow-2xl shadow-orange-500/20 p-4 md:p-5">
                {/* Header */}
                <div className="mb-3 flex items-center justify-between border-b border-orange-500/20 pb-2">
                  <div>
                    <h2 className="text-base md:text-lg font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                      Complete Subscription
                    </h2>
                    <p className="text-xs text-gray-400 mt-0.5">My Founders Club</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-2 hover:bg-white/10 transition-colors disabled:opacity-50 flex-shrink-0"
                    disabled={loading}
                  >
                    <X className="h-4 w-4 text-gray-400 hover:text-gray-200" />
                  </button>
                </div>

                {/* Main Content - Single Column */}
                <form onSubmit={handlePayment} className="space-y-2">
                  
                  {/* Error Message */}
                  {error && (
                    <motion.div
                      className="rounded-lg border border-orange-500/50 bg-orange-500/10 p-2 flex gap-2"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="h-3 w-3 flex-shrink-0 text-orange-400 mt-0.5" />
                      <p className="text-xs text-orange-300">{error}</p>
                    </motion.div>
                  )}

                  {/* Order Summary */}
                  <div className="rounded-lg border border-orange-500/20 bg-slate-900/50 p-2">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>
                        <p className="text-gray-400">Plan</p>
                        <p className="font-semibold capitalize text-orange-400">{tier.replace('-', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Billing</p>
                        <p className="font-semibold text-gray-200">{billingCycle === 'monthly' ? 'Monthly' : 'Annual'}</p>
                      </div>
                      <div className="col-span-2 border-t border-orange-500/20 pt-1 flex justify-between items-center mt-1">
                        <span className="font-medium text-gray-300">Total</span>
                        <span className="text-base font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                          AED {amount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info - Telr Handles All Methods */}
                  <div className="rounded-lg bg-slate-900/50 border border-orange-500/20 p-2">
                    <p className="text-xs text-gray-300 font-medium">Payment Processing</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Secured by Telr (PCI DSS Level 1). You will be able to choose your preferred payment method on the next page.
                    </p>
                  </div>

                  {/* Personal Information - Compact */}
                  <div>
                    <h3 className="text-xs font-semibold text-gray-300 mb-1.5 uppercase tracking-wide">Your Information</h3>
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        className="w-full rounded-md border border-orange-500/30 bg-slate-900/50 px-2.5 py-1.5 text-white placeholder-gray-600 transition-all focus:border-orange-500 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/30 disabled:opacity-50 text-xs"
                        disabled={loading}
                        required
                      />

                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email (user@example.com)"
                        className="w-full rounded-md border border-orange-500/30 bg-slate-900/50 px-2.5 py-1.5 text-white placeholder-gray-600 transition-all focus:border-orange-500 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/30 disabled:opacity-50 text-xs"
                        disabled={loading}
                        required
                      />

                      <div className="grid grid-cols-2 gap-1.5">
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="Phone"
                          className="w-full rounded-md border border-orange-500/30 bg-slate-900/50 px-2.5 py-1.5 text-white placeholder-gray-600 transition-all focus:border-orange-500 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/30 disabled:opacity-50 text-xs"
                          disabled={loading}
                          required
                        />

                        <select
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full rounded-md border border-orange-500/30 bg-slate-900/50 px-2.5 py-1.5 text-white transition-all focus:border-orange-500 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/30 disabled:opacity-50 text-xs"
                          disabled={loading}
                          required
                        >
                          <option value="AE" className="bg-slate-900">UAE</option>
                          <option value="SA" className="bg-slate-900">Saudi Arabia</option>
                          <option value="KW" className="bg-slate-900">Kuwait</option>
                          <option value="QA" className="bg-slate-900">Qatar</option>
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5">
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="City"
                          className="w-full rounded-md border border-orange-500/30 bg-slate-900/50 px-2.5 py-1.5 text-white placeholder-gray-600 transition-all focus:border-orange-500 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/30 disabled:opacity-50 text-xs"
                          disabled={loading}
                          required
                        />

                        <input
                          type="text"
                          name="businessName"
                          value={formData.businessName}
                          onChange={handleChange}
                          placeholder="Business (Optional)"
                          className="w-full rounded-md border border-orange-500/30 bg-slate-900/50 px-2.5 py-1.5 text-white placeholder-gray-600 transition-all focus:border-orange-500 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/30 disabled:opacity-50 text-xs"
                          disabled={loading}
                        />
                      </div>

                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Street Address"
                        className="w-full rounded-md border border-orange-500/30 bg-slate-900/50 px-2.5 py-1.5 text-white placeholder-gray-600 transition-all focus:border-orange-500 focus:bg-slate-800 focus:outline-none focus:ring-1 focus:ring-orange-500/30 disabled:opacity-50 text-xs"
                        disabled={loading}
                        required
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 font-semibold text-white transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/40 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Proceed to Payment</span>
                        <ArrowRight className="h-3 w-3" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
