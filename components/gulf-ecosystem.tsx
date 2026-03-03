'use client';

import { useEffect, useRef } from 'react';

const countries = [
  { code: 'sa', name: 'Saudi Arabia', sub: 'Capital of Gulf Capital', a: '$1.34B', a2: 'Raised H1 2025', b: '1,699+', b2: 'Active Startups', c: '#23', c2: 'Global Digital Rank', tag: 'Vision 2030 - SIDF Tech Fund - Monshaat' },
  {
    code: 'ae',
    name: 'United Arab Emirates',
    sub: 'Global Tech Launchpad',
    a: '$541M',
    a2: 'Across 164 Deals',
    b: '111+',
    b2: 'Unicorns and Growth',
    c: '2M',
    c2: 'Startups by 2031',
    tag: 'D33 Agenda - Hub71 - DIFC - ADGM',
  },
  { code: 'qa', name: 'Qatar', sub: 'Knowledge Economy Pioneer', a: 'QDB', a2: 'Founder Support', b: 'QNV', b2: '2030 Diversification', c: 'AI+', c2: 'R&D Expansion', tag: 'Qatar Foundation - QDB - QSTP' },
  { code: 'bh', name: 'Bahrain', sub: 'Fintech and Financial Hub', a: 'EDB', a2: 'Scale-up Support', b: '0%', b2: 'Corporate Tax Entry', c: '#1', c2: 'Fintech Sandbox', tag: 'Bahrain EDB - Fintech Bay - CBB Sandbox' },
  { code: 'kw', name: 'Kuwait', sub: 'Family Office Capital Hub', a: 'KFAS', a2: 'Startup Programs', b: 'KV', b2: 'Vision 2035', c: 'HNW+', c2: 'Investor Density', tag: 'KFAS - NBK Capital - Kuwait Vision 2035' },
  { code: 'om', name: 'Oman', sub: 'Rising Tech Destination', a: 'OTF', a2: 'Active Deployment', b: 'OV 2040', b2: 'Growth Roadmap', c: 'ITHRAA', c2: 'Market Access', tag: 'Oman Tech Fund - ITHRAA - Oman Vision 2040' },
];

export function GulfEcosystemSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>('.reveal'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('vis');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="gulf" ref={ref} className="section-block relative overflow-hidden border-y border-[rgba(255,77,0,.14)] bg-[rgba(255,255,255,.02)] px-[5%] py-[110px]">
      <div className="pointer-events-none absolute right-[-150px] top-[120px] h-[420px] w-[420px] bg-[radial-gradient(circle,rgba(62,92,94,.22),transparent_70%)]" />
      <div className="site-shell relative z-[2]">
        <div className="six-head grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1fr] xl:items-end">
          <div className="reveal">
            <p className="section-lead">The Gulf Ecosystem</p>
            <h2 className="section-title mt-5">
              <span className="block">Six Countries.</span>
              <span className="block text-(--orange)">One Ecosystem.</span>
              <span className="block">Infinite Reach.</span>
            </h2>
          </div>
          <p className="copy reveal d1 max-w-[520px] justify-self-end text-[.9rem]">
            Access the most dynamic startup markets across the Gulf region. The GCC is not one market - it&apos;s six distinct economies, each with its own regulatory environment, capital pool, and opportunity corridor.
          </p>
        </div>

        <div className="stats-strip card-grid reveal d2 mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['money', 'MENA STARTUP FUNDING', 'H1 2025'],
            ['3027', 'ACTIVE INVESTORS DEPLOYED', 'ACROSS GCC'],
            ['80', 'OF MENA FUNDING SUPPORT', 'FROM GCC REGION'],
            ['400', 'PROGRAMS, GRANTS AND', 'ACCELERATORS MAPPED'],
          ].map(([v, l1, l2]) => (
            <div key={v} className="border border-[rgba(255,91,35,.15)] bg-[rgba(255,91,35,.055)] p-6 text-center">
              <p style={{ fontFamily: 'var(--font-display)' }} className="text-[2.3rem] font-extrabold leading-none text-white">
                {v === 'money' ? (
                  <>
                    <span className="text-(--orange)">$</span>2.1<span className="text-(--orange)">B</span>
                  </>
                ) : null}
                {v === '3027' ? '3,027' : null}
                {v === '80' ? (
                  <>
                    80<span className="text-(--orange)">%</span>
                  </>
                ) : null}
                {v === '400' ? (
                  <>
                    400<span className="text-(--orange)">+</span>
                  </>
                ) : null}
              </p>
              <p className="mt-2 text-[.7rem] uppercase tracking-[.13em] text-[var(--silver)]">{l1}</p>
              <p className="text-[.7rem] uppercase tracking-[.13em] text-[var(--silver)]">{l2}</p>
            </div>
          ))}
        </div>

        <div className="country-grid card-grid reveal d3 mt-9 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {countries.map((country, i) => (
            <article key={country.name} className={`card-base country-card reveal d${Math.min(i + 1, 5)}`}>
              <span className={`fi fi-${country.code} inline-block h-4 w-6`} aria-hidden="true" />
              <h3
                style={{ fontFamily: 'var(--font-display)' }}
                className="mt-2 whitespace-nowrap text-[1.12rem] font-extrabold leading-tight text-white md:text-[1.2rem]"
              >
                {country.name}
              </h3>
              <p className="mt-1 text-[.68rem] uppercase tracking-[.14em] text-(--orange)">{country.sub}</p>
              <div className="mt-5 space-y-2 border-t border-white/10 pt-3">
                <p className="copy flex items-center justify-between text-[.82rem]">
                  <span className="font-semibold text-white">{country.a}</span>
                  <span>{country.a2}</span>
                </p>
                <p className="copy flex items-center justify-between text-[.82rem]">
                  <span className="font-semibold text-white">{country.b}</span>
                  <span>{country.b2}</span>
                </p>
                <p className="copy flex items-center justify-between text-[.82rem]">
                  <span className="font-semibold text-white">{country.c}</span>
                  <span>{country.c2}</span>
                </p>
              </div>
              <span className="teal-badge mt-4">{country.tag}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

