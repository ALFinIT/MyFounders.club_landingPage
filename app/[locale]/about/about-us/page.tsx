import React from 'react'
import SocialHomeButtons from '@/components/social-home-buttons'
import StatsContract from '@/components/StatsContract'

export default function AboutUsPage() {
  return (
    <main className="min-h-screen relative bg-black">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/MFC theme.png')" }} aria-hidden />
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      <div className="relative z-10 max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-8 border border-orange-500/20">
          <h1 className="text-3xl font-bold text-white mb-4">About Us</h1>
          <p className="text-sm text-muted-foreground mb-4">My Founders Club connects founders, investors and partners to accelerate startup growth.</p>

          <section className="mt-6 text-white/90 space-y-4">
            <p>We run cohort-based programs, networking events, and facilitate introductions to investors and partners who can help founders scale.</p>
            <h3 className="font-semibold mt-4">Our Mission</h3>
            <p className="text-sm text-muted-foreground">To support founders from idea to global scale by curating community, capital and opportunities.</p>
          </section>
        </div>
      </div>
      <SocialHomeButtons />
      <StatsContract />
    </main>
  )
}