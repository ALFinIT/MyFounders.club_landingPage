 'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { InvestorProfile, useProfile } from '@/context/profile-context'
import { Edit3, Save, X, Briefcase, Target, Globe, DollarSign } from 'lucide-react'

export default function InvestorDashboard({ userId }: { userId: string }) {
  const { getProfile, saveProfile } = useProfile()
  const [profile, setProfile] = useState<InvestorProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState<any>(null)

  useEffect(() => {
    const p = getProfile(userId) as InvestorProfile | null
    setProfile(p)
    setForm(p ? { ...p } : null)
  }, [userId])

  if (!profile) {
    return (
      <motion.div
        className="rounded-2xl overflow-hidden border border-orange-500/30 backdrop-blur-xl p-8 bg-gradient-to-br from-white/5 to-white/[0.02]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-white mb-2">Investor Profile</h2>
        <p className="text-muted-foreground">No profile found. Please complete onboarding.</p>
      </motion.div>
    )
  }

  const handleChange = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }))

  const handleSave = () => {
    if (!form.name || !form.email || !form.fundName) return
    saveProfile(form as InvestorProfile)
    setProfile(form)
    setIsEditing(false)
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Main Investor Card */}
      <div className="group relative rounded-3xl overflow-hidden border border-orange-500/30 backdrop-blur-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative p-8 md:p-10 bg-gradient-to-br from-white/5 to-white/[0.02]">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-start gap-4">
              <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/30 to-orange-600/20 border border-orange-500/50">
                <Briefcase size={28} className="text-orange-400" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white">Investor: {profile.name}</h2>
                <p className="text-orange-300/80 text-lg font-light mt-1">{profile.fundName} - {profile.investmentStage}</p>
              </div>
            </div>
            <motion.button
              onClick={() => setIsEditing(!isEditing)}
              className="p-3 rounded-lg bg-orange-500/20 border border-orange-500/50 text-orange-400 hover:bg-orange-500/30 transition-all"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              title={isEditing ? 'Cancel editing' : 'Edit profile'}
            >
              {isEditing ? <X size={20} /> : <Edit3 size={20} />}
            </motion.button>
          </div>

          {isEditing ? (
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Name & Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 text-sm font-medium block mb-2">Full Name</label>
                  <input
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none transition-all"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm font-medium block mb-2">Email</label>
                  <input
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none transition-all"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                  />
                </div>
              </div>

              {/* Fund Name */}
              <div>
                <label className="text-white/70 text-sm font-medium block mb-2">Fund Name</label>
                <input
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none transition-all"
                  placeholder="Your fund name"
                  value={form.fundName}
                  onChange={(e) => handleChange('fundName', e.target.value)}
                />
              </div>

              {/* Stage & Check Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 text-sm font-medium block mb-2">Investment Stage</label>
                  <input
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none transition-all"
                    placeholder="e.g., Series B"
                    value={form.investmentStage}
                    onChange={(e) => handleChange('investmentStage', e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm font-medium block mb-2">Check Size</label>
                  <input
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none transition-all"
                    placeholder="e.g., 100k"
                    value={form.checkSize}
                    onChange={(e) => handleChange('checkSize', e.target.value)}
                  />
                </div>
              </div>

              {/* Sector & Geography Focus */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 text-sm font-medium block mb-2">Sector Focus (comma separated)</label>
                  <input
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none transition-all"
                    placeholder="e.g., CleanTech, AI"
                    value={form.sectorFocus.join(', ')}
                    onChange={(e) => handleChange('sectorFocus', e.target.value.split(',').map(s => s.trim()))}
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm font-medium block mb-2">Geography Focus (comma separated)</label>
                  <input
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-orange-500 focus:outline-none transition-all"
                    placeholder="e.g., Global, EMEA"
                    value={form.geographyFocus.join(', ')}
                    onChange={(e) => handleChange('geographyFocus', e.target.value.split(',').map(s => s.trim()))}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <motion.button
                  onClick={handleSave}
                  className="flex items-center gap-2 flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Save size={18} />
                  Save Changes
                </motion.button>
                <motion.button
                  onClick={() => {
                    setIsEditing(false)
                    setForm(profile)
                  }}
                  className="flex-1 px-6 py-3 bg-white/10 border border-white/20 text-white rounded-lg font-semibold hover:bg-white/20 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {/* Fund Card */}
              <motion.div
                className="group/card p-6 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Briefcase size={20} className="text-orange-400" />
                  <p className="text-white/60 text-sm font-medium">Fund</p>
                </div>
                <p className="text-2xl font-bold text-white">{profile.fundName}</p>
              </motion.div>

              {/* Stage Card */}
              <motion.div
                className="group/card p-6 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Target size={20} className="text-green-400" />
                  <p className="text-white/60 text-sm font-medium">Investment Stage</p>
                </div>
                <p className="text-2xl font-bold text-white">{profile.investmentStage}</p>
              </motion.div>

              {/* Check Size Card */}
              <motion.div
                className="group/card p-6 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign size={20} className="text-blue-400" />
                  <p className="text-white/60 text-sm font-medium">Check Size</p>
                </div>
                <p className="text-2xl font-bold text-white">{profile.checkSize}</p>
              </motion.div>

              {/* Sectors Card */}
              <motion.div
                className="group/card p-6 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Globe size={20} className="text-purple-400" />
                  <p className="text-white/60 text-sm font-medium">Sector Focus</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.sectorFocus.map((sector, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/50 text-orange-300 text-sm">
                      {sector}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Geography Card */}
              <motion.div
                className="group/card p-6 rounded-xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all md:col-span-2"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <Globe size={20} className="text-cyan-400" />
                  <p className="text-white/60 text-sm font-medium">Geography Focus</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.geographyFocus.map((geo, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-500/50 text-blue-300 text-sm">
                      {geo}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
