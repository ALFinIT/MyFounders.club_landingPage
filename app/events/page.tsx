import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const tracks = [
  {
    title: 'Sovereign Capital Rooms',
    desc: 'Closed-door sessions with SWFs, regional family offices, and global growth investors deploying into GCC corridors.',
  },
  {
    title: 'Jurisdiction & Expansion Clinics',
    desc: 'Operator-first guidance on entity setup, licensing routes, and cross-border entry playbooks for all six GCC markets.',
  },
  {
    title: 'Founder Mastermind Tables',
    desc: 'Curated peer groups by stage and sector. Practical problem-solving with founders building the same journey you are.',
  },
  {
    title: 'Policy & Platform Briefings',
    desc: 'Direct intelligence on grants, programs, regulatory updates, and platform shifts affecting startup execution in 2026-2028.',
  },
];

const agenda = [
  {
    day: 'DAY 01',
    title: 'Private Capital & Market Access',
    bullets: ['SWF deployment outlook', 'Founder-investor matching rooms', 'Entry strategy by GCC market'],
  },
  {
    day: 'DAY 02',
    title: 'Scaling Systems & Regional Expansion',
    bullets: ['Expansion legal stack', 'Talent architecture for scale', 'Growth playbooks from top operators'],
  },
  {
    day: 'DAY 03',
    title: 'Policy, Partnerships & Future Signals',
    bullets: ['Government collaboration tracks', 'Sector-specific opportunity maps', 'Founder strategic roundtables'],
  },
];

