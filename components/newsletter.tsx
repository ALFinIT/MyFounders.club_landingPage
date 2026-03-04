'use client';

import type { FormEvent } from 'react';
import { useRef, useState } from 'react';

export function NewsletterSection() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const normalizedEmail = email.trim();
    if (!normalizedEmail.includes('@')) {
      inputRef.current?.focus();
      return;
    }
    setLoading(true);
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedEmail }),
      });
      if (!response.ok) throw new Error('Failed');
      setEmail('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section-block border-t border-[rgba(255,255,255,.055)] px-[5%] py-[68px]">
      <div className="site-shell nl-inner grid grid-cols-1 gap-6 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="font-(--font-display) text-[clamp(1.35rem,5vw,1.6rem)] font-bold text-white">
            The Gulf <span className="text-(--orange)">Pulse</span>
          </p>
          <p className="copy mt-2 text-[.85rem] sm:text-[.9rem]">
            Weekly ecosystem intelligence: funding rounds, regulatory shifts, and new programs across GCC. Every Tuesday. No noise.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="newsletter-form flex w-full flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="form-input newsletter-input w-full flex-1"
          />
          <button type="submit" disabled={loading} className="btn btn-primary w-full whitespace-nowrap sm:w-auto sm:min-w-[190px] disabled:opacity-70">
            {loading ? 'Sending...' : 'Subscribe Free'}
          </button>
        </form>
      </div>
    </section>
  );
}

