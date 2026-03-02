'use client';

import type { FormEvent } from 'react';
import { useState } from 'react';

const COUNTRIES = [
  'UAE Dubai',
  'UAE Abu Dhabi',
  'Saudi Arabia Riyadh',
  'Saudi Arabia Jeddah',
  'Qatar Doha',
  'Bahrain',
  'Kuwait',
  'Oman',
  'United Kingdom',
  'Europe',
  'USA/Canada',
  'Asia Pacific',
  'Other',
];

const STAGES = [
  'Idea Stage',
  'Pre-Seed',
  'Seed',
  'Series A',
  'Series B+',
  'Investor/Fund',
  'Corporate/Enterprise',
  'Government/Ecosystem Partner',
];

const GOALS = [
  'Navigate GCC programs/grants/accelerators',
  'Find the right free zone/jurisdiction',
  'Match with investors',
  'Join a verified founder community',
  'Expand my startup into the Gulf',
  'Find trusted local suppliers and partners',
  'Access global corridors from the Gulf',
];

export function WaitlistFormSection() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    stage: '',
    goal: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed');
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="waitlist" className="section-block relative overflow-hidden px-[5%] py-[110px]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_50%_0%,rgba(255,91,35,.07),transparent_58%)]" />

      <div className="site-shell relative z-[2] mx-auto max-w-[660px] text-center">
        <p className="orange-badge mx-auto">
          <span className="beta-dot" />
          Beta Waitlist - Spots Limited
        </p>

        <h2 className="mt-6 font-(--font-display) text-[clamp(1.9rem,3.5vw,2.9rem)] font-extrabold leading-[1.02]">
          <span className="block text-white">Get early access.</span>
          <span className="block text-(--orange)">For free.</span>
        </h2>

        <p className="mx-auto mt-5 max-w-[560px] text-[0.93rem] leading-[1.72] font-light text-(--silver)">
          Join founders already on the waitlist. First in gets full platform access - no payment required.
          <br />
          Just your ambition and an honest profile.
        </p>

        <div className="mt-8 border border-[rgba(255,255,255,.09)] bg-[rgba(255,255,255,.025)] p-[34px] text-left">
          {success ? (
            <div className="py-8 text-center animate-[fadeUp_.45s_ease_both]">
              <div className="mx-auto flex h-[54px] w-[54px] items-center justify-center rounded-full border border-[var(--orange)] text-[1.35rem] font-bold text-(--orange)">
                {'\u2713'}
              </div>
              <h3 className="mt-5 font-(--font-display) text-[1.55rem] font-extrabold text-white">You&apos;re on the list.</h3>
              <p className="mx-auto mt-3 max-w-[430px] text-[.9rem] leading-[1.7] text-(--silver)">
                Thanks for joining. We&apos;ll email next steps and event invites soon. Follow us on LinkedIn for launch updates.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-row grid grid-cols-1 gap-[10px] sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="field-label text-center sm:text-left">
                    First Name
                  </label>
                  <input id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Katerina" required className="form-input" />
                </div>
                <div>
                  <label htmlFor="lastName" className="field-label text-center sm:text-left">
                    Last Name
                  </label>
                  <input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Hayes" required className="form-input" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="field-label text-center sm:text-left">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  required
                  className="form-input"
                />
              </div>

              <div className="form-row grid grid-cols-1 gap-[10px] sm:grid-cols-2">
                <div>
                  <label htmlFor="country" className="field-label text-center sm:text-left">
                    Your Base
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className={`form-input ${formData.country ? 'text-[var(--orange)]' : 'text-white'}`}
                  >
                    <option value="">Select country</option>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="stage" className="field-label text-center sm:text-left">
                    Startup Stage
                  </label>
                  <select
                    id="stage"
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    required
                    className={`form-input ${formData.stage ? 'text-[var(--orange)]' : 'text-white'}`}
                  >
                    <option value="">Select stage</option>
                    {STAGES.map((stage) => (
                      <option key={stage} value={stage}>
                        {stage}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="goal" className="field-label text-center sm:text-left">
                  Primary Goal
                </label>
                <select
                  id="goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  required
                  className={`form-input ${formData.goal ? 'text-[var(--orange)]' : 'text-white'}`}
                >
                  <option value="">What brings you to MFC?</option>
                  {GOALS.map((goal) => (
                    <option key={goal} value={goal}>
                      {goal}
                    </option>
                  ))}
                </select>
              </div>

              <button type="submit" disabled={loading} className="btn btn-submit mt-2 disabled:opacity-70">
                {loading ? 'Submitting...' : "Join the Beta Waitlist - It's Free ->"}
              </button>

              <p className="text-center text-[0.72rem] text-[rgba(204,204,204,.6)]">
                No payment required. No spam. Early access when the platform opens.
              </p>

              {error && <p className="text-center text-[.82rem] text-red-400">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