export default function EventsPage() {
  return (
    <main className="graph-grid-dim relative bg-background text-foreground">
      <Navbar />

      <section className="section-block border-b border-[rgba(255,91,35,.2)] px-[5%] pb-3 pt-[92px]">
        <div className="site-shell flex flex-wrap items-center justify-between gap-3">
          <p className="font-(--font-mono) text-[.66rem] uppercase tracking-[.14em] text-[rgba(255,255,255,.82)]">
            Limited founder allocations live now. First-confirmed founders receive priority access.
          </p>
          <p className="font-(--font-display) text-[.78rem] uppercase tracking-[.12em] text-(--orange)">MFC Events Desk 2026-2028</p>
        </div>
      </section>

      <section className="section-block relative overflow-hidden px-[5%] pb-[60px] pt-[50px]">
        <div className="pointer-events-none absolute -right-20 top-8 h-70 w-70 bg-[radial-gradient(circle,rgba(255,91,35,.16),transparent_66%)]" />
        <div className="site-shell relative z-[1] grid grid-cols-1 gap-9 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="section-lead">Event Access</p>
            <h1 className="hero-title mt-5 text-white">
              <span className="block">Elite Rooms.</span>
              <span className="block text-(--orange)">Real Allocation.</span>
              <span className="block">GCC Decision Tables.</span>
            </h1>
            <p className="hero-sub mt-6 max-w-[760px]">
              MyFounders.Club events are built for founders, investors, and ecosystem operators shaping the next decade of Gulf innovation. No generic conference format.
              High-signal briefings, curated investor access, and practical expansion intelligence across all six GCC markets.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/auth" className="btn btn-primary btn-primary-lg">
                Request Invitation
              </Link>
              <Link href="/survey" className="btn btn-outline btn-outline-lg">
                Complete Founder Survey
              </Link>
            </div>
          </div>

          <aside className="glass-card p-6 sm:p-7">
            <p className="section-lead">Flagship Summit</p>
            <h2 className="mt-4 text-[clamp(1.55rem,2.4vw,2rem)]">
              Future Innovation & Investment Forum
              <span className="block text-(--orange)">Abu Dhabi 2028</span>
            </h2>
            <div className="mt-5 space-y-3 border-t border-[rgba(255,255,255,.09)] pt-4 text-[.86rem] text-[rgba(232,232,232,.92)]">
              <p className="flex items-center justify-between">
                <span className="text-[rgba(204,204,204,.78)]">Venue</span>
                <span>Abu Dhabi Global Market District</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-[rgba(204,204,204,.78)]">Audience</span>
                <span>Founders, SWFs, VCs, Policymakers</span>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-[rgba(204,204,204,.78)]">Pass Type</span>
                <span className="text-(--orange)">Invitation Priority</span>
              </p>
            </div>
            <p className="mt-5 border border-[rgba(255,91,35,.25)] bg-[rgba(255,91,35,.08)] px-3 py-2 font-(--font-mono) text-[.69rem] uppercase tracking-[.12em] text-[rgba(255,255,255,.92)]">
              Ticket Benchmark: 92,500+ Value
            </p>
          </aside>
        </div>
      </section>

      <section className="section-block border-y border-[rgba(255,255,255,.06)] bg-[rgba(255,255,255,.02)] px-[5%] py-[58px]">
        <div className="site-shell">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="section-lead">Event Tracks</p>
              <h2 className="section-title mt-4">Four Rooms to Execution Clarity.</h2>
            </div>
            <p className="copy max-w-[560px] text-[.86rem]">
              Every track is built for practical outcomes: capital, partnerships, jurisdiction strategy, and founder operating support.
            </p>
          </div>

          <div className="card-grid grid grid-cols-1 gap-[2px] md:grid-cols-2">
            {tracks.map((track) => (
              <article key={track.title} className="panel-urgency-hover glass-card p-7">
                <h3 className="text-[1.34rem]">{track.title}</h3>
                <p className="copy mt-3">{track.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block px-[5%] py-[62px]">
        <div className="site-shell">
          <p className="section-lead">Summit Agenda</p>
          <h2 className="section-title mt-4">Three-Day Editorial Program</h2>
          <div className="card-grid mt-8 grid grid-cols-1 gap-[2px] lg:grid-cols-3">
            {agenda.map((item) => (
              <article key={item.day} className="glass-card p-7">
                <p className="font-(--font-mono) text-[.69rem] uppercase tracking-[.14em] text-(--orange)">
                  {item.day}
                </p>
                <h3 className="mt-3 text-[1.2rem]">{item.title}</h3>
                <ul className="mt-4 space-y-2 text-[.86rem] text-[rgba(214,214,214,.95)]">
                  {item.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="mt-[2px] h-1.5 w-1.5 flex-shrink-0 bg-(--orange)" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block border-y border-[rgba(255,91,35,.1)] bg-[rgba(255,91,35,.04)] px-[5%] py-[62px]">
        <div className="site-shell">
          <p className="section-lead">Access Tiers</p>
          <h2 className="section-title mt-4">Priority. Premium. Private.</h2>
          <div className="card-grid mt-8 grid grid-cols-1 gap-[2px] md:grid-cols-3">
            <article className="glass-card p-7">
              <p className="font-(--font-mono) text-[.68rem] uppercase tracking-[.12em] text-(--orange)">Founder Priority</p>
              <h3 className="mt-3 text-[1.2rem]">Beta Member Allocation</h3>
              <p className="copy mt-3">Reserved for active founders completing survey + profile. Includes summit queue priority and closed-room eligibility.</p>
            </article>
            <article className="glass-card p-7">
              <p className="font-(--font-mono) text-[.68rem] uppercase tracking-[.12em] text-[#00c896]">Investor Access</p>
              <h3 className="mt-3 text-[1.2rem]">Capital Partner Pass</h3>
              <p className="copy mt-3">Family offices, SWFs, and VCs can request invitation-only dealflow rooms with stage, sector, and jurisdiction filters.</p>
            </article>
            <article className="glass-card p-7">
              <p className="font-(--font-mono) text-[.68rem] uppercase tracking-[.12em] text-[#00aaff]">Policy Circle</p>
              <h3 className="mt-3 text-[1.2rem]">Government & Platform Briefing</h3>
              <p className="copy mt-3">Public and private ecosystem operators align around startup enablement, cross-border execution, and 2030+ policy priorities.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section-block px-[5%] py-[72px]">
        <div className="site-shell glass-card p-7 sm:p-10">
          <p className="section-lead">Final Step</p>
          <h2 className="section-title mt-4">Secure Your Event Priority</h2>
          <p className="copy mt-4 max-w-[760px]">
            Submit your founder profile and we will map your best-fit track, intros, and room allocations. This is a curated access model, not open-ticket registration.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/auth" className="btn btn-primary btn-primary-lg">
              Get Early Access
            </Link>
            <Link href="/#waitlist" className="btn btn-outline btn-outline-lg">
              Join Waitlist
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
