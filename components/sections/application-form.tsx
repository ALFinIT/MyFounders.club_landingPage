'use client'

import { motion } from 'framer-motion'
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { scrollRevealConfig } from '@/lib/animation-variants'

export function ApplicationFormSection() {
  const router = useRouter()
  const { user } = useAuth()
  const [formData, setFormData] = useState({
    // SECTION 1: BASIC INFORMATION
    fullName: '',
    email: '',
    whatsappNumber: '',
    linkedinProfile: '',
    currentLocation: '',
    nationality: '',
    gender: '',
    
    // SECTION 2: YOUR ROLE
    primaryCategory: '',
    otherCategory: '',
    
    // SECTION 3A: FOR STARTUPS & SMEs
    companyName: '',
    companyWebsite: '',
    yearFounded: '',
    companyRegistrationCountry: '',
    gccEntity: false,
    gccCountries: [],
    primaryIndustry: '',
    otherIndustry: '',
    businessModel: [],
    currentStage: '',
    payingCustomers: '',
    teamSize: '',
    totalFunding: '',
    institutionalCapital: false,
    investorList: '',
    visionPrograms: [],
    otherVision: '',
    interestedMarkets: [],
    marketTimeline: '',
    
    // SECTION 3B: FOR INVESTORS
    investorType: '',
    otherInvestorType: '',
    fundName: '',
    fundWebsite: '',
    aum: '',
    preferredStages: [],
    typicalCheckSize: '',
    sectorFocus: [],
    geographicFocus: [],
    dealsPerYear: '',
    activelyDeploying: '',
    investorVisionPrograms: [],
    
    // SECTION 3C: FOR SERVICE PROVIDERS
    serviceFirmName: '',
    serviceFirmWebsite: '',
    yearsInBusiness: '',
    serviceCategories: [],
    otherService: '',
    gccPresence: [],
    startupExperience: false,
    clientsServed: '',
    newClientsPerQuarter: '',
    discountOffered: false,
    discountPercentage: '',
    equityServices: '',
    
    // SECTION 4: WHAT YOU NEED FROM MFC
    goals: [],
    urgentNeed: '',
    idealIntroduction: '',
    
    // SECTION 5: WHAT YOU BRING TO MFC
    businessDescription: '',
    communityContribution: [],
    uniqueResources: '',
    
    // SECTION 6: REFERRAL & DISCOVERY
    discoverySource: '',
    otherDiscovery: '',
    referralCode: '',
    
    // SECTION 7: COMMITMENT & PAYMENT
    agreeMembership: false,
    agreeContribution: false,
    agreeGuidelines: false,
    agreeReview: false,
    agreeCommitment: false,
    agreeTerms: false,
  })

  const [submitted, setSubmitted] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')
  const [statusType, setStatusType] = useState<'success' | 'error' | 'info'>('info')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // Check if user is authenticated
    if (!user) {
      setStatusMessage('Please log in to submit your application')
      setStatusType('error')
      // Redirect to auth page with return URL
      setTimeout(() => {
        router.push(`/auth?returnUrl=${encodeURIComponent(window.location.pathname + '#application')}`)
      }, 1000)
      return
    }

    if (!formData.agreeCommitment) {
      setStatusMessage('Please agree to the commitment fee terms')
      setStatusType('error')
      return
    }

    if (!formData.agreeTerms) {
      setStatusMessage('Please accept the Terms and Conditions')
      setStatusType('error')
      return
    }
    // Optimistic UI: show immediate feedback to reduce perceived latency
    setSubmitted(true)
    setIsLoading(true)
    setStatusMessage('Submitting...')
    setStatusType('info')

    // Use fetch with keepalive where possible to avoid blocking on navigation
    try {
      const res = await fetch('/api/applications/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        keepalive: true,
      })

      // Try to parse JSON only if response has content-type
      let data: any = {}
      try {
        data = await res.json()
      } catch (e) {
        // ignore parse errors
      }

      if (!res.ok) {
        // rollback optimistic state on error
        setSubmitted(false)
        if (res.status === 409) {
          setStatusMessage(data.error || 'Application already submitted with this email or phone')
          setStatusType('error')
        } else {
          setStatusMessage(data.error || 'Failed to submit application')
          setStatusType('error')
        }
        setIsLoading(false)
        return
      }

      // Success: keep submitted state and show success message
      setStatusMessage('Application submitted successfully')
      setStatusType('success')

      // Reset form fields (without removing submitted indicator immediately)
      setFormData({
        fullName: '',
        email: '',
        whatsappNumber: '',
        linkedinProfile: '',
        currentLocation: '',
        nationality: '',
        gender: '',
        primaryCategory: '',
        otherCategory: '',
        companyName: '',
        companyWebsite: '',
        yearFounded: '',
        companyRegistrationCountry: '',
        gccEntity: false,
        gccCountries: [],
        primaryIndustry: '',
        otherIndustry: '',
        businessModel: [],
        currentStage: '',
        payingCustomers: '',
        teamSize: '',
        totalFunding: '',
        institutionalCapital: false,
        investorList: '',
        visionPrograms: [],
        otherVision: '',
        interestedMarkets: [],
        marketTimeline: '',
        investorType: '',
        otherInvestorType: '',
        fundName: '',
        fundWebsite: '',
        aum: '',
        preferredStages: [],
        typicalCheckSize: '',
        sectorFocus: [],
        geographicFocus: [],
        dealsPerYear: '',
        activelyDeploying: '',
        investorVisionPrograms: [],
        serviceFirmName: '',
        serviceFirmWebsite: '',
        yearsInBusiness: '',
        serviceCategories: [],
        otherService: '',
        gccPresence: [],
        startupExperience: false,
        clientsServed: '',
        newClientsPerQuarter: '',
        discountOffered: false,
        discountPercentage: '',
        equityServices: '',
        goals: [],
        urgentNeed: '',
        idealIntroduction: '',
        businessDescription: '',
        communityContribution: [],
        uniqueResources: '',
        discoverySource: '',
        otherDiscovery: '',
        referralCode: '',
        agreeMembership: false,
        agreeContribution: false,
        agreeGuidelines: false,
        agreeReview: false,
        agreeCommitment: false,
        agreeTerms: false,
      })

      // Clear messages after a short moment but keep 'submitted' briefly to show confirmation
      setTimeout(() => {
        setSubmitted(false)
        setStatusMessage('')
      }, 2500)
    } catch (err) {
      console.error('Application submit error:', err)
      setSubmitted(false)
      setStatusMessage('Network error submitting application. Please try again.')
      setStatusType('error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section id="application-form" className="relative w-full py-16 sm:py-20 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          viewport={scrollRevealConfig}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.8)' }}>
            Apply for Gulf Access
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-light mb-2" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)' }}>
            Complete your application to get matched with the most relevant opportunities.
          </p>
          
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          className="p-6 sm:p-8 lg:p-12 rounded-2xl glass border border-orange-500/20 space-y-8"
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 28, scale: 0.96 }}
          viewport={scrollRevealConfig}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* SECTION 1: BASIC INFORMATION */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-orange-400 border-b border-orange-500/30 pb-2"> SECTION 1 : BASIC INFORMATION</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition"
                  placeholder="Your full name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">WhatsApp Number * (with country code)</label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  value={formData.whatsappNumber}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition"
                  placeholder="+971 XX XXX XXXX"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">LinkedIn Profile URL *</label>
                <input
                  type="url"
                  name="linkedinProfile"
                  value={formData.linkedinProfile}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Current Location/City *</label>
                <input
                  type="text"
                  name="currentLocation"
                  value={formData.currentLocation}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition"
                  placeholder="Dubai, UAE"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Nationality *</label>
                <select
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  required
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-orange-500 focus:outline-none transition"
                >
                  <option value="">Select nationality</option>
                  <option value="UAE">UAE</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Oman">Oman</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white/90 mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white focus:border-orange-500 focus:outline-none transition"
                >
                  <option value="">Select gender</option>
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: YOUR ROLE */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-orange-400 border-b border-orange-500/30 pb-2">SECTION 2 : YOUR ROLE</h3>
            
            <div>
              <label className="block text-sm font-medium text-white/90 mb-4">Primary Category: * (Only select ONE)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  'Startup Founder/Co-Founder',
                  'SME Owner/Executive',
                  'Investor (VC, Angel, Syndicate)',
                  'Family Office Principal/Representative',
                  'Service Provider (Legal, Accounting, Marketing, Tech, etc.)',
                  'Corporate Innovation/Business Development',
                  'Other'
                ].map((option) => (
                  <label key={option} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="primaryCategory"
                      value={option}
                      checked={formData.primaryCategory === option}
                      onChange={handleChange}
                      required
                      disabled={isLoading}
                      className="w-4 h-4 text-orange-500 bg-gray-800 border-gray-600 focus:ring-orange-500"
                    />
                    <span className="text-white/90">{option}</span>
                  </label>
                ))}
              </div>
              {formData.primaryCategory === 'Other' && (
                <input
                  type="text"
                  name="otherCategory"
                  value={formData.otherCategory}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-full mt-3 px-4 py-3 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:border-orange-500 focus:outline-none transition"
                  placeholder="Please specify"
                />
              )}
            </div>
          </div>

          {/* Terms & Conditions Checkbox */}
          <div className="pt-2 pb-1 space-y-4">
            <div>
              <label className={`flex items-start gap-3 cursor-pointer group ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-5 h-5 mt-0.5 flex-shrink-0 rounded text-orange-500 bg-gray-800 border-2 border-gray-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-0 checked:bg-orange-500 checked:border-orange-500 transition-colors cursor-pointer"
                />
                <span className="text-sm text-white/80 leading-relaxed group-hover:text-white/100 transition-colors">
                  I have read and accept the{' '}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-400 underline underline-offset-2 hover:text-orange-300 font-medium transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Terms &amp; Conditions
                  </a>
                  {' '}of My Founders Club membership. *
                </span>
              </label>
              {!formData.agreeTerms && submitted === false && statusType === 'error' && statusMessage.toLowerCase().includes('terms') && (
                <p className="mt-2 ml-8 text-xs text-red-400 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  You must accept the Terms &amp; Conditions to proceed.
                </p>
              )}
            </div>
            <div>
              <label className={`flex items-start gap-3 cursor-pointer group ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                <input
                  type="checkbox"
                  name="agreeCommitment"
                  checked={formData.agreeCommitment}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="w-5 h-5 mt-0.5 flex-shrink-0 rounded text-orange-500 bg-gray-800 border-2 border-gray-500 focus:ring-2 focus:ring-orange-500 focus:ring-offset-0 checked:bg-orange-500 checked:border-orange-500 transition-colors cursor-pointer"
                />
                <span className="text-sm text-white/80 leading-relaxed group-hover:text-white/100 transition-colors">
                  Please agree to the commitment fee terms. *
                </span>
              </label>
              {!formData.agreeCommitment && submitted === false && statusType === 'error' && statusMessage.toLowerCase().includes('commitment') && (
                <p className="mt-2 ml-8 text-xs text-red-400 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5 flex-shrink-0" />
                  You must agree to the commitment fee terms to proceed.
                </p>
              )}
            </div>
          </div>

          {/* Status message */}
          {statusMessage && (
            <motion.div
              className={`p-3 rounded-lg flex items-start gap-3 ${
                statusType === 'error'
                  ? 'bg-red-500/10 border border-red-500/30'
                  : statusType === 'success'
                    ? 'bg-orange-500/10 border border-orange-500/30'
                    : 'bg-orange-500/10 border border-orange-500/30'
              }`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {statusType === 'error' ? (
                <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              ) : statusType === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              )}
              <p
                className={`text-sm font-medium ${
                  statusType === 'error'
                    ? 'text-red-300'
                    : statusType === 'success'
                      ? 'text-orange-300'
                      : 'text-orange-300'
                }`}
              >
                {statusMessage}
              </p>
            </motion.div>
          )}

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isLoading || submitted}
            className="w-full py-4 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-lg hover:shadow-2xl hover:shadow-orange-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            whileHover={{ scale: 1.04, y: -2, transition: { duration: 0.3 } }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? (
              <>
                <motion.div
                  className="w-5 h-5 rounded-full border-2 border-white border-t-transparent"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
                Submitting...
              </>
            ) : submitted ? (
              'Application Submitted!'
            ) : (
              'Submit Application →'
            )}
          </motion.button>

          <p className="text-center text-sm text-white/70">
            Decision in 48 to 72 hours. No payment required until approved.
          </p>
        </motion.form>
      </div>
    </section>
  )
}
