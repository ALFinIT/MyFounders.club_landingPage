'use client';

import type { FormEvent } from 'react';
import { useEffect, useMemo, useState } from 'react';
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

const speakers = [
  {
    name: 'Amal Al-Harbi',
    role: 'General Partner, Red Sand Ventures',
    topic: 'Cross-border capital strategy for GCC scale-ups',
  },
  {
    name: 'Yousef Al-Mansoori',
    role: 'Former Growth Lead, Regional Unicorn',
    topic: 'How to build expansion systems before Series B',
  },
  {
    name: 'Rana Al-Kaabi',
    role: 'Director, Innovation Policy Council',
    topic: 'Policy pathways that reduce founder friction',
  },
  {
    name: 'Omar H. Qureshi',
    role: 'Head of Platform, MENA Infrastructure Fund',
    topic: 'Operator frameworks for resilient startup execution',
  },
];

const sponsors = ['ADGM', 'Hub71', 'DIFC Innovation Hub', 'Monshaat', 'QDB', 'Bahrain EDB', 'Oman Tech Fund', 'Invest Kuwait'];

type FormState = {
  fullName: string;
  email: string;
  company: string;
  role: string;
  track: string;
  notes: string;
};

const initialForm: FormState = {
  fullName: '',
  email: '',
  company: '',
  role: '',
  track: '',
  notes: '',
};

