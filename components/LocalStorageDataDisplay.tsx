'use client'

import { useEffect, useState } from 'react'

export function LocalStorageDataDisplay() {
  const [applications, setApplications] = useState<any[]>([])
  const [newsletters, setNewsletters] = useState<any[]>([])
  const [whatsapp, setWhatsapp] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState('applications')

  useEffect(() => {
    // Load data from localStorage
    if (typeof window !== 'undefined') {
      const apps = localStorage.getItem('applications')
      const news = localStorage.getItem('newsletters')
      const wa = localStorage.getItem('whatsapp_signups')

      if (apps) setApplications(JSON.parse(apps))
      if (news) setNewsletters(JSON.parse(news))
      if (wa) setWhatsapp(JSON.parse(wa))
    }
  }, [])

  const handleClearData = (key: string) => {
    if (window.confirm(`Are you sure you want to clear all ${key} data? This cannot be undone.`)) {
      localStorage.removeItem(key)
      if (key === 'applications') setApplications([])
      if (key === 'newsletters') setNewsletters([])
      if (key === 'whatsapp_signups') setWhatsapp([])
    }
  }

  const handleDownloadJSON = (data: any[], filename: string) => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2)))
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex gap-2 border-b border-white/10">
        <button
          onClick={() => setActiveTab('applications')}
          className={`px-4 py-2 font-semibold text-sm transition-colors ${
            activeTab === 'applications' ? 'text-orange-500 border-b-2 border-orange-500 -mb-0.5' : 'text-white/60 hover:text-white'
          }`}
        >
          Applications ({applications.length})
        </button>
        <button
          onClick={() => setActiveTab('newsletters')}
          className={`px-4 py-2 font-semibold text-sm transition-colors ${
            activeTab === 'newsletters' ? 'text-orange-500 border-b-2 border-orange-500 -mb-0.5' : 'text-white/60 hover:text-white'
          }`}
        >
          Newsletters ({newsletters.length})
        </button>
        <button
          onClick={() => setActiveTab('whatsapp')}
          className={`px-4 py-2 font-semibold text-sm transition-colors ${
            activeTab === 'whatsapp' ? 'text-orange-500 border-b-2 border-orange-500 -mb-0.5' : 'text-white/60 hover:text-white'
          }`}
        >
          WhatsApp Signups ({whatsapp.length})
        </button>
      </div>

      {/* Applications Tab */}
      {activeTab === 'applications' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Local Applications</h3>
            {applications.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownloadJSON(applications, 'applications.json')}
                  className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  Download JSON
                </button>
                <button
                  onClick={() => handleClearData('applications')}
                  className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                >
                  Clear Data
                </button>
              </div>
            )}
          </div>
          {applications.length === 0 ? (
            <p className="text-white/60">No local applications yet.</p>
          ) : (
            <div className="overflow-x-auto bg-transparent rounded-lg border border-white/10">
              <table className="min-w-full text-left">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-xs">#</th>
                    <th className="px-4 py-3 text-xs">Name</th>
                    <th className="px-4 py-3 text-xs">Company</th>
                    <th className="px-4 py-3 text-xs">Email</th>
                    <th className="px-4 py-3 text-xs">Phone</th>
                    <th className="px-4 py-3 text-xs">Pitch</th>
                    <th className="px-4 py-3 text-xs">Submitted</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app: any, i: number) => (
                    <tr key={i} className="border-t border-white/5 hover:bg-white/5">
                      <td className="px-4 py-3 text-xs">{i + 1}</td>
                      <td className="px-4 py-3 text-xs">{app.fullName}</td>
                      <td className="px-4 py-3 text-xs">{app.companyName}</td>
                      <td className="px-4 py-3 text-xs">{app.email}</td>
                      <td className="px-4 py-3 text-xs">{app.phone}</td>
                      <td className="px-4 py-3 text-xs truncate max-w-xs">{app.onePitchSentence}</td>
                      <td className="px-4 py-3 text-xs">{app.submittedAt ? new Date(app.submittedAt).toLocaleString() : 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Newsletters Tab */}
      {activeTab === 'newsletters' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Newsletter Subscribers</h3>
            {newsletters.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownloadJSON(newsletters, 'newsletters.json')}
                  className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  Download JSON
                </button>
                <button
                  onClick={() => handleClearData('newsletters')}
                  className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                >
                  Clear Data
                </button>
              </div>
            )}
          </div>
          {newsletters.length === 0 ? (
            <p className="text-white/60">No newsletter subscribers yet.</p>
          ) : (
            <div className="overflow-x-auto bg-transparent rounded-lg border border-white/10">
              <table className="min-w-full text-left">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-xs">#</th>
                    <th className="px-4 py-3 text-xs">Email</th>
                    <th className="px-4 py-3 text-xs">Subscribed</th>
                  </tr>
                </thead>
                <tbody>
                  {newsletters.map((sub: any, i: number) => (
                    <tr key={i} className="border-t border-white/5 hover:bg-white/5">
                      <td className="px-4 py-3 text-xs">{i + 1}</td>
                      <td className="px-4 py-3 text-xs">{sub.email}</td>
                      <td className="px-4 py-3 text-xs">{new Date(sub.subscribedAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* WhatsApp Tab */}
      {activeTab === 'whatsapp' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">WhatsApp Signups</h3>
            {whatsapp.length > 0 && (
              <div className="flex gap-2">
                <button
                  onClick={() => handleDownloadJSON(whatsapp, 'whatsapp_signups.json')}
                  className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
                >
                  Download JSON
                </button>
                <button
                  onClick={() => handleClearData('whatsapp_signups')}
                  className="px-3 py-1 text-xs bg-red-600 hover:bg-red-700 text-white rounded transition-colors"
                >
                  Clear Data
                </button>
              </div>
            )}
          </div>
          {whatsapp.length === 0 ? (
            <p className="text-white/60">No WhatsApp signups yet.</p>
          ) : (
            <div className="overflow-x-auto bg-transparent rounded-lg border border-white/10">
              <table className="min-w-full text-left">
                <thead className="bg-white/5">
                  <tr>
                    <th className="px-4 py-3 text-xs">#</th>
                    <th className="px-4 py-3 text-xs">First Name</th>
                    <th className="px-4 py-3 text-xs">Phone</th>
                    <th className="px-4 py-3 text-xs">Signed Up</th>
                  </tr>
                </thead>
                <tbody>
                  {whatsapp.map((signup: any, i: number) => (
                    <tr key={i} className="border-t border-white/5 hover:bg-white/5">
                      <td className="px-4 py-3 text-xs">{i + 1}</td>
                      <td className="px-4 py-3 text-xs">{signup.firstName}</td>
                      <td className="px-4 py-3 text-xs">{signup.phone}</td>
                      <td className="px-4 py-3 text-xs">{new Date(signup.signedUpAt).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
