import React from 'react'
import SocialHomeButtons from '@/components/social-home-buttons'

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen relative bg-black">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/MFC theme.png')" }} aria-hidden />
      <div className="absolute inset-0 bg-black/60" aria-hidden />

      <div className="relative z-10 max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-2xl p-8 border border-orange-500/20">
          <h1 className="text-3xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-4">Our commitment to your privacy and how we process your data.</p>

          <section className="mt-6 text-white/90 space-y-4">
            <p>We collect only the data necessary to operate our services and will never share personal data without consent except where required by law.</p>
            <h3 className="font-semibold mt-4">Data We Collect</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>Contact details for communication and verification</li>
              <li>Application data to evaluate participation</li>
              <li>Usage metrics to improve our product</li>
            </ul>
          </section>
        </div>
      </div>
      <SocialHomeButtons />
    </main>
  )
}
