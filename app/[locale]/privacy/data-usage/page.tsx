import React from 'react'
import SocialHomeButtons from '@/components/social-home-buttons'

export default function DataUsagePage() {
  return (
    <main className="min-h-screen relative bg-black">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/MFC theme.png')" }} aria-hidden />
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      <div className="relative z-10 max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-8 border border-orange-500/20">
          <h1 className="text-3xl font-bold text-white mb-4">Data Usage</h1>
          <p className="text-sm text-muted-foreground mb-4">How we use the data we collect.</p>

          <section className="mt-6 text-white/90 space-y-4">
            <p>We use your data to evaluate applications, personalise communications, and measure platform performance.</p>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>Application review and selection</li>
              <li>Service improvement and analytics</li>
              <li>Communications about programs and events</li>
            </ul>
          </section>
        </div>
      </div>
      <SocialHomeButtons />
    </main>
  )
}
