'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { createClient as createSupabaseClient } from '@/utils/supabase/client'

export function FounderProfileForm({ user, onComplete }: { user: any; onComplete: () => void }) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [completed, setCompleted] = useState(false)

  const [form, setForm] = useState({
    // Step 1: Company & Traction
    companyName: '',
    companyDescription: '',
    fundingStage: 'seed',
    selectedIndustries: [] as string[],
    otherIndustry: '',
    companyWebsite: '',
    productDemoLink: '',
    pitchDeckFile: null as File | null,
    financialModelFile: null as File | null,
    capTableFile: null as File | null,
    
    // Step 2: Funding & Needs
    amountRaised: '',
    currentlyRaising: false,
    targetRaiseAmount: '',
    fundingUseCase: '',
    
    // Step 3: Growth & Contact
    monthlyGrowthRate: '',
    targetMarkets: '',
    linkedinProfile: '',
    
    // Step 4: KYC
    fullName: '',
    kycVerified: false,
  })

  const industries = ['Tech', 'FinTech', 'E-commerce', 'HealthTech', 'EdTech', 'PropTech', 'Climate', 'Other']
  const fundingStages = ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+']

  const next = () => {
    setError('')
    if (step === 1 && !form.companyName.trim()) {
      return setError('Company name is required')
    }
    if (step === 2 && form.currentlyRaising && !form.targetRaiseAmount.trim()) {
      return setError('Target raise amount is required')
    }
    setStep((s) => Math.min(4, s + 1))
  }

  const prev = () => setStep((s) => Math.max(1, s - 1))

  const handleChange = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }))

  const toggleIndustry = (industry: string) => {
    setForm((p) => ({
      ...p,
      selectedIndustries: p.selectedIndustries.includes(industry)
        ? p.selectedIndustries.filter((i) => i !== industry)
        : [...p.selectedIndustries, industry],
    }))
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (!form.companyName.trim()) throw new Error('Company name is required')

      const payload = {
        user_id: user?.id || `anon-${Date.now()}`,
        role: 'founder',
        company_name: form.companyName,
        company_description: form.companyDescription,
        funding_stage: form.fundingStage,
        industries: form.selectedIndustries,
        amount_raised: form.amountRaised || null,
        currently_raising: form.currentlyRaising,
        target_raise_amount: form.targetRaiseAmount || null,
        funding_use_case: form.fundingUseCase || null,
        monthly_growth_rate: form.monthlyGrowthRate || null,
        target_markets: form.targetMarkets || null,
        linkedin_profile: form.linkedinProfile || null,
        full_name: form.fullName || null,
        kyc_verified: form.kycVerified,
        created_at: new Date().toISOString(),
      }

      // Try saving to Supabase first
      try {
        const supabase = createSupabaseClient()
        const { error: sbError } = await supabase.from('founder_profiles').upsert(payload, { onConflict: 'user_id' })
        if (sbError) throw sbError
        setCompleted(true)
        onComplete()
        return
      } catch (sbErr) {
        console.warn('Supabase save failed, falling back to localStorage', sbErr)
      }

      // Fallback to localStorage
      const founderProfiles = JSON.parse(localStorage.getItem('founder_profiles') || '[]')
      founderProfiles.push({ ...payload, savedAt: Date.now() })
      localStorage.setItem('founder_profiles', JSON.stringify(founderProfiles))

      setCompleted(true)
      onComplete()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save profile')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (completed) {
    return (
      <div className="text-center py-8">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-4">
          <div className="w-12 h-12 rounded-full bg-green-500/20 border border-green-500 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-green-400">✓</span>
          </div>
        </motion.div>
        <h3 className="text-2xl font-bold text-white mb-2">Profile Completed!</h3>
        <p className="text-gray-300 mb-6">Your founder profile has been saved. Redirecting to dashboard...</p>
      </div>
    )
  }

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-8 flex gap-2">
        {[1, 2, 3, 4].map((s) => (
          <div
            key={s}
            className={`flex-1 h-1 rounded-full transition-all ${
              s <= step ? 'bg-gradient-to-r from-orange-500 to-orange-400' : 'bg-white/10'
            }`}
          />
        ))}
      </div>

      {error && (
        <motion.div
          className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}

      {/* Step 1: Company & Traction */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">Company & Traction</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Company Name</label>
            <input
              type="text"
              value={form.companyName}
              onChange={(e) => handleChange('companyName', e.target.value)}
              placeholder="Your awesome startup"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Company Description</label>
            <textarea
              value={form.companyDescription}
              onChange={(e) => handleChange('companyDescription', e.target.value)}
              placeholder="What does your company do?"
              rows={3}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Funding Stage</label>
            <div className="grid grid-cols-5 gap-2">
              {fundingStages.map((stage) => (
                <button
                  key={stage}
                  onClick={() => handleChange('fundingStage', stage.toLowerCase())}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    form.fundingStage === stage.toLowerCase()
                      ? 'bg-orange-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Industries</label>
            <div className="grid grid-cols-2 gap-2">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => toggleIndustry(ind)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    form.selectedIndustries.includes(ind)
                      ? 'bg-orange-500/30 border border-orange-500 text-orange-100'
                      : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
            {form.selectedIndustries.includes('Other') && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3"
              >
                <input
                  type="text"
                  value={form.otherIndustry}
                  onChange={(e) => handleChange('otherIndustry', e.target.value)}
                  placeholder="Please specify your industry"
                  className="w-full px-3 py-2 bg-white/5 border border-orange-500/40 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
                />
              </motion.div>
            )}
          </div>

          {/* Company Website URL - Required */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Company Website URL <span className="text-orange-400">*</span>
            </label>
            <input
              type="url"
              value={form.companyWebsite}
              onChange={(e) => handleChange('companyWebsite', e.target.value)}
              placeholder="https://yourcompany.com"
              required
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Product Demo Link - Optional */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Product Demo Link <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <input
              type="url"
              value={form.productDemoLink}
              onChange={(e) => handleChange('productDemoLink', e.target.value)}
              placeholder="Demo link (Loom, YouTube, product walkthrough, etc.)"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Pitch Deck Upload - Required */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Pitch Deck <span className="text-orange-400">*</span>
              <span className="text-gray-500 text-xs ml-1">(PDF only)</span>
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => handleChange('pitchDeckFile', e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className={`w-full px-3 py-3 bg-white/5 border rounded-lg flex items-center gap-3 transition ${form.pitchDeckFile ? 'border-orange-500/60 bg-orange-500/5' : 'border-white/10 border-dashed'}`}>
                <svg className="w-5 h-5 text-orange-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className={`text-sm ${form.pitchDeckFile ? 'text-orange-300' : 'text-gray-500'}`}>
                  {form.pitchDeckFile ? form.pitchDeckFile.name : 'Upload your latest pitch deck (PDF format)'}
                </span>
              </div>
            </div>
          </div>

          {/* Financial Model Upload - Optional */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Financial Model <span className="text-gray-500 text-xs">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.xlsx,.xls,.csv"
                onChange={(e) => handleChange('financialModelFile', e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className={`w-full px-3 py-3 bg-white/5 border rounded-lg flex items-center gap-3 transition ${form.financialModelFile ? 'border-orange-500/60 bg-orange-500/5' : 'border-white/10 border-dashed'}`}>
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <span className={`text-sm ${form.financialModelFile ? 'text-orange-300' : 'text-gray-500'}`}>
                  {form.financialModelFile ? form.financialModelFile.name : 'Optional: Upload financial projections/model'}
                </span>
              </div>
            </div>
          </div>

          {/* Cap Table Upload - Optional Private */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Cap Table <span className="text-gray-500 text-xs">(Optional — Private)</span>
            </label>
            <div className="relative">
              <input
                type="file"
                accept=".pdf,.xlsx,.xls,.csv"
                onChange={(e) => handleChange('capTableFile', e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className={`w-full px-3 py-3 bg-white/5 border rounded-lg flex items-center gap-3 transition ${form.capTableFile ? 'border-orange-500/60 bg-orange-500/5' : 'border-white/10 border-dashed'}`}>
                <svg className="w-5 h-5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className={`text-sm ${form.capTableFile ? 'text-orange-300' : 'text-gray-500'}`}>
                  {form.capTableFile ? form.capTableFile.name : 'Optional: Cap table (visible to approved institutions only)'}
                </span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">This file is private and only shared with approved institutional investors.</p>
          </div>

        </motion.div>
      )}

      {/* Step 2: Funding & Needs */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">Funding & Needs</h3>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Amount Raised to Date (USD)</label>
            <input
              type="text"
              value={form.amountRaised}
              onChange={(e) => handleChange('amountRaised', e.target.value)}
              placeholder="e.g., $500K"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.currentlyRaising}
              onChange={(e) => handleChange('currentlyRaising', e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-300">Currently raising funds</label>
          </div>

          {form.currentlyRaising && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Target Raise Amount (USD)</label>
              <input
                type="text"
                value={form.targetRaiseAmount}
                onChange={(e) => handleChange('targetRaiseAmount', e.target.value)}
                placeholder="e.g., $2M"
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">How will you use the funds?</label>
            <textarea
              value={form.fundingUseCase}
              onChange={(e) => handleChange('fundingUseCase', e.target.value)}
              placeholder="Product development, marketing, team expansion..."
              rows={3}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>
        </motion.div>
      )}

      {/* Step 3: Growth & Contact */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">Growth & Contact</h3>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Monthly Growth Rate (%)</label>
            <input
              type="text"
              value={form.monthlyGrowthRate}
              onChange={(e) => handleChange('monthlyGrowthRate', e.target.value)}
              placeholder="e.g., 15"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Target Markets</label>
            <input
              type="text"
              value={form.targetMarkets}
              onChange={(e) => handleChange('targetMarkets', e.target.value)}
              placeholder="e.g., GCC region, SE Asia, Global"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">LinkedIn Profile URL</label>
            <input
              type="url"
              value={form.linkedinProfile}
              onChange={(e) => handleChange('linkedinProfile', e.target.value)}
              placeholder="https://linkedin.com/in/yourprofile"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>
        </motion.div>
      )}

      {/* Step 4: KYC */}
      {step === 4 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">KYC & Verification</h3>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="Your full name"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500"
            />
          </div>

          <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/30">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" checked={form.kycVerified} onChange={(e) => handleChange('kycVerified', e.target.checked)} className="mt-1" />
              <div>
                <p className="text-sm font-medium text-orange-200">Complete KYC Verification</p>
                <p className="text-xs text-orange-100/70 mt-1">By checking this, you agree to complete KYC verification to unlock investor connections.</p>
              </div>
            </label>
          </div>
        </motion.div>
      )}

      {/* Navigation */}
      <div className="flex gap-4 mt-6 pt-6 border-t border-white/10">
        <button
          onClick={prev}
          disabled={step === 1 || isSubmitting}
          className="px-4 py-2 flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white rounded-lg transition disabled:opacity-50"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        {step < 4 ? (
          <button
            onClick={next}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition disabled:opacity-50"
          >
            Next
            <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-lg transition font-semibold disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Complete Profile'}
          </button>
        )}
      </div>
    </div>
  )
}
