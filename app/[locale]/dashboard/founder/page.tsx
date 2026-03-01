'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Logo } from '@/components/logo'
import { LogOut, Trash2, Home, TrendingUp, Users, Zap, FileText, Shield } from 'lucide-react'

export default function FounderDashboardPage() {
  const router = useRouter()
  const { user, logout, deleteAccount } = useAuth()
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }

    // Load founder profile
    try {
      const founderProfiles = JSON.parse(localStorage.getItem('founder_profiles') || '[]')
      const userProfile = founderProfiles.find((p: any) => p.user_id === user.id)
      setProfile(userProfile)
    } catch (err) {
      console.error('Error loading profile:', err)
    }
    setLoading(false)
  }, [user, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const stats = [
    { label: 'Profile Strength', value: profile ? '85%' : '0%', icon: TrendingUp, color: 'from-orange-500 to-orange-600' },
    { label: 'Investor Matches', value: '12', icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Applications Sent', value: '4', icon: FileText, color: 'from-green-500 to-green-600' },
    { label: 'KYC Status', value: profile?.kyc_verified ? 'Verified' : 'Pending', icon: Shield, color: 'from-purple-500 to-purple-600' },
  ]

  return (
    <div
      className="min-h-screen bg-black relative overflow-hidden"
      style={{
        backgroundImage: 'url(/MFC%20theme.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 pointer-events-none" />

      {/* navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b border-orange-500/20 bg-black/40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <motion.div className="flex items-center gap-2 sm:gap-3 cursor-pointer" whileHover={{ scale: 1.05 }} onClick={() => router.push('/')}>
            <Logo />
            <div className="hidden sm:block">
              <p className="text-orange-400 font-semibold text-sm">Founder Dashboard</p>
              <p className="text-white/60 text-xs">My Founders Club</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-2">
            <motion.button onClick={() => router.push('/')} className="p-2 hover:bg-white/10 rounded-lg text-white hidden sm:block" whileHover={{ scale: 1.1 }} title="Home">
              <Home size={18} />
            </motion.button>
            <motion.button
              onClick={() => {
                if (confirm('Delete your account? This action is permanent.')) {
                  deleteAccount?.()
                  router.push('/')
                }
              }}
              className="flex items-center gap-1 px-2 sm:px-3 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 text-red-400 rounded-lg text-xs sm:text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Trash2 size={14} />
              <span className="hidden sm:inline">Delete</span>
            </motion.button>
            <motion.button
              onClick={handleLogout}
              className="flex items-center gap-1 px-2 sm:px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold text-xs sm:text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Content */}
      <div className="relative z-10 pt-20 px-4 md:px-6 pb-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Welcome Section */}
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-2xl" style={{ textShadow: '0 4px 16px rgba(0, 0, 0, 0.9)' }}>
              Welcome, <span className="text-orange-400">{user.name}</span>
            </h1>
            <p className="text-gray-300 drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)' }}>
              {profile ? `Company: ${profile.company_name}` : 'Complete your profile to get started'}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={idx}
                  className="rounded-xl p-6 border border-white/10 backdrop-blur-sm"
                  style={{
                    background: 'linear-gradient(145deg, rgba(25, 25, 25, 1), rgba(12, 12, 12, 1))',
                    boxShadow: 'inset 0 1px 4px rgba(255, 255, 255, 0.15)',
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} w-fit mb-4`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Profile & Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Full Profile */}
            <motion.div
              className="md:col-span-2 rounded-xl p-6 md:p-8 border border-white/10 backdrop-blur-sm"
              style={{
                background: 'linear-gradient(145deg, rgba(25, 25, 25, 1), rgba(12, 12, 12, 1))',
                boxShadow: 'inset 0 1px 4px rgba(255, 255, 255, 0.15)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Company Profile</h2>
              {profile ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-400 text-sm">Company Name</p>
                    <p className="text-white font-semibold text-lg">{profile.company_name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Description</p>
                    <p className="text-gray-200">{profile.company_description || 'No description'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Funding Stage</p>
                      <p className="text-white font-semibold capitalize">{profile.funding_stage}</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Amount Raised</p>
                      <p className="text-white font-semibold">{profile.amount_raised || 'N/A'}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">No profile data yet. Complete your profile to get started.</p>
                  <motion.button
                    onClick={() => router.push('/setup-profile')}
                    className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold"
                    whileHover={{ scale: 1.05 }}
                  >
                    Complete Profile
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              className="rounded-xl p-6 md:p-8 border border-white/10 backdrop-blur-sm"
              style={{
                background: 'linear-gradient(145deg, rgba(25, 25, 25, 1), rgba(12, 12, 12, 1))',
                boxShadow: 'inset 0 1px 4px rgba(255, 255, 255, 0.15)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <motion.button
                  className="w-full px-4 py-3 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/50 text-orange-200 rounded-lg font-semibold transition"
                  whileHover={{ scale: 1.02 }}
                >
                  Browse Investors
                </motion.button>
                <motion.button
                  className="w-full px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-200 rounded-lg font-semibold transition"
                  whileHover={{ scale: 1.02 }}
                >
                  View Matches
                </motion.button>
                <motion.button
                  className="w-full px-4 py-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-200 rounded-lg font-semibold transition"
                  whileHover={{ scale: 1.02 }}
                >
                  Message Network
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
