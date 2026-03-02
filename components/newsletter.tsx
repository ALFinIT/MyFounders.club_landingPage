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
          <p className="font-(--font-display) text-[1.6rem] font-bold text-white">
            The Gulf <span className="text-(--orange)">Pulse</span>
          </p>
          <p className="copy mt-2 text-[.85rem]">
            Weekly ecosystem intelligence - funding rounds, regulatory shifts, programs opening. Every Tuesday morning.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex w-full max-w-[520px] items-center gap-2">
          <input
            ref={inputRef}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="form-input min-w-0 flex-1"
          />
          <button type="submit" disabled={loading} className="nl-btn min-w-[160px] disabled:opacity-70">
            {loading ? 'Sending...' : 'Subscribe Free'}
          </button>
        </form>
      </div>
    </section>
  );
}

