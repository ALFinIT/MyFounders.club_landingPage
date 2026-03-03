'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

const ROLES = [
  { key: 'Startup Founder / Co-Founder', icon: 'F', desc: 'Building and scaling a startup venture.' },
  { key: 'SME Owner / Executive', icon: 'S', desc: 'Growing an established business in GCC markets.' },
  { key: 'Investor (VC, Angel, Syndicate)', icon: 'I', desc: 'Deploying capital into high-potential founders.' },
  { key: 'Family Office Principal / Representative', icon: 'FO', desc: 'Managing strategic multi-generational investments.' },
  { key: 'Service Provider', icon: 'SP', desc: 'Supporting founders with legal, finance, or growth services.' },
  { key: 'Corporate Innovation / Business Development', icon: 'C', desc: 'Driving startup collaboration inside enterprises.' },
  { key: 'Other', icon: 'O', desc: 'A role outside the categories above.' },
]

export default function ProfilePage() {
  const router = useRouter()
  const [ready, setReady] = useState(false)
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    whatsapp: '',
    linkedin: '',
    location: '',
    nationality: '',
    gender: '',
    role: '',
    roleOther: '',
    acceptedTerms: false,
  })

  useEffect(() => {
    const raw = localStorage.getItem('mfc_user')
    if (!raw) {
      router.replace('/auth')
      return
    }
    try {
      const user = JSON.parse(raw) as { firstName?: string; lastName?: string; email?: string; role?: string }
      setForm((prev) => ({
        ...prev,
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        email: user.email ?? '',
      }))
      if (user.role === 'admin') router.replace('/admin')
      setReady(true)
    } catch {
      router.replace('/auth')
    }
  }, [router])

  const progress = useMemo(() => {
    if (done) return 100
    if (step === 2 && form.role) return 75
    if (step === 2) return 50
    return 0
  }, [done, step, form.role])

  const validateStep1 = () => {
    return !!(form.firstName && form.lastName && form.email && form.whatsapp.startsWith('+') && form.linkedin && form.location && form.nationality)
  }

  const next = () => {
    setError('')
    if (!validateStep1()) {
      setError('Complete all required fields in Basic Info. WhatsApp must include country code (+).')
      return
    }
    setStep(2)
  }

  const submit = async () => {
    setError('')
    if (!form.role) {
      setError('Select one role to continue.')
      return
    }
    if (!form.acceptedTerms) {
      setError('Accept the terms and profile visibility to continue.')
      return
    }
    setLoading(true)
    try {
      const response = await fetch('/api/profile/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data?.error || 'Unable to save profile')
      setDone(true)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to save profile.')
    } finally {
      setLoading(false)
    }
  }

  if (!ready) return null

  return (
    <main className="min-h-screen bg-[#050505] px-[5%] py-12 text-(--cloud)">
      <section className="site-shell border border-[rgba(255,255,255,.06)] bg-[rgba(255,255,255,.02)] p-6 sm:p-8">
        <div className="flex flex-col gap-6 border-b border-[rgba(255,255,255,.08)] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-lead">Member Onboarding</p>
            <h1 className="section-title mt-3">Complete your profile.</h1>
          </div>
          <div className="w-full max-w-[240px]">
            <div className="mb-2 flex items-center justify-between text-[.68rem] uppercase tracking-[.14em] text-(--silver)">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-[3px] w-full bg-[rgba(255,255,255,.1)]">
              <div className="h-[3px] bg-(--orange) transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {!done ? (
          <>
            <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2">
              <div className={`border p-4 ${step === 1 ? 'border-[rgba(255,91,35,.42)] bg-[rgba(255,91,35,.07)]' : 'border-[rgba(255,255,255,.08)] bg-[rgba(255,255,255,.02)]'}`}>
                <p className="font-(--font-display) text-[.74rem] uppercase tracking-[.14em] text-(--orange)">01 Basic Info</p>
                <p className="copy mt-2 text-[.82rem]">Identity and context for personalized GCC recommendations.</p>
              </div>
              <div className={`border p-4 ${step === 2 ? 'border-[rgba(255,91,35,.42)] bg-[rgba(255,91,35,.07)]' : 'border-[rgba(255,255,255,.08)] bg-[rgba(255,255,255,.02)]'}`}>
                <p className="font-(--font-display) text-[.74rem] uppercase tracking-[.14em] text-(--orange)">02 Your Role</p>
                <p className="copy mt-2 text-[.82rem]">Select one primary role to personalize your member dashboard.</p>
              </div>
            </div>

            {step === 1 && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div><label className="field-label">First Name</label><input className="form-input" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} /></div>
                  <div><label className="field-label">Last Name</label><input className="form-input" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div><label className="field-label">Email</label><input className="form-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
                  <div><label className="field-label">WhatsApp (+Country Code)</label><input className="form-input" placeholder="+9715..." value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div><label className="field-label">LinkedIn URL</label><input className="form-input" value={form.linkedin} onChange={(e) => setForm({ ...form, linkedin: e.target.value })} /></div>
                  <div><label className="field-label">Current Location</label><input className="form-input" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
                </div>
                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div><label className="field-label">Nationality</label><input className="form-input" value={form.nationality} onChange={(e) => setForm({ ...form, nationality: e.target.value })} /></div>
                  <div>
                    <label className="field-label">Gender (Optional)</label>
                    <input className="form-input" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} />
                    <p className="mt-1 text-[.72rem] text-[rgba(255,255,255,.55)]">Used only for diversity insights and relevant program matching.</p>
                  </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={next}>Continue to Your Role</button>
              </div>
            )}

            {step === 2 && (
              <div className="mt-6">
                <p className="field-label mb-3">Select one role</p>
                <div className="card-grid grid grid-cols-1 md:grid-cols-2">
                  {ROLES.map((r) => (
                    <button
                      type="button"
                      key={r.key}
                      onClick={() => setForm((prev) => ({ ...prev, role: r.key }))}
                      className={`text-left p-4 border transition ${form.role === r.key ? 'border-(--orange) bg-[rgba(255,91,35,.1)]' : 'border-[rgba(255,255,255,.08)] bg-[rgba(255,255,255,.02)] hover:border-[rgba(255,91,35,.35)]'}`}
                    >
                      <p className="font-(--font-display) text-[.92rem] text-white">{r.icon} {r.key}</p>
                      <p className="copy mt-1 text-[.8rem]">{r.desc}</p>
                    </button>
                  ))}
                </div>

                {form.role === 'Other' && (
                  <div className="mt-3">
                    <label className="field-label">Tell us your role</label>
                    <input className="form-input" value={form.roleOther} onChange={(e) => setForm((prev) => ({ ...prev, roleOther: e.target.value }))} />
                  </div>
                )}

                <label className="mt-4 flex items-start gap-3 border border-[rgba(255,91,35,.22)] bg-[rgba(255,91,35,.06)] p-3 text-[.82rem]">
                  <input type="checkbox" checked={form.acceptedTerms} onChange={(e) => setForm((prev) => ({ ...prev, acceptedTerms: e.target.checked }))} />
                  I agree to terms and understand my profile is visible to verified MFC members.
                </label>

                <div className="mt-4 flex flex-wrap gap-3">
                  <button type="button" className="btn btn-outline" onClick={() => setStep(1)}>Back</button>
                  <button type="button" className="btn btn-primary" onClick={submit} disabled={loading}>{loading ? 'Submitting...' : 'Submit Profile'}</button>
                </div>
              </div>
            )}

            {error && <p className="mt-4 text-[.82rem] text-[#ff7a4a]">{error}</p>}
          </>
        ) : (
          <div className="py-14 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center border-2 border-(--orange) text-2xl text-(--orange)">OK</div>
            <h2 className="mt-5 font-(--font-display) text-[2rem] font-bold text-white">You&apos;re in, {form.firstName}.</h2>
            <p className="copy mx-auto mt-3 max-w-[560px]">Your profile is under review. Full access is typically unlocked within 24 hours.</p>
            <button type="button" className="btn btn-primary mt-6" onClick={() => router.push('/')}>Back to Home</button>
          </div>
        )}
      </section>
    </main>
  )
}
