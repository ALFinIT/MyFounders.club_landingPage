'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

type Tab = 'signup' | 'signin'

function AuthPageContent() {
  const searchParams = useSearchParams()
  const initialTab = useMemo<Tab>(() => (searchParams.get('tab') === 'signin' ? 'signin' : 'signup'), [searchParams])
  const [tab, setTab] = useState<Tab>('signup')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<'google' | 'linkedin_oidc' | null>(null)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  })

  const isSignup = tab === 'signup'

  useEffect(() => {
    setTab(initialTab)
  }, [initialTab])

  const setField = (name: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }))
    if (error) setError('')
  }

  const startOAuth = async (provider: 'google' | 'linkedin_oidc') => {
    setError('')
    setOauthLoading(provider)
    try {
      const supabase = createClient()
      const { error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: provider as 'google' | 'linkedin_oidc',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (oauthError) throw oauthError
    } catch (e) {
      setOauthLoading(null)
      setError(e instanceof Error ? e.message : 'Unable to continue with OAuth.')
    }
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
      window.location.replace(data.redirectTo ?? '/profile')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Unable to continue.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative h-[100dvh] overflow-hidden bg-[#050505] text-(--cloud)">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_38%_34%,rgba(255,91,35,.12),transparent_52%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,91,35,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,91,35,.05)_1px,transparent_1px)] bg-[size:48px_48px] opacity-55" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_14%,rgba(12,22,26,.7),transparent_48%)]" />

      <section className="site-shell relative z-[2] grid h-full grid-cols-1 items-center gap-2 py-2 lg:grid-cols-[1.12fr_.88fr]">
        <div className="glass-card-soft hidden p-6 lg:block">
          <span className="orange-badge">
            <span className="beta-dot" />
            Beta Access - Spots Limited
          </span>

          <div className="mt-5">
            <Image src="/Full_logo_mfc.png" alt="MyFounders.Club" width={244} height={58} priority />
          </div>
          <h1 className="mt-5 font-(--font-display) text-[clamp(1.9rem,3.5vw,3.2rem)] leading-[.94] tracking-[-.03em] text-white">
            <span className="text-(--orange)">Hello</span>!
            <br />
            It's <span className="text-(--orange)">good</span> to
            <br />
            see you <span className="text-(--orange)">again</span>
          </h1>

          <div className="card-grid mt-6 grid grid-cols-1">
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

          <div className="stats-strip card-grid mt-5 grid grid-cols-3">
            {[
              ['4.5B', 'GCC CAPITAL'],
              ['523%', 'YOY GROWTH'],
              ['63K', 'STARTUPS'],
            ].map(([value, label]) => {
              const match = value.match(/^([\d.]+)(.*)$/)
              const numeric = match?.[1] ?? value
              const suffix = match?.[2] ?? ''
              return (
                <div key={value} className="border border-[rgba(255,91,35,.16)] bg-[rgba(255,91,35,.06)] p-4 text-center">
                  <p className="font-(--font-display) text-[1.6rem] font-extrabold">
                    <span className="text-white">{numeric}</span>
                    <span className="text-(--orange)">{suffix}</span>
                  </p>
                  <p className="mt-1 text-[.62rem] tracking-[.12em] text-[rgba(255,255,255,.74)]">{label}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-5 border border-[rgba(62,92,94,.4)] bg-[rgba(62,92,94,.12)] p-3">
            <p className="font-(--font-display) text-[.78rem] uppercase tracking-[.14em] text-[#9fd3d5]">Verified Members Only</p>
            <p className="mt-2 text-[.83rem] text-[rgba(255,255,255,.82)]">Every member is reviewed by our team. Your network is curated, not crowdsourced.</p>
          </div>
        </div>

        <div className="glass-card-strong mx-auto w-full max-w-[470px] p-5 sm:p-6">
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

          <h2 className="mt-3 font-(--font-display) text-[clamp(1.25rem,2.1vw,1.7rem)] font-extrabold tracking-[-.02em] text-white">Join MyFounders.Club</h2>
          <p className="copy mt-2 text-[.8rem]">Free access. No credit card. The Gulf's founder community awaits.</p>
          <p className="mt-2 text-[.72rem] tracking-[.07em] text-[rgba(255,255,255,.66)]">
            {isSignup ? (
              <>
                Already have an account?{' '}
                <button type="button" onClick={() => setTab('signin')} className="font-semibold uppercase text-(--orange) hover:text-[#ff7a4a]">
                  Sign In
                </button>
              </>
            ) : (
              <>
                No account?{' '}
                <button type="button" onClick={() => setTab('signup')} className="font-semibold uppercase text-(--orange) hover:text-[#ff7a4a]">
                  Create Account
                </button>{' '}
                {' · '}
                <button type="button" onClick={() => setTab('signup')} className="font-semibold uppercase text-(--orange) hover:text-[#ff7a4a]">
                  Sign Up
                </button>
              </>
            )}
          </p>

          <div className="mt-3 grid grid-cols-1 gap-2">
            <button
              className="border border-[rgba(255,255,255,.1)] bg-transparent px-4 py-2 text-[.8rem] text-(--cloud) hover:border-[rgba(255,91,35,.35)]"
              type="button"
              onClick={() => void startOAuth('google')}
              disabled={Boolean(oauthLoading)}
            >
              {oauthLoading === 'google' ? 'Please wait...' : 'Continue with Google'}
            </button>
            <button
              className="border border-[rgba(255,255,255,.1)] bg-transparent px-4 py-2 text-[.8rem] text-(--cloud) hover:border-[rgba(255,91,35,.35)]"
              type="button"
              onClick={() => void startOAuth('linkedin_oidc')}
              disabled={Boolean(oauthLoading)}
            >
              {oauthLoading === 'linkedin_oidc' ? 'Please wait...' : 'Continue with LinkedIn'}
            </button>
          </div>

          <div className="my-3 h-px bg-[rgba(255,255,255,.08)]" />

          <div className="mt-1">
            <div className="space-y-3">
              <div className={`grid grid-cols-1 gap-3 sm:grid-cols-2 ${isSignup ? 'opacity-100' : 'pointer-events-none opacity-0'}`}>
                <div>
                  <label className="field-label">First Name</label>
                  <input className="form-input" value={form.firstName} onChange={(e) => setField('firstName', e.target.value)} />
                </div>
                <div>
                  <label className="field-label">Last Name</label>
                  <input className="form-input" value={form.lastName} onChange={(e) => setField('lastName', e.target.value)} />
                </div>
              </div>

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

              <button type="button" disabled={loading || Boolean(oauthLoading)} onClick={submit} className="btn btn-submit">
                {loading ? 'Please wait...' : isSignup ? 'Create Account' : 'Sign In'}
              </button>

              <p className="text-center text-[.7rem] text-[rgba(255,255,255,.52)]">
                By joining you agree to our{' '}
                <Link href="/terms-and-conditions" className="text-[rgba(255,255,255,.75)] hover:text-(--orange)">
                  Terms
                </Link>{' '}
                &amp;{' '}
                <Link href="/privacy-policy" className="text-[rgba(255,255,255,.75)] hover:text-(--orange)">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#050505]" />}>
      <AuthPageContent />
    </Suspense>
  )
}