export default function EventsPage() {
  const [seconds, setSeconds] = useState(47 * 60);
  const [spots, setSpots] = useState(312);
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : prev));
    }, 1000);

    const spotTicker = setInterval(() => {
      setSpots((prev) => {
        if (prev > 302 && Math.random() < 0.25) {
          return prev - 1;
        }
        return prev;
      });
    }, 9000);

    return () => {
      clearInterval(timer);
      clearInterval(spotTicker);
    };
  }, []);

  const timerLabel = useMemo(() => {
    const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
    const secs = String(seconds % 60).padStart(2, '0');
    return `00 : ${mins} : ${secs}`;
  }, [seconds]);

  const claimed = 500 - spots;

  const setField = (name: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    if (submitError) setSubmitError('');
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};
    if (!form.fullName.trim()) nextErrors.fullName = 'Full name is required.';
    if (!form.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      nextErrors.email = 'Enter a valid email address.';
    }
    if (!form.company.trim()) nextErrors.company = 'Company name is required.';
    if (!form.role.trim()) nextErrors.role = 'Role is required.';
    if (!form.track.trim()) nextErrors.track = 'Please select an event track.';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setSubmitted(false);
    setSubmitError('');
    setSaving(true);
    try {
      const response = await fetch('/api/events/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || 'Unable to submit registration.');
      setSubmitted(true);
      setForm(initialForm);
      setErrors({});
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Unable to submit registration.');
    } finally {
      setSaving(false);
    }
  };

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

      <section className="section-block relative overflow-hidden px-[5%] pb-[44px] pt-[50px]">
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
              <Link href="#registration" className="btn btn-primary btn-primary-lg">
                Request Invitation
              </Link>
              <Link href="/survey" className="btn btn-outline btn-outline-lg">
                Start Survey
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

      <section className="section-block px-[5%] pb-[62px]">
        <div className="site-shell">
          <div className="countdown-inner panel-urgency-hover">
            <div>
              <div className="timer-label">Offer closes in</div>
              <div className="timer-digits">{timerLabel}</div>
            </div>
            <div className="spots-left ml-auto text-right">
              <span className="text-(--orange)">{claimed}</span> founders claimed access today
              <br />
              <span className="text-[10px] text-[rgba(204,204,204,.6)]">{spots} spots left before waitlist</span>
            </div>
          </div>
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
                <p className="font-(--font-mono) text-[.69rem] uppercase tracking-[.14em] text-(--orange)">{item.day}</p>
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
          <p className="section-lead">Featured Speakers</p>
          <h2 className="section-title mt-4">Builders, Allocators, Policymakers.</h2>
          <div className="card-grid mt-8 grid grid-cols-1 gap-[2px] md:grid-cols-2 xl:grid-cols-4">
            {speakers.map((speaker) => (
              <article key={speaker.name} className="glass-card p-6">
                <p className="font-(--font-display) text-[1.05rem] font-bold text-white">{speaker.name}</p>
                <p className="mt-2 text-[.68rem] uppercase tracking-[.12em] text-(--orange)">{speaker.role}</p>
                <p className="copy mt-4 text-[.84rem]">{speaker.topic}</p>
              </article>
            ))}
          </div>

          <div className="mt-10">
            <p className="section-lead">Ecosystem Partners</p>
            <div className="card-grid mt-4 grid grid-cols-2 gap-[2px] sm:grid-cols-4 lg:grid-cols-8">
              {sponsors.map((sponsor) => (
                <div key={sponsor} className="glass-card p-4 text-center font-(--font-mono) text-[.67rem] uppercase tracking-[.1em] text-[rgba(255,255,255,.9)]">
                  {sponsor}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="registration" className="section-block px-[5%] py-[72px]">
        <div className="site-shell glass-card p-7 sm:p-10">
          <p className="section-lead">Registration</p>
          <h2 className="section-title mt-4">Register for Event Allocation</h2>
          <p className="copy mt-4 max-w-[760px]">
            Submit your profile to reserve your place. Our team validates fit by stage, geography, and track before issuing invitation confirmation.
          </p>

          <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit} noValidate>
            <div>
              <label className="field-label" htmlFor="fullName">Full Name</label>
              <input id="fullName" className="form-input" value={form.fullName} onChange={(e) => setField('fullName', e.target.value)} />
              {errors.fullName ? <p className="mt-1 text-[.75rem] text-[#ff7a4a]">{errors.fullName}</p> : null}
            </div>

            <div>
              <label className="field-label" htmlFor="email">Email</label>
              <input id="email" type="email" className="form-input" value={form.email} onChange={(e) => setField('email', e.target.value)} />
              {errors.email ? <p className="mt-1 text-[.75rem] text-[#ff7a4a]">{errors.email}</p> : null}
            </div>

            <div>
              <label className="field-label" htmlFor="company">Company</label>
              <input id="company" className="form-input" value={form.company} onChange={(e) => setField('company', e.target.value)} />
              {errors.company ? <p className="mt-1 text-[.75rem] text-[#ff7a4a]">{errors.company}</p> : null}
            </div>

            <div>
              <label className="field-label" htmlFor="role">Role</label>
              <input id="role" className="form-input" value={form.role} onChange={(e) => setField('role', e.target.value)} placeholder="Founder / CEO / Investor" />
              {errors.role ? <p className="mt-1 text-[.75rem] text-[#ff7a4a]">{errors.role}</p> : null}
            </div>

            <div className="md:col-span-2">
              <label className="field-label" htmlFor="track">Primary Track Interest</label>
              <select id="track" className="form-input" value={form.track} onChange={(e) => setField('track', e.target.value)}>
                <option value="">Select track</option>
                {tracks.map((track) => (
                  <option key={track.title} value={track.title}>
                    {track.title}
                  </option>
                ))}
              </select>
              {errors.track ? <p className="mt-1 text-[.75rem] text-[#ff7a4a]">{errors.track}</p> : null}
            </div>

            <div className="md:col-span-2">
              <label className="field-label" htmlFor="notes">Notes (Optional)</label>
              <textarea
                id="notes"
                className="form-input min-h-28"
                value={form.notes}
                onChange={(e) => setField('notes', e.target.value)}
                placeholder="Share what outcome you want from this event."
              />
            </div>

            <div className="mt-2 flex flex-wrap gap-3 md:col-span-2">
              <button type="submit" disabled={saving} className="btn btn-primary btn-primary-lg disabled:cursor-not-allowed disabled:opacity-70">
                {saving ? 'Submitting...' : 'Submit Registration'}
              </button>
              <Link href="/survey" className="btn btn-outline btn-outline-lg">
                Start Survey
              </Link>
            </div>
          </form>

          {submitError ? <p className="mt-4 text-[.82rem] text-[#ff7a4a]">{submitError}</p> : null}

          {submitted ? (
            <p className="mt-4 border border-[rgba(0,200,150,.35)] bg-[rgba(0,200,150,.1)] px-3 py-2 text-[.84rem] text-[#b8ffe9]">
              Registration submitted. Our team will review and send your allocation update.
            </p>
          ) : null}
        </div>
      </section>

      <Footer />
    </main>
  );
}
