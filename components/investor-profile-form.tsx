'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { createClient as createSupabaseClient } from '@/utils/supabase/client'

export function InvestorProfileForm({ user, onComplete }: { user: any; onComplete: () => void }) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [completed, setCompleted] = useState(false)

  const [form, setForm] = useState({
    // Step 1: Investment Profile
    investmentFocus: 'angel',
    ticketSize: '',
    preferredIndustries: [] as string[],
    preferredStages: [] as string[],
    
    // Step 2: Investment Criteria
    geographicPreference: 'gulf',
    yearsOfExperience: '',
    previousInvestments: '',
    
    // Step 3: Value Add & Expertise
    expertiseAreas: '' as string,
    valueProposition: '',
    mentorshipInterest: false,
    
    // Step 4: KYC
    fullName: '',
    verificationStatus: 'pending',
  })

  const investmentFocuses = ['Angel', 'Seed', 'Growth', 'Corporate VC', 'Fund Manager']
  const industries = ['Tech', 'FinTech', 'E-commerce', 'HealthTech', 'EdTech', 'PropTech', 'Climate', 'Other']
  const stages = ['Pre-Seed', 'Seed', 'Series A', 'Series B', 'Series C+', 'Late Stage']
  const geographies = ['Gulf Region', 'Southeast Asia', 'North Africa', 'Global']

  const next = () => {
    setError('')
    if (step === 1 && !form.ticketSize.trim()) {
      return setError('Ticket size is required')
    }
    setStep((s) => Math.min(4, s + 1))
  }

  const prev = () => setStep((s) => Math.max(1, s - 1))

  const handleChange = (k: string, v: any) => setForm((p) => ({ ...p, [k]: v }))

  const toggleIndustry = (industry: string) => {
    setForm((p) => ({
      ...p,
      preferredIndustries: p.preferredIndustries.includes(industry)
        ? p.preferredIndustries.filter((i) => i !== industry)
        : [...p.preferredIndustries, industry],
    }))
  }

  const toggleStage = (stage: string) => {
    setForm((p) => ({
      ...p,
      preferredStages: p.preferredStages.includes(stage)
        ? p.preferredStages.filter((s) => s !== stage)
        : [...p.preferredStages, stage],
    }))
  }

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      if (!form.ticketSize.trim()) throw new Error('Ticket size is required')

      const payload = {
        user_id: user?.id || `anon-${Date.now()}`,
        role: 'investor',
        investment_focus: form.investmentFocus.toLowerCase(),
        ticket_size: form.ticketSize,
        preferred_industries: form.preferredIndustries,
        preferred_stages: form.preferredStages,
        geographic_preference: form.geographicPreference.toLowerCase(),
        years_of_experience: form.yearsOfExperience || null,
        previous_investments: form.previousInvestments || null,
        expertise_areas: form.expertiseAreas || null,
        value_proposition: form.valueProposition || null,
        mentorship_interest: form.mentorshipInterest,
        full_name: form.fullName || null,
        verification_status: form.verificationStatus,
        created_at: new Date().toISOString(),
      }

      // Try saving to Supabase first
      try {
        const supabase = createSupabaseClient()
        const { error: sbError } = await supabase.from('investor_profiles').upsert(payload, { onConflict: 'user_id' })
        if (sbError) throw sbError
        setCompleted(true)
        onComplete()
        return
      } catch (sbErr) {
        console.warn('Supabase save failed, falling back to localStorage', sbErr)
      }

      // Fallback to localStorage
      const investorProfiles = JSON.parse(localStorage.getItem('investor_profiles') || '[]')
      investorProfiles.push({ ...payload, savedAt: Date.now() })
      localStorage.setItem('investor_profiles', JSON.stringify(investorProfiles))

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
        <p className="text-gray-300 mb-6">Your investor profile has been saved. Redirecting to dashboard...</p>
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
              s <= step ? 'bg-gradient-to-r from-blue-500 to-blue-400' : 'bg-white/10'
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

      {/* Step 1: Investment Profile */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">Investment Profile</h3>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Investment Focus</label>
            <div className="grid grid-cols-2 gap-2">
              {investmentFocuses.map((focus) => (
                <button
                  key={focus}
                  onClick={() => handleChange('investmentFocus', focus.toLowerCase())}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    form.investmentFocus === focus.toLowerCase()
                      ? 'bg-blue-500 text-white'
                      : 'bg-white/5 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {focus}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Typical Ticket Size (USD)</label>
            <input
              type="text"
              value={form.ticketSize}
              onChange={(e) => handleChange('ticketSize', e.target.value)}
              placeholder="e.g., $50K - $500K"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Preferred Industries</label>
            <div className="grid grid-cols-2 gap-2">
              {industries.map((ind) => (
                <button
                  key={ind}
                  onClick={() => toggleIndustry(ind)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    form.preferredIndustries.includes(ind)
                      ? 'bg-blue-500/30 border border-blue-500 text-blue-100'
                      : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {ind}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Preferred Stages</label>
            <div className="grid grid-cols-2 gap-2">
              {stages.map((stage) => (
                <button
                  key={stage}
                  onClick={() => toggleStage(stage)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                    form.preferredStages.includes(stage)
                      ? 'bg-blue-500/30 border border-blue-500 text-blue-100'
                      : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {stage}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Step 2: Investment Criteria */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">Investment Criteria</h3>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Geographic Preference</label>
            <div className="space-y-2">
              {geographies.map((geo) => (
                <label key={geo} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="geography"
                    value={geo}
                    checked={form.geographicPreference === geo}
                    onChange={(e) => handleChange('geographicPreference', e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="text-gray-300">{geo}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Years of Investment Experience</label>
            <input
              type="text"
              value={form.yearsOfExperience}
              onChange={(e) => handleChange('yearsOfExperience', e.target.value)}
              placeholder="e.g., 5+"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Previous Investments Exits</label>
            <input
              type="text"
              value={form.previousInvestments}
              onChange={(e) => handleChange('previousInvestments', e.target.value)}
              placeholder="e.g., 3 successful exits, 1 IPO"
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </motion.div>
      )}

      {/* Step 3: Value Add & Expertise */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">Value Add & Expertise</h3>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Areas of Expertise</label>
            <textarea
              value={form.expertiseAreas}
              onChange={(e) => handleChange('expertiseAreas', e.target.value)}
              placeholder="e.g., SaaS, B2B, product strategy, market expansion"
              rows={3}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Your Value Proposition for Founders</label>
            <textarea
              value={form.valueProposition}
              onChange={(e) => handleChange('valueProposition', e.target.value)}
              placeholder="What can you offer founders beyond capital?"
              rows={3}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={form.mentorshipInterest}
              onChange={(e) => handleChange('mentorshipInterest', e.target.checked)}
              className="w-4 h-4"
            />
            <label className="text-sm text-gray-300">Interested in mentoring founders</label>
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
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
            <p className="text-sm font-medium text-blue-200 mb-2">Verification Status</p>
            <p className="text-xs text-blue-100/70">Your profile will be verified to ensure authenticity. This helps protect the platform and build trust with founders.</p>
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
            className="flex-1 px-4 py-2 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition disabled:opacity-50"
          >
            Next
            <ChevronRight size={18} />
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition font-semibold disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Complete Profile'}
          </button>
        )}
      </div>
    </div>
  )
}
