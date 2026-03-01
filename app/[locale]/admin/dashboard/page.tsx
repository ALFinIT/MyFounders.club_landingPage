'use client'

import { useState, useEffect } from 'react'
import { Download, Filter } from 'lucide-react'

interface Application {
  id: string
  full_name: string
  company_name: string
  email: string
  phone: string
  one_pitch_sentence: string
  proof_of_work?: string
  agree_commitment: boolean
  created_at: string
  type: 'founder' | 'investor' | 'other'
}

interface WhatsAppSignup {
  id: string
  first_name: string
  phone: string
  created_at: string
  type: 'community'
}

interface NewsletterSignup {
  id: string
  email: string
  subscribed_at: string
  type: 'newsletter'
}

type DataItem = Application | WhatsAppSignup | NewsletterSignup

export default function AdminDashboard() {
  const [data, setData] = useState<DataItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'founder' | 'investor' | 'community' | 'newsletter'>('all')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch from Supabase
        const [appRes, whatsappRes, newsRes] = await Promise.all([
          fetch('/api/admin/applications'),
          fetch('/api/admin/whatsapp'),
          fetch('/api/admin/newsletter'),
        ])

        const applications = await appRes.json()
        const whatsapps = await whatsappRes.json()
        const newsletters = await newsRes.json()

        // Get localStorage data
        const localApps = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('applications') || '[]') : []

        // Combine all data
        const allData: DataItem[] = [
          ...(applications || []).map((app: any) => ({ ...app, type: 'founder' as const })),
          ...(whatsapps || []).map((w: any) => ({ ...w, type: 'community' as const })),
          ...(newsletters || []).map((n: any) => ({ ...n, type: 'newsletter' as const })),
          ...localApps.map((app: any) => ({ ...app, id: app.id || Math.random().toString(), type: 'founder' as const, created_at: app.submittedAt })),
        ]

        setData(allData)
      } catch (err) {
        console.error('Failed to fetch admin data', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredData = filter === 'all' ? data : data.filter((item) => item.type === filter)

  const downloadCSV = () => {
    if (!filteredData.length) return

    const headers = ['Type', 'Name/Company', 'Email', 'Phone', 'Details', 'Date']
    const rows = filteredData.map((item) => {
      if (item.type === 'founder') {
        const app = item as Application
        return [
          'Shortlist Application',
          app.full_name,
          app.email,
          app.phone,
          `Company: ${app.company_name} | Pitch: ${app.one_pitch_sentence}`,
          new Date(app.created_at).toLocaleString(),
        ]
      } else if (item.type === 'community') {
        const w = item as WhatsAppSignup
        return ['WhatsApp Community', w.first_name, '', w.phone, '', new Date(w.created_at).toLocaleString()]
      } else {
        const n = item as NewsletterSignup
        return ['Newsletter', '', n.email, '', 'Subscribed', new Date(n.subscribed_at).toLocaleString()]
      }
    })

    const csv = [headers, ...rows].map((row) => row.map((cell) => `"${cell}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `admin_data_${filter}_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  const downloadJSON = () => {
    if (!filteredData.length) return

    const json = JSON.stringify(filteredData, null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `admin_data_${filter}_${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  const statsMap = {
    Shortlist: data.filter((d) => d.type === 'founder').length,
    Community: data.filter((d) => d.type === 'community').length,
    Newsletter: data.filter((d) => d.type === 'newsletter').length,
    Total: data.length,
  }

  if (loading) {
    return (
      <div className="p-8">
        <p className="text-gray-400">Loading data...</p>
      </div>
    )
  }

  return (
    <div className="p-8 min-h-screen bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-400">View all submissions, manage data, and export reports</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(statsMap).map(([label, count]) => (
            <div key={label} className="p-4 rounded-lg bg-white/10 border border-white/10">
              <p className="text-gray-400 text-sm">{label}</p>
              <p className="text-2xl font-bold text-orange-400">{count}</p>
            </div>
          ))}
        </div>

        {/* Filter & Download */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {(['all', 'founder', 'community', 'newsletter'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filter === f
                    ? 'bg-orange-500 text-white'
                    : 'bg-white/10 border border-white/10 text-white/70 hover:text-white'
                }`}
              >
                {f === 'founder' ? 'Shortlist' : f === 'community' ? 'WhatsApp' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={downloadCSV}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
            >
              <Download size={16} />
              CSV
            </button>
            <button
              onClick={downloadJSON}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all"
            >
              <Download size={16} />
              JSON
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto rounded-lg border border-white/10 bg-white/5">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-white/10 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-semibold text-white">#</th>
                <th className="px-6 py-4 font-semibold text-white">Type</th>
                <th className="px-6 py-4 font-semibold text-white">Name/Email</th>
                <th className="px-6 py-4 font-semibold text-white">Company/Details</th>
                <th className="px-6 py-4 font-semibold text-white">Phone</th>
                <th className="px-6 py-4 font-semibold text-white">Message</th>
                <th className="px-6 py-4 font-semibold text-white">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                    No data found for this category
                  </td>
                </tr>
              ) : (
                filteredData.map((item, idx) => {
                  if (item.type === 'founder') {
                    const app = item as Application
                    return (
                      <tr key={app.id} className="border-b border-white/5 hover:bg-white/5 transition">
                        <td className="px-6 py-4 text-white/60">{idx + 1}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400">
                            Shortlist
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white">{app.full_name}</td>
                        <td className="px-6 py-4 text-white/70">{app.company_name}</td>
                        <td className="px-6 py-4 text-white">{app.phone}</td>
                        <td className="px-6 py-4 text-white/60 max-w-xs truncate">{app.one_pitch_sentence}</td>
                        <td className="px-6 py-4 text-white/60 text-xs">{new Date(app.created_at).toLocaleString()}</td>
                      </tr>
                    )
                  } else if (item.type === 'community') {
                    const w = item as WhatsAppSignup
                    return (
                      <tr key={w.id} className="border-b border-white/5 hover:bg-white/5 transition">
                        <td className="px-6 py-4 text-white/60">{idx + 1}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                            Community
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white">{w.first_name}</td>
                        <td className="px-6 py-4 text-white/70">-</td>
                        <td className="px-6 py-4 text-white">{w.phone}</td>
                        <td className="px-6 py-4 text-white/60">Joined WhatsApp</td>
                        <td className="px-6 py-4 text-white/60 text-xs">{new Date(w.created_at).toLocaleString()}</td>
                      </tr>
                    )
                  } else {
                    const n = item as NewsletterSignup
                    return (
                      <tr key={n.id} className="border-b border-white/5 hover:bg-white/5 transition">
                        <td className="px-6 py-4 text-white/60">{idx + 1}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                            Newsletter
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white">{n.email}</td>
                        <td className="px-6 py-4 text-white/70">-</td>
                        <td className="px-6 py-4 text-white">-</td>
                        <td className="px-6 py-4 text-white/60">Subscribed</td>
                        <td className="px-6 py-4 text-white/60 text-xs">{new Date(n.subscribed_at).toLocaleString()}</td>
                      </tr>
                    )
                  }
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-sm text-white/60">
            <strong>Total Records:</strong> {filteredData.length} | <strong>Showing:</strong> {filter === 'all' ? 'All Categories' : filter.charAt(0).toUpperCase() + filter.slice(1)}
          </p>
        </div>
      </div>
    </div>
  )
}
