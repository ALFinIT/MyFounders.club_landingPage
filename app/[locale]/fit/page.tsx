"use client"

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import SocialHomeButtons from '@/components/social-home-buttons'

const FIT_GCC = [
  "You're past the idea stage.",
  "You're based in the Gulf.",
  'You want clarity, not more events.',
  'You value warm introductions over cold outreach.',
  "You're ready for honest feedback.",
]

const FIT_EXPAND = [
  "You've already proven your model.",
  'The Gulf is your next move.',
  'You want to enter the right market first.',
  'You want trusted operators on the ground.',
  "You don't want to waste 12–18 months figuring it out alone.",
]

const NOT_A_FIT = [
  "You're still in idea-only mode.",
  "You're looking for free advice without action.",
  'You want visibility more than progress.',
  'You expect shortcuts.',
]

export default function FitPage() {
  const router = useRouter()

  return (
    <>
      <Navbar />
      <SocialHomeButtons />
      <main className="w-full min-h-screen bg-page">
        <div className="max-w-4xl mx-auto py-20 px-6">
          <div className="rounded-3xl p-10 md:p-16" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.72), rgba(0,0,0,0.85))' }}>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Fit</h1>
            <h2 className="text-lg text-white/90 mb-6">Is This For You?</h2>

            <p className="text-white/90 mb-6">MyFounders.Club is built for serious founders. Not browsers. Not spectators.</p>

            <h3 className="text-xl font-semibold text-white mb-3">You’re a Fit If…</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-white/90">
              <ul className="space-y-3">
                {FIT_GCC.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
              <ul className="space-y-3">
                {FIT_EXPAND.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>

            <h3 className="text-xl font-semibold text-white mt-8 mb-3">Not a Fit If…</h3>
            <ul className="text-white/90 space-y-2">
              {NOT_A_FIT.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold text-white mt-8 mb-3">What Happens After You Apply?</h3>
            <ol className="list-decimal list-inside text-white/90 space-y-2">
              <li>Fill in your founder profile.</li>
              <li>We review it.</li>
              <li>If aligned, you’re invited in.</li>
              <li>You join the private WhatsApp group.</li>
              <li>You receive your first clear next step.</li>
            </ol>

            <h3 className="text-xl font-semibold text-white mt-8 mb-3">What You Get</h3>
            <ul className="text-white/90 space-y-2">
              <li>Private founder network</li>
              <li>Weekly founder sessions</li>
              <li>Clear next-step guidance</li>
              <li>Access to investors and ecosystem partners</li>
              <li>Core access is free. Always.</li>
            </ul>

            <div className="mt-8 flex gap-4">
              <Link href="/application" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold">Request Access</Link>
              <button onClick={() => router.back()} className="text-white/80">Back</button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

