import type { Metadata, Viewport } from 'next';
import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero';
import { OriginStorySection } from '@/components/origin-story';
import { GulfEcosystemSection } from '@/components/gulf-ecosystem';
import { WhatMFCDoesSection } from '@/components/what-mfc-does';
import { ProblemWeSolveSection } from '@/components/problem-we-solve';
import { WhoItsForSection } from '@/components/who-its-for';
import { HowItWorksSection } from '@/components/how-it-works';
import { WaitlistFormSection } from '@/components/waitlist-form';
import { NewsletterSection } from '@/components/newsletter';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'MyFounders.Club - Build in the Gulf, Wired to the World',
  description:
    "The Gulf's AI-powered startup intelligence platform. One source of truth for 6 GCC countries - find the right jurisdiction, program, investor, accelerator, or grant. Built for founders who are done guessing.",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function Home() {
  return (
    <main className="graph-grid-dim relative bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <OriginStorySection />
      <GulfEcosystemSection />
      <WhatMFCDoesSection />
      <ProblemWeSolveSection />
      <WhoItsForSection />
      <HowItWorksSection />
      <WaitlistFormSection />
      <NewsletterSection />
      <Footer />
    </main>
  );
}
