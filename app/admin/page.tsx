'use client'

import { useEffect, useMemo, useState } from 'react'

type Member = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  location: string
  nationality: string
  status: 'active' | 'pending' | 'under_review'
  profileCompleted: boolean
  joinedAt: string
  whatsapp?: string
  linkedin?: string
}

const statusColor: Record<Member['status'], string> = {
  active: '#22c55e',
  pending: '#f59e0b',
  under_review: '#38bdf8',
}

export default function AdminPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [selected, setSelected] = useState<Member | null>(null)
  const [filters, setFilters] = useState({ q: '', role: '', status: '', country: '' })

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const sessionRes = await fetch('/api/auth/session', { cache: 'no-store' })
        if (!sessionRes.ok) {
          window.location.replace('/auth?tab=signin')
          return
        }
        const sessionData = await sessionRes.json()
        const user = sessionData?.user as { role?: string; email?: string } | undefined
        if (!user || (user.role !== 'admin' && user.email !== 'admin@mfc.demo')) {
          window.location.replace('/auth?tab=signin')
          return
        }
        localStorage.setItem('mfc_user', JSON.stringify(user))

        const membersRes = await fetch('/api/admin/members')
        const membersData = await membersRes.json()
        setMembers(Array.isArray(membersData.members) ? membersData.members : [])
      } catch {
        setMembers([])
      }
    }

    void bootstrap()
  }, [])

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase()
    return members.filter((m) => {
      const hay = `${m.firstName} ${m.lastName} ${m.email} ${m.location}`.toLowerCase()
      if (q && !hay.includes(q)) return false
      if (filters.role && m.role !== filters.role) return false
      if (filters.status && m.status !== filters.status) return false
      if (filters.country && !m.location.toLowerCase().includes(filters.country.toLowerCase())) return false
      return true
    })
  }, [members, filters])

  const kpis = useMemo(() => {
    const total = members.length
    const pending = members.filter((m) => m.status === 'pending').length
    const completedPct = total ? Math.round((members.filter((m) => m.profileCompleted).length / total) * 100) : 0
    const activeThisMonth = members.filter((m) => new Date(m.joinedAt).getMonth() === new Date().getMonth()).length
    return { total, pending, completedPct, activeThisMonth }
  }, [members])

  const roleBreakdown = useMemo(() => {
    const map = new Map<string, number>()
    members.forEach((m) => map.set(m.role, (map.get(m.role) ?? 0) + 1))
    return Array.from(map.entries()).map(([role, count]) => ({
      role,
      count,
      pct: members.length ? Math.round((count / members.length) * 100) : 0,
    }))
  }, [members])

  const countryBreakdown = useMemo(() => {
    const map = new Map<string, number>()
    members.forEach((m) => {
      const country = m.location.split(',').pop()?.trim() || m.location
      map.set(country, (map.get(country) ?? 0) + 1)
    })
    return Array.from(map.entries()).map(([country, count]) => ({ country, count }))
  }, [members])

  const exportCsv = (forExcel = false) => {
    const header = ['Name', 'Email', 'Role', 'City', 'Nationality', 'Status', 'Joined At']
    const rows = filtered.map((m) => [`${m.firstName} ${m.lastName}`, m.email, m.role, m.location, m.nationality, m.status, m.joinedAt])
    const csv = [header, ...rows].map((r) => r.map((v) => `"${String(v).replaceAll('"', '""')}"`).join(',')).join('\n')
    const blob = new Blob([forExcel ? '\uFEFF' + csv : csv], { type: 'text/csv;charset=utf-8;' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = forExcel ? 'mfc-members-excel.csv' : 'mfc-members.csv'
    a.click()
    URL.revokeObjectURL(a.href)
  }

  const exportPdf = () => {
    const now = new Date().toLocaleString()
    const html = `
      <html><head><title>MFC Members Export</title>
      <style>body{font-family:Arial;padding:24px}h1{margin:0 0 12px}table{width:100%;border-collapse:collapse}th,td{border:1px solid #ddd;padding:8px;font-size:12px;text-align:left}th{background:#f3f3f3}</style>
      </head><body>
      <h1>MFC Operations Centre - Members</h1>
      <p>Generated: ${now}</p>
      <table>
      <thead><tr><th>#</th><th>Name</th><th>Email</th><th>Role</th><th>City</th><th>Status</th><th>Joined</th></tr></thead>
      <tbody>
      ${filtered
        .map(
          (m, i) =>
            `<tr><td>${i + 1}</td><td>${m.firstName} ${m.lastName}</td><td>${m.email}</td><td>${m.role}</td><td>${m.location}</td><td>${m.status}</td><td>${new Date(
              m.joinedAt
            ).toLocaleDateString()}</td></tr>`
        )
        .join('')}
      </tbody></table><p style="margin-top:16px;color:#666;font-size:11px">Confidential - MyFounders.Club Internal</p>
      <script>setTimeout(()=>window.print(),400)</script>
      </body></html>`
    const w = window.open('', '_blank')
    if (!w) return
    w.document.write(html)
    w.document.close()
  }

  return (
    <main className="min-h-screen bg-[#050505] px-[5%] py-7 text-(--cloud)">
      <section className="site-shell">
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-lead"><span className="blink mr-2 inline-block">o</span>Operations</p>
            <h1 className="section-title mt-2">MFC Operations Centre</h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={exportPdf} className="btn px-4 py-2 text-[.78rem] uppercase tracking-[.1em] text-white bg-[#e74c3c] hover:translate-y-[-2px]">PDF Export</button>
            <button onClick={() => exportCsv(true)} className="btn px-4 py-2 text-[.78rem] uppercase tracking-[.1em] text-white bg-[#27ae60] hover:translate-y-[-2px]">Excel Export</button>
            <button onClick={() => exportCsv(false)} className="btn btn-outline px-4 py-2 text-[.78rem] uppercase tracking-[.1em]">CSV Export</button>
          </div>
        </header>

        <div className="card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['Total Members', String(kpis.total)],
            ['Pending Review', String(kpis.pending)],
            ['Profiles Completed', `${kpis.completedPct}%`],
            ['Active This Month', String(kpis.activeThisMonth)],
          ].map(([label, value]) => (
            <article key={label} className="card-base p-5">
              <p className="font-(--font-display) text-[2rem] font-extrabold text-(--orange)">{value}</p>
              <p className="mt-2 text-[.7rem] uppercase tracking-[.14em] text-(--silver)">{label}</p>
            </article>
          ))}
        </div>

        <div className="glass-card mt-6 p-4">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
            <input className="form-input" placeholder="Search name, email, city" value={filters.q} onChange={(e) => setFilters((s) => ({ ...s, q: e.target.value }))} />
            <select className="form-input" value={filters.role} onChange={(e) => setFilters((s) => ({ ...s, role: e.target.value }))}>
              <option value="">All Roles</option>
              {[...new Set(members.map((m) => m.role))].map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <select className="form-input" value={filters.status} onChange={(e) => setFilters((s) => ({ ...s, status: e.target.value }))}>
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="under_review">Under Review</option>
            </select>
            <input className="form-input" placeholder="Country (e.g. UAE)" value={filters.country} onChange={(e) => setFilters((s) => ({ ...s, country: e.target.value }))} />
          </div>
          <p className="mt-2 text-[.74rem] text-[rgba(255,255,255,.62)]">{filtered.length} results of {members.length}</p>
        </div>

        <div className="glass-card mt-6 overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-[rgba(255,91,35,.08)]">
              <tr className="text-left text-[.66rem] uppercase tracking-[.14em] text-(--orange)">
                <th className="px-3 py-3">#</th><th className="px-3 py-3">Member</th><th className="px-3 py-3">Email</th><th className="px-3 py-3">Role</th><th className="px-3 py-3">City</th><th className="px-3 py-3">Status</th><th className="px-3 py-3">Join Date</th><th className="px-3 py-3">View</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m, i) => (
                <tr key={m.id} className="border-t border-[rgba(255,255,255,.06)] text-[.82rem]">
                  <td className="px-3 py-3 text-(--silver)">{i + 1}</td>
                  <td className="px-3 py-3 text-white">{m.firstName} {m.lastName}</td>
                  <td className="px-3 py-3 text-(--silver)">{m.email}</td>
                  <td className="px-3 py-3"><span className="border border-[rgba(255,91,35,.3)] bg-[rgba(255,91,35,.12)] px-2 py-1 text-[.66rem] uppercase tracking-[.08em] text-(--orange)">{m.role}</span></td>
                  <td className="px-3 py-3">{m.location}</td>
                  <td className="px-3 py-3">
                    <span className="inline-flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ background: statusColor[m.status] }} />
                      <span className="capitalize">{m.status.replace('_', ' ')}</span>
                    </span>
                  </td>
                  <td className="px-3 py-3 text-(--silver)">{new Date(m.joinedAt).toLocaleDateString()}</td>
                  <td className="px-3 py-3"><button className="btn btn-outline px-3 py-1 text-[.7rem]" onClick={() => setSelected(m)}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-2 lg:grid-cols-2">
          <article className="card-base p-5">
            <p className="font-(--font-display) text-[1.1rem] font-bold text-white">Role Breakdown</p>
            <div className="mt-4 space-y-3">
              {roleBreakdown.map((r) => (
                <div key={r.role}>
                  <div className="mb-1 flex justify-between text-[.74rem]"><span>{r.role}</span><span>{r.pct}%</span></div>
                  <div className="h-2 bg-[rgba(255,255,255,.08)]">
                    <div className="h-2 bg-(--orange) transition-all duration-1000" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="card-base p-5">
            <p className="font-(--font-display) text-[1.1rem] font-bold text-white">Country Distribution</p>
            <div className="mt-5 flex items-center gap-6">
              <div
                className="relative h-[168px] w-[168px] rounded-full"
                style={{
                  background: `conic-gradient(#ff5b23 0 ${Math.min(100, (countryBreakdown[0]?.count ?? 0) / Math.max(1, members.length) * 100)}%, #3e5c5e 0 100%)`,
                }}
              >
                <div className="absolute inset-4 flex items-center justify-center rounded-full bg-[#050505] text-center">
                  <div>
                    <p className="font-(--font-display) text-[1.4rem] font-extrabold text-white">{members.length}</p>
                    <p className="text-[.64rem] uppercase tracking-[.12em] text-(--silver)">Members</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-[.78rem]">
                {countryBreakdown.map((c) => (
                  <p key={c.country} className="text-(--silver)">{c.country}: <span className="text-white">{c.count}</span></p>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      {selected && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[rgba(0,0,0,.72)] p-5 backdrop-blur-[4px]" onClick={(e) => e.target === e.currentTarget && setSelected(null)}>
          <div className="w-full max-w-[560px] border border-[rgba(255,255,255,.09)] bg-[#0a0a0a] p-5">
            <div className="flex items-start justify-between">
              <h2 className="font-(--font-display) text-[1.4rem] text-white">Member Profile</h2>
              <button className="btn btn-outline px-2 py-1 text-[.65rem]" onClick={() => setSelected(null)}>Close</button>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-2 text-[.84rem] text-(--silver)">
              <p><span className="text-white">Name:</span> {selected.firstName} {selected.lastName}</p>
              <p><span className="text-white">Email:</span> {selected.email}</p>
              <p><span className="text-white">Role:</span> {selected.role}</p>
              <p><span className="text-white">City:</span> {selected.location}</p>
              <p><span className="text-white">Nationality:</span> {selected.nationality}</p>
              <p><span className="text-white">WhatsApp:</span> {selected.whatsapp || '-'}</p>
              <p><span className="text-white">LinkedIn:</span> {selected.linkedin || '-'}</p>
              <p><span className="text-white">Joined:</span> {new Date(selected.joinedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
