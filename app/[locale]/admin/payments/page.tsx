'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@supabase/supabase-js'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronDown, Filter, Download } from 'lucide-react'

interface Payment {
  id: string
  user_id: string
  email: string
  full_name: string
  tier: string
  billing_cycle: string
  amount_aed: number
  payment_status: 'pending' | 'completed' | 'failed' | 'refunded'
  subscription_status: string
  payment_id: string
  created_at: string
}

export default function PaymentsAdminPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterDate, setFilterDate] = useState<string>('all')


  useEffect(() => {
    fetchPayments()
  }, [filterStatus, filterDate])

  const fetchPayments = async () => {
    try {
      setLoading(true)
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

      if (!supabaseUrl || !supabaseKey) {
        setError('Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY.')
        setLoading(false)
        return
      }

      const supabase = createClient(supabaseUrl, supabaseKey)

      let query = supabase.from('subscriptions').select('*').order('created_at', { ascending: false })

      if (filterStatus !== 'all') {
        query = query.eq('payment_status', filterStatus)
      }

      if (filterDate !== 'all') {
        const days = filterDate === 'week' ? 7 : filterDate === 'month' ? 30 : 1
        const date = new Date()
        date.setDate(date.getDate() - days)
        query = query.gte('created_at', date.toISOString())
      }

      const { data, error: err } = await query

      if (err) {
        setError(err.message)
      } else {
        setPayments(data || [])
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch payments')
    } finally {
      setLoading(false)
    }
  }

  const exportToCSV = () => {
    const csv = [
      ['ID', 'Email', 'Name', 'Tier', 'Billing Cycle', 'Amount (AED)', 'Status', 'Date'],
      ...payments.map(p => [
        p.id,
        p.email,
        p.full_name,
        p.tier,
        p.billing_cycle,
        p.amount_aed.toString(),
        p.payment_status,
        new Date(p.created_at).toLocaleDateString()
      ])
    ]
    const content = csv.map(row => row.join(',')).join('\n')
    const blob = new Blob([content], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `payments_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const stats = {
    total: payments.length,
    completed: payments.filter(p => p.payment_status === 'completed').length,
    pending: payments.filter(p => p.payment_status === 'pending').length,
    failed: payments.filter(p => p.payment_status === 'failed').length,
    revenue: payments
      .filter(p => p.payment_status === 'completed')
      .reduce((sum, p) => sum + p.amount_aed, 0)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/10 border-green-500/30 text-green-400'
      case 'pending':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
      case 'failed':
        return 'bg-red-500/10 border-red-500/30 text-red-400'
      default:
        return 'bg-gray-500/10 border-gray-500/30 text-gray-400'
    }
  }

  return (
    <div className="min-h-screen bg-black px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-white mb-2">Payments Admin</h1>
          <p className="text-gray-400">Manage and monitor all payment transactions</p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gray-900/50 border-gray-700 p-6">
            <p className="text-gray-400 text-sm mb-2">Total Payments</p>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </Card>
          <Card className="bg-green-500/10 border-green-500/30 p-6">
            <p className="text-green-400 text-sm mb-2">Completed</p>
            <p className="text-3xl font-bold text-green-400">{stats.completed}</p>
          </Card>
          <Card className="bg-yellow-500/10 border-yellow-500/30 p-6">
            <p className="text-yellow-400 text-sm mb-2">Pending</p>
            <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
          </Card>
          <Card className="bg-orange-500/10 border-orange-500/30 p-6">
            <p className="text-orange-400 text-sm mb-2">Revenue (AED)</p>
            <p className="text-3xl font-bold text-orange-400">{stats.revenue.toFixed(0)}</p>
          </Card>
        </motion.div>

        {/* Filters and Actions */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
            <select
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-orange-500"
            >
              <option value="all">All Time</option>
              <option value="day">Last 24 Hours</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
          <Button
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
          >
            <Download size={16} />
            Export CSV
          </Button>
        </motion.div>

        {/* Payments Table */}
        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gray-900/50 border-gray-700">
            {loading ? (
              <div className="p-8 text-center text-gray-400">Loading payments...</div>
            ) : error ? (
              <div className="p-8 text-center text-red-400">Error: {error}</div>
            ) : payments.length === 0 ? (
              <div className="p-8 text-center text-gray-400">No payments found</div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Tier</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Amount</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-400">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                      <td className="px-6 py-4 text-sm text-gray-300">{payment.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{payment.full_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-300 capitalize">{payment.tier.replace('-', ' ')}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-orange-400">{payment.amount_aed.toFixed(2)} AED</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(payment.payment_status)}`}>
                          {payment.payment_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(payment.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
