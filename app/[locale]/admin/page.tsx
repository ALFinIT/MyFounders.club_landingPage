'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'
import { Logo } from '@/components/logo'
import { Download, Home, LogOut, Users, Mail, Phone, TrendingUp, Eye, EyeOff, CreditCard } from 'lucide-react'

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const ADMIN_USERNAME = 'admin'
  const ADMIN_PASSWORD = 'adminmfc26'

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Validate credentials
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setUsername('')
      setPassword('')
    } else {
      setError('Invalid username or password')
    }

    setIsLoading(false)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUsername('')
    setPassword('')
    setError('')
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-3 sm:p-4 relative overflow-hidden">
        {/* Animated background blobs - responsive */}
        <motion.div
          className="absolute top-10 sm:top-20 left-10 sm:left-20 w-48 sm:w-72 h-48 sm:h-72 bg-orange-500/20 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-48 sm:w-72 h-48 sm:h-72 bg-orange-600/10 rounded-full blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* Home Button - Bottom Right */}
        <motion.button
          onClick={() => router.push('/')}
          className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 p-2 sm:p-3 bg-gradient-to-br from-orange-500/20 to-orange-600/20 border border-orange-500/50 rounded-full text-orange-400 hover:bg-orange-500/30 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Go to home"
        >
          <Home size={20} className="sm:size-6" />
        </motion.button>

        <motion.div className="mb-6 sm:mb-8 relative z-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <Logo />
        </motion.div>

        <motion.div
          className="w-full max-w-md rounded-2xl p-6 sm:p-8 border border-orange-500/30 backdrop-blur-xl relative z-10"
          style={{
            background: 'linear-gradient(145deg, rgba(25, 25, 25, 0.9), rgba(12, 12, 12, 0.9))',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          />
          
          <div className="relative z-10">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-orange-300 bg-clip-text text-transparent mb-2">Admin Login</h1>
            <p className="text-white/60 mb-6 sm:mb-8 text-sm sm:text-base">Enter your credentials to access the dashboard</p>

            {error && (
              <motion.div
                className="bg-orange-500/10 border border-orange-500 text-orange-400 px-3 sm:px-4 py-2 sm:py-3 rounded-lg mb-6 text-xs sm:text-sm"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                ⚠️ {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <label className="block text-sm font-medium text-white mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all"
                />
              </motion.div>

              <motion.div className="relative" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <label className="block text-sm font-medium text-white mb-2">Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-orange-500 focus:bg-white/10 transition-all"
              />
              <motion.button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white/60 hover:text-orange-400 transition-colors p-2 cursor-pointer z-10"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-8 1.02-2.6 2.71-4.73 4.76-6.01" />
                    <path d="M1 1l22 22" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </motion.button>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {isLoading ? (
                <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>
                  Signing in...
                </motion.span>
              ) : (
                'Sign In'
              )}
            </motion.button>
          </form>
          </div>
        </motion.div>
      </div>
    )
  }

  // Admin Dashboard - After Authentication
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated background elements */}
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl -z-10"
        animate={{ y: [0, 40, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="fixed bottom-0 right-0 w-96 h-96 bg-orange-600/5 rounded-full blur-3xl -z-10"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 7, repeat: Infinity }}
      />

      {/* Navigation */}
      <motion.div
        className="sticky top-0 z-50 backdrop-blur-xl border-b border-orange-500/20 bg-black/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <motion.div
            className="flex items-center gap-2 sm:gap-3 min-w-0"
            whileHover={{ x: 5 }}
          >
            <Logo />
            <div className="h-6 sm:h-8 w-px bg-orange-500/30 hidden sm:block" />
            <div className="text-xs sm:text-sm hidden sm:block">
              <p className="text-orange-400/60 text-xs">Welcome,</p>
              <p className="text-white font-bold">Admin Panel</p>
            </div>
          </motion.div>
          <motion.button
            onClick={handleLogout}
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 hover:from-orange-500/30 hover:to-orange-600/30 border border-orange-500/50 text-orange-400 rounded-lg transition-all text-xs sm:text-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LogOut size={16} />
            <span className="hidden sm:inline">Logout</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-8 sm:py-12 space-y-6 sm:space-y-8">
        {/* Stats overview */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatCard title="Applications" icon={<Users size={20} />} color="orange" />
          <StatCard title="WhatsApp" icon={<Phone size={20} />} color="orange" />
          <StatCard title="Emails" icon={<Mail size={20} />} color="orange" />
          <StatCard title="Rate" icon={<TrendingUp size={20} />} color="orange" />
        </motion.div>

        {/* Applications Section */}
        <motion.div
          className="rounded-2xl p-4 sm:p-8 backdrop-blur-sm border border-orange-500/30"
          style={{
            background: 'linear-gradient(145deg, rgba(30, 25, 20, 0.8), rgba(15, 12, 10, 0.8))',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <motion.div className="flex justify-between items-start sm:items-center mb-4 sm:mb-6 flex-col sm:flex-row gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-white">Applications</h2>
              <p className="text-orange-400/60 text-xs sm:text-sm mt-1">Form submissions</p>
            </div>
          </motion.div>
          <ApplicationsList />
        </motion.div>

        {/* WhatsApp Section */}
        <motion.div
          className="rounded-2xl p-4 sm:p-8 backdrop-blur-sm border border-orange-500/30"
          style={{
            background: 'linear-gradient(145deg, rgba(30, 25, 20, 0.8), rgba(15, 12, 10, 0.8))',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div className="flex justify-between items-start sm:items-center mb-4 sm:mb-6 flex-col sm:flex-row gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-white">WhatsApp Signups</h2>
              <p className="text-orange-400/60 text-xs sm:text-sm mt-1">Private WhatsApp community members</p>
            </div>
          </motion.div>
          <WhatsAppSignupsList />
        </motion.div>

        {/* Payments Section */}
        <motion.div
          className="rounded-2xl p-4 sm:p-8 backdrop-blur-sm border border-orange-500/30"
          style={{
            background: 'linear-gradient(145deg, rgba(30, 25, 20, 0.8), rgba(15, 12, 10, 0.8))',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <motion.div className="flex justify-between items-start sm:items-center mb-4 sm:mb-6 flex-col sm:flex-row gap-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <div>
              <h2 className="text-xl sm:text-3xl font-bold text-white">Payment Transactions</h2>
              <p className="text-orange-400/60 text-xs sm:text-sm mt-1">All payment and subscription details</p>
            </div>
          </motion.div>
          <PaymentsList />
        </motion.div>
      </div>
    </div>
  )
}

// StatCard Component
function StatCard({ title, icon, color }: { title: string; icon: React.ReactNode; color: string }) {
  const colorClasses = {
    blue: 'from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400',
    green: 'from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400',
    orange: 'from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400',
    purple: 'from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400',
  }

  return (
    <motion.div
      className={`p-3 sm:p-6 rounded-xl bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} border backdrop-blur-sm`}
      whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(249, 115, 22, 0.2)' }}
      transition={{ duration: 0.2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-start">
        <div className="min-w-0">
          <p className="text-orange-400/60 text-xs font-medium">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-white mt-2">-</p>
        </div>
        <motion.div
          className="opacity-60 text-orange-400 flex-shrink-0"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          {icon}
        </motion.div>
      </div>
    </motion.div>
  )
}

// Applications List Component
function ApplicationsList() {
  const [applications, setApplications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      // Try API first, then fallback to local storage
      try {
        const res = await fetch('/api/admin/applications')
        if (res.ok) {
          const data = await res.json()
          setApplications(Array.isArray(data) ? data : data.data || [])
          setLoading(false)
          return
        }
      } catch (e) {
        console.error('API error:', e)
      }

      // Fallback to local storage
      const localData = localStorage.getItem('applications')
      if (localData) {
        const parsed = JSON.parse(localData)
        const apps = Array.isArray(parsed) ? parsed : parsed.value || []
        setApplications(apps)
      }
    } catch (err) {
      console.error('Error loading applications:', err)
    } finally {
      setLoading(false)
    }
  }

  const downloadCSV = () => {
    const headers = ['Full Name', 'Company', 'Email', 'Phone', 'Pitch', 'Proof of Work', 'Commitment Fee', 'IP Address', 'Submitted At']
    const rows = applications.map(app => [
      app.fullName || '-',
      app.companyName || '-',
      app.email || '-',
      app.phone || '-',
      app.onePitchSentence || '-',
      app.proofOfWork || '-',
      app.commitmentAmount || 'AED 500',
      app._ip || '-',
      app._savedAt ? new Date(app._savedAt).toLocaleString() : '-',
    ])

    const csvContent = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `applications_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <motion.div
          className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex justify-between items-start sm:items-center mb-4 sm:mb-6 flex-col sm:flex-row gap-2 sm:gap-0">
        <p className="text-orange-400/60 text-xs sm:text-base">
          Total: <span className="text-white font-bold text-sm sm:text-lg">{applications.length}</span>
        </p>
        <motion.button
          onClick={downloadCSV}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 hover:from-orange-500/30 hover:to-orange-600/30 border border-orange-500/50 text-orange-400 rounded-lg transition-all text-xs sm:text-sm w-full sm:w-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download size={16} />
          Export CSV
        </motion.button>
      </div>

      {applications.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <Users size={40} className="sm:size-48 mx-auto text-orange-400/20 mb-4" />
          <p className="text-orange-400/60 text-sm sm:text-base">No applications yet</p>
        </div>
      ) : (
        <motion.div
          className="overflow-x-auto rounded-lg border border-orange-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <table className="w-full text-xs sm:text-sm">
            <thead className="bg-orange-500/10 border-b border-orange-500/30">
              <tr>
                <th className="px-2 sm:px-6 py-2 sm:py-4 text-left text-orange-400 font-semibold">Name</th>
                <th className="px-2 sm:px-6 py-2 sm:py-4 text-left text-orange-400 font-semibold hidden sm:table-cell">Company</th>
                <th className="px-2 sm:px-6 py-2 sm:py-4 text-left text-orange-400 font-semibold hidden md:table-cell">Email</th>
                <th className="px-2 sm:px-6 py-2 sm:py-4 text-left text-orange-400 font-semibold hidden lg:table-cell">Phone</th>
                <th className="px-2 sm:px-6 py-2 sm:py-4 text-left text-orange-400 font-semibold hidden lg:table-cell">Pitch</th>
                <th className="px-2 sm:px-6 py-2 sm:py-4 text-left text-orange-400 font-semibold hidden xl:table-cell">Work</th>
                <th className="px-2 sm:px-6 py-2 sm:py-4 text-left text-orange-400 font-semibold hidden xl:table-cell">IP</th>
                <th className="px-2 sm:px-6 py-2 sm:py-4 text-left text-orange-400 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-500/10">
              {applications.map((app, idx) => (
                <motion.tr
                  key={idx}
                  className="hover:bg-orange-500/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <td className="px-2 sm:px-6 py-2 sm:py-4 text-white font-medium text-xs sm:text-sm truncate">{app.fullName}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 text-orange-400 hidden sm:table-cell text-xs">{app.companyName}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 text-blue-300 hidden md:table-cell text-xs">{app.email?.split('@')[0]}...</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 text-purple-300 hidden lg:table-cell text-xs">{app.phone?.slice(-4)}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 text-white/70 hidden lg:table-cell text-xs max-w-xs truncate">{app.onePitchSentence}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 hidden xl:table-cell">
                    {app.proofOfWork ? (
                      <motion.a
                        href={app.proofOfWork}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-400 hover:text-orange-300 underline text-xs"
                        whileHover={{ scale: 1.05 }}
                      >
                        Link
                      </motion.a>
                    ) : (
                      <span className="text-white/40 text-xs">-</span>
                    )}
                  </td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 text-white/50 hidden xl:table-cell text-xs">{app._ip?.split('.').slice(0, 2).join('.')}...</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 text-white/50 text-xs">
                    {app._savedAt ? new Date(app._savedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  )
}

// Payments List Component
function PaymentsList() {
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    fetchPayments()
  }, [filterStatus])

  const fetchPayments = async () => {
    try {
      setLoading(true)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

      if (!supabaseUrl || !supabaseKey) {
        console.error('Missing Supabase config')
        setLoading(false)
        return
      }

      const supabase = createClient(supabaseUrl, supabaseKey)

      let query = supabase
        .from('subscriptions')
        .select('*')
        .order('created_at', { ascending: false })

      if (filterStatus !== 'all') {
        query = query.eq('payment_status', filterStatus)
      }

      const { data, error } = await query

      if (error) {
        console.error('Error fetching payments:', error)
      } else {
        setPayments(data || [])
      }
    } catch (err) {
      console.error('Error loading payments:', err)
    } finally {
      setLoading(false)
    }
  }

  const downloadCSV = () => {
    const headers = ['Name', 'Email', 'Tier', 'Amount (AED)', 'Billing', 'Method', 'Status', 'Transaction ID', 'Date']
    const rows = payments.map(p => [
      p.full_name || '-',
      p.email || '-',
      p.tier || '-',
      p.amount_aed || '-',
      p.billing_cycle || '-',
      p.payment_gateway || '-',
      p.payment_status || '-',
      p.payment_id || '-',
      p.created_at ? new Date(p.created_at).toLocaleString() : '-',
    ])

    const csvContent = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `payments_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const stats = {
    total: payments.length,
    completed: payments.filter(p => p.payment_status === 'completed').length,
    pending: payments.filter(p => p.payment_status === 'pending').length,
    failed: payments.filter(p => p.payment_status === 'failed').length,
    revenue: payments
      .filter(p => p.payment_status === 'completed')
      .reduce((sum, p) => sum + (p.amount_aed || 0), 0),
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 border-green-500/50 text-green-400'
      case 'pending':
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
      case 'failed':
        return 'bg-red-500/20 border-red-500/50 text-red-400'
      default:
        return 'bg-gray-500/20 border-gray-500/50 text-gray-400'
    }
  }

  const getMethodColor = (method: string) => {
    switch (method?.toLowerCase()) {
      case 'telr':
        return 'text-cyan-400'
      case 'stripe':
        return 'text-blue-400'
      case 'payfort':
        return 'text-purple-400'
      default:
        return 'text-gray-400'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <motion.div
          className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Stats Row */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
          <p className="text-orange-400/60 text-xs">Total</p>
          <p className="text-xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <p className="text-green-400/60 text-xs">Completed</p>
          <p className="text-xl font-bold text-green-400">{stats.completed}</p>
        </div>
        <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <p className="text-yellow-400/60 text-xs">Pending</p>
          <p className="text-xl font-bold text-yellow-400">{stats.pending}</p>
        </div>
        <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
          <p className="text-orange-400/60 text-xs">Revenue AED</p>
          <p className="text-xl font-bold text-orange-400">{stats.revenue.toFixed(0)}</p>
        </div>
      </motion.div>

      {/* Filter and Export */}
      <div className="flex justify-between items-start sm:items-center mb-4 sm:mb-6 flex-col sm:flex-row gap-2 sm:gap-0">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-xs focus:outline-none focus:border-orange-500"
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
          <option value="refunded">Refunded</option>
        </select>
        <motion.button
          onClick={downloadCSV}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 hover:from-orange-500/30 hover:to-orange-600/30 border border-orange-500/50 text-orange-400 rounded-lg transition-all text-xs sm:text-sm w-full sm:w-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download size={16} />
          Export CSV
        </motion.button>
      </div>

      {payments.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <CreditCard size={40} className="sm:size-48 mx-auto text-orange-400/20 mb-4" />
          <p className="text-orange-400/60 text-sm sm:text-base">No payments yet</p>
        </div>
      ) : (
        <motion.div
          className="overflow-x-auto rounded-lg border border-orange-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <table className="w-full text-xs sm:text-sm">
            <thead className="bg-orange-500/10 border-b border-orange-500/30">
              <tr>
                <th className="px-2 sm:px-4 py-2 sm:py-4 text-left text-orange-400 font-semibold">Name</th>
                <th className="px-2 sm:px-4 py-2 sm:py-4 text-left text-orange-400 font-semibold">Email</th>
                <th className="px-2 sm:px-4 py-2 sm:py-4 text-left text-orange-400 font-semibold hidden sm:table-cell">Plan</th>
                <th className="px-2 sm:px-4 py-2 sm:py-4 text-left text-orange-400 font-semibold">Amount</th>
                <th className="px-2 sm:px-4 py-2 sm:py-4 text-left text-orange-400 font-semibold hidden md:table-cell">Method</th>
                <th className="px-2 sm:px-4 py-2 sm:py-4 text-left text-orange-400 font-semibold">Status</th>
                <th className="px-2 sm:px-4 py-2 sm:py-4 text-left text-orange-400 font-semibold hidden lg:table-cell">Transaction ID</th>
                <th className="px-2 sm:px-4 py-2 sm:py-4 text-left text-orange-400 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-500/10">
              {payments.map((payment, idx) => (
                <motion.tr
                  key={idx}
                  className="hover:bg-orange-500/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.02 }}
                  whileHover={{ x: 4 }}
                >
                  <td className="px-2 sm:px-4 py-2 sm:py-4 text-white font-medium text-xs sm:text-sm truncate">
                    {payment.full_name || '-'}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 text-blue-300 text-xs sm:text-sm truncate">
                    {payment.email?.split('@')[0]}...
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 text-orange-400 hidden sm:table-cell text-xs capitalize">
                    {payment.tier?.replace('-', ' ') || '-'}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 text-green-400 font-bold text-xs sm:text-sm">
                    {payment.amount_aed?.toFixed(2) || '0'} AED
                  </td>
                  <td className={`px-2 sm:px-4 py-2 sm:py-4 hidden md:table-cell font-semibold text-xs ${getMethodColor(payment.payment_gateway)}`}>
                    {payment.payment_gateway?.toUpperCase() || '-'}
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(payment.payment_status)}`}>
                      {payment.payment_status}
                    </span>
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 text-gray-400 hidden lg:table-cell text-xs font-mono">
                    {payment.payment_id?.slice(0, 12)}...
                  </td>
                  <td className="px-2 sm:px-4 py-2 sm:py-4 text-white/50 text-xs">
                    {payment.created_at ? new Date(payment.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' }) : '-'}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  )
}

// WhatsApp Signups List Component
function WhatsAppSignupsList() {
  const [signups, setSignups] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSignups()
  }, [])

  const fetchSignups = async () => {
    try {
      // Try API first, then fallback to local storage
      try {
        const res = await fetch('/api/admin/whatsapp')
        if (res.ok) {
          const data = await res.json()
          setSignups(Array.isArray(data) ? data : data.data || [])
          setLoading(false)
          return
        }
      } catch (e) {
        console.error('API error:', e)
      }

      // Fallback to local storage
      const localData = localStorage.getItem('whatsapp_signups')
      if (localData) {
        const parsed = JSON.parse(localData)
        const sups = Array.isArray(parsed) ? parsed : parsed.value || []
        setSignups(sups)
      }
    } catch (err) {
      console.error('Error loading signups:', err)
    } finally {
      setLoading(false)
    }
  }

  const downloadCSV = () => {
    const headers = ['First Name', 'Phone', 'IP Address', 'Signed Up At']
    const rows = signups.map(signup => [
      signup.firstName || '-',
      signup.phone || '-',
      signup._ip || '-',
      signup._savedAt ? new Date(signup._savedAt).toLocaleString() : '-',
    ])

    const csvContent = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `whatsapp_signups_${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <motion.div
          className="w-8 h-8 rounded-full border-2 border-orange-500 border-t-transparent"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>
    )
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex justify-between items-start sm:items-center mb-4 sm:mb-6 flex-col sm:flex-row gap-2 sm:gap-0">
        <p className="text-orange-400/60 text-xs sm:text-base">
          Total: <span className="text-white font-bold text-sm sm:text-lg">{signups.length}</span>
        </p>
        <motion.button
          onClick={downloadCSV}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-orange-500/20 to-orange-600/20 hover:from-orange-500/30 hover:to-orange-600/30 border border-orange-500/50 text-orange-400 rounded-lg transition-all text-xs sm:text-sm w-full sm:w-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download size={16} />
          Export CSV
        </motion.button>
      </div>

      {signups.length === 0 ? (
        <div className="text-center py-8 sm:py-12">
          <Phone size={40} className="sm:size-48 mx-auto text-orange-400/20 mb-4" />
          <p className="text-orange-400/60 text-sm sm:text-base">No WhatsApp signups yet</p>
        </div>
      ) : (
        <motion.div
          className="overflow-x-auto rounded-lg border border-orange-500/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <table className="w-full text-xs sm:text-sm">
            <thead className="bg-orange-500/10 border-b border-orange-500/30">
              <tr>
                <th className="px-2 sm:px-6 py-2 sm:py-4 text-left text-orange-400 font-semibold">First Name</th>
                <th className="px-2 sm:px-6 py-2 sm:py-4 text-left text-orange-400 font-semibold">Phone</th>
                <th className="px-2 sm:px-6 py-2 sm:py-4 text-left text-orange-400 font-semibold hidden sm:table-cell">IP</th>
                <th className="px-2 sm:px-6 py-2 sm:py-4 text-left text-orange-400 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-500/10">
              {signups.map((signup, idx) => (
                <motion.tr
                  key={idx}
                  className="hover:bg-orange-500/5 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ x: 4 }}
                >
                  <td className="px-2 sm:px-6 py-2 sm:py-4 text-white font-medium text-xs sm:text-sm">{signup.firstName}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 text-orange-400 text-xs sm:text-sm">{signup.phone}</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 text-white/50 hidden sm:table-cell text-xs">{signup._ip?.split('.').slice(0, 2).join('.')}...</td>
                  <td className="px-2 sm:px-6 py-2 sm:py-4 text-white/50 text-xs">
                    {signup._savedAt ? new Date(signup._savedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '-'}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  )
}
