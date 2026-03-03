'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Tab = 'signup' | 'signin'

export default function AuthPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('signup')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const isSignup = tab === 'signup'
  const setField = (name: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const fillDemo = (type: 'member' | 'admin') => {
    if (type === 'admin') {
      setTab('signin')
      setForm({ firstName: '', lastName: '', email: 'admin@mfc.demo', password: 'admin123' })
      return
    }
    setForm({
      firstName: 'Katerina',
      lastName: 'Hayes',
      email: 'katerina@mfc.demo',
      password: 'founder123',
    })
  }

  const submit = async () => {
    setLoading(true)
    setError('')
    try {
      const endpoint = isSignup ? '/api/auth/signup' : '/api/auth/signin'
      const payload = isSignup ? form : { email: form.email, password: form.password }
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data?.error || 'Request failed')

      localStorage.setItem('mfc_user', JSON.stringify(data.user))
      router.push(data.redirectTo ?? '/profile')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to continue.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-(--cloud)">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_38%_34%,rgba(255,91,35,.12),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,91,35,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,91,35,.05)_1px,transparent_1px)] bg-[size:48px_48px] opacity-55" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_14%,rgba(12,22,26,.7),transparent_48%)]" />

      <section className="site-shell relative z-[2] grid min-h-screen grid-cols-1 items-center gap-2 py-5 lg:grid-cols-[1.12fr_.88fr]">
        <div className="glass-card-soft hidden p-8 lg:block">
          <span className="orange-badge">
            <span className="beta-dot" />
            Beta Access - Spots Limited
          </span>

          <div className="mt-7">
            <Image src="/Full_logo_mfc.png" alt="MyFounders.Club" width={244} height={58} priority />
          </div>
          <h1 className="mt-7 font-(--font-display) text-[clamp(2.1rem,3.8vw,3.9rem)] leading-[.94] tracking-[-.03em] text-white">
            <span className="text-(--orange)">Hello</span>!
            <br />
            It&apos;s <span className="text-(--orange)">good</span> to
            <br />
            see you <span className="text-(--orange)">again</span>
          </h1>

          <div className="card-grid mt-8 grid grid-cols-1">
            {[
              ['AI Next-Step Engine', 'Get 3-5 best-fit opportunities instead of 300 irrelevant links.'],
              ['GCC Jurisdiction Navigator', 'Compare six GCC markets with practical setup guidance.'],
              ['Verified Founder Communities', 'Join trusted circles tailored by role and geography.'],
            ].map(([title, desc]) => (
              <article key={title} className="card-base p-4">
                <p className="font-(--font-display) text-[.85rem] font-bold text-white">{title}</p>
                <p className="copy mt-1 text-[.8rem]">{desc}</p>
              </article>
            ))}
          </div>

          <div className="stats-strip card-grid mt-6 grid grid-cols-3">
            {[
              ['4.5B', 'GCC CAPITAL'],
              ['523%', 'YOY GROWTH'],
              ['63K+', 'STARTUPS'],
            ].map(([value, label]) => (
              <div key={value} className="border border-[rgba(255,91,35,.16)] bg-[rgba(255,91,35,.06)] p-4 text-center">
                <p className="font-(--font-display) text-[1.6rem] font-extrabold text-(--orange)">{value}</p>
                <p className="mt-1 text-[.62rem] tracking-[.12em] text-[rgba(255,255,255,.74)]">{label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 border border-[rgba(62,92,94,.4)] bg-[rgba(62,92,94,.12)] p-4">
            <p className="font-(--font-display) text-[.78rem] uppercase tracking-[.14em] text-[#9fd3d5]">Verified Members Only</p>
            <p className="mt-2 text-[.83rem] text-[rgba(255,255,255,.82)]">Every member is reviewed by our team. Your network is curated, not crowdsourced.</p>
          </div>
        </div>

        <div className="glass-card-strong mx-auto w-full max-w-[470px] p-6 sm:p-9">
          <div className="glass-card-soft grid grid-cols-2 gap-1 p-1">
            <button
              className={`px-4 py-2 text-[.78rem] uppercase tracking-[.12em] transition ${isSignup ? 'bg-(--orange) font-(--font-display) font-bold text-white' : 'text-(--silver)'}`}
              onClick={() => setTab('signup')}
              type="button"
            >
              Create Account
            </button>
            <button
              className={`px-4 py-2 text-[.78rem] uppercase tracking-[.12em] transition ${!isSignup ? 'bg-(--orange) font-(--font-display) font-bold text-white' : 'text-(--silver)'}`}
              onClick={() => setTab('signin')}
              type="button"
            >
              Sign In
            </button>
          </div>

          <h2 className="mt-6 font-(--font-display) text-[clamp(1.7rem,3vw,2.2rem)] font-extrabold tracking-[-.02em] text-white">Join MyFounders.Club</h2>
          <p className="copy mt-2 text-[.8rem]">Free access. No credit card. The Gulf&apos;s founder community awaits.</p>

          <div className="mt-5 border border-[rgba(62,92,94,.45)] bg-[rgba(62,92,94,.2)] p-4">
            <p className="text-[.65rem] uppercase tracking-[.14em] text-[#90c4c6]">Quick Test Credentials</p>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button type="button" onClick={() => fillDemo('member')} className="glass-card-soft p-2 text-left text-[.78rem] hover:border-[rgba(255,91,35,.4)]">
                Founder Demo
              </button>
              <button type="button" onClick={() => fillDemo('admin')} className="glass-card-soft p-2 text-left text-[.78rem] hover:border-[rgba(255,91,35,.4)]">
                Admin Demo
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2">
            <button className="border border-[rgba(255,255,255,.1)] bg-transparent px-4 py-2 text-[.8rem] text-(--cloud) hover:border-[rgba(255,91,35,.35)]" type="button">
              Continue with Google
            </button>
            <button className="border border-[rgba(255,255,255,.1)] bg-transparent px-4 py-2 text-[.8rem] text-(--cloud) hover:border-[rgba(255,91,35,.35)]" type="button">
              Continue with LinkedIn
            </button>
          </div>

          <div className="my-5 h-px bg-[rgba(255,255,255,.08)]" />

          <div className="space-y-4">
            {isSignup && (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label className="field-label">First Name</label>
                  <input className="form-input" value={form.firstName} onChange={(e) => setField('firstName', e.target.value)} />
                </div>
                <div>
                  <label className="field-label">Last Name</label>
                  <input className="form-input" value={form.lastName} onChange={(e) => setField('lastName', e.target.value)} />
                </div>
              </div>
            )}

            <div>
              <label className="field-label">Email Address</label>
              <input className="form-input" type="email" value={form.email} onChange={(e) => setField('email', e.target.value)} />
            </div>

            <div className="relative">
              <label className="field-label">Password</label>
              <input className="form-input pr-20" type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setField('password', e.target.value)} />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-[36px] text-[.68rem] font-semibold tracking-[.1em] text-(--orange)"
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>

            {error && <p className="text-[.8rem] text-[#ff7a4a]">{error}</p>}

            <button type="button" disabled={loading} onClick={submit} className="btn btn-submit">
              {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
            </button>

            <p className="text-center text-[.7rem] text-[rgba(255,255,255,.52)]">By joining you agree to our Terms & Privacy Policy.</p>
          </div>
        </div>
      </section>
    </main>
  )
}
