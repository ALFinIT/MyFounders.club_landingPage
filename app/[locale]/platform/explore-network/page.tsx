import React from 'react'
import SocialHomeButtons from '@/components/social-home-buttons'
import StatsContract from '@/components/StatsContract'

export default function ExploreNetworkPage() {
  return (
    <main className="min-h-screen relative bg-black">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/MFC theme.png')" }} aria-hidden />
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      <div className="relative z-10 max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-8 border border-orange-500/20">
          <h1 className="text-3xl font-bold text-white mb-4">Explore Network</h1>
          <p className="text-sm text-muted-foreground mb-4">Discover our network of founders, investors and partners. Connect, collaborate and grow.</p>

          <section className="mt-6 text-white/90 space-y-4">
            <p>We partner with founders across industries to create meaningful connections and curate opportunities that accelerate growth. Use this page to surface profiles, events and partner opportunities.</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>Founder profiles and success stories</li>
              <li>Partner organisations and resources</li>
              <li>Networking events and curated introductions</li>
            </ul>
          </section>
        </div>
      </div>
      <SocialHomeButtons />
      <StatsContract />
    </main>
  )
}
