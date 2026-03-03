'use client';

import { useEffect, useRef } from 'react';

const features = [
  {
    no: '01',
    title: 'AI Next-Step Engine',
    body: 'Tell us your stage, sector, and goal. Get your 3-5 best-fit matches - not 300 links. The right accelerator, grant, or investor. Clear. Instant. Free.',
    icon: (
      <>
        <circle cx="20" cy="20" r="13" opacity=".35" />
        <path d="M20 14v6l4.8 3.8" />
        <circle cx="20" cy="20" r="1.8" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    no: '02',
    title: 'GCC Jurisdiction Navigator',
    body: 'Compare free zones, licensing paths, and incentives across all 6 GCC countries. Get a recommended launch stack - the right zone, bank, and program - in minutes.',
    icon: (
      <>
        <rect x="9" y="9" width="22" height="22" rx="2" opacity=".35" />
        <path d="M9 17h22M9 24h22M17 9v22M24 9v22" />
      </>
    ),
  },
  {
    no: '03',
    title: 'Verified Founder Communities',
    body: "Join curated, trusted networks built for GCC founders. Masterminds, events, peer intros - the room that doesn't ask for $1M revenue to get in.",
    icon: (
      <>
        <circle cx="15.5" cy="20" r="5.2" opacity=".4" />
        <circle cx="24.5" cy="20" r="5.2" opacity=".4" />
        <path d="M19 20h2" strokeWidth="2" />
      </>
    ),
  },
  {
    no: '04',
    title: 'Investor & Grant Matching',
    body: 'AI matches you with investors aligned to your thesis, stage, and sector. 3,027 active GCC investors in the database. Apply to the right grants before deadlines close.',
    icon: (
      <>
        <path d="M12.5 28.5h15" opacity=".4" />
        <path d="M14 28l6-14 6 14" />
        <path d="M16.5 22h7" opacity=".55" />
        <circle cx="20" cy="12" r="2.5" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    no: '05',
    title: 'Trusted Supplier Network',
    body: "Find vetted legal, banking, HR, and operational partners who've worked with Gulf founders before. No more unreliable referrals found on LinkedIn at midnight.",
    icon: (
      <>
        <path d="M8 20c3.1-4.2 7.1-6.3 12-6.3s8.9 2.1 12 6.3c-3.1 4.2-7.1 6.3-12 6.3S11.1 24.2 8 20z" opacity=".35" />
        <circle cx="20" cy="20" r="3.2" fill="currentColor" stroke="none" />
        <path d="M20 9v3M20 28v3M9 20h3M28 20h3" />
      </>
    ),
  },
  {
    no: '06',
    title: 'Global Corridor Access',
    body: 'Build locally. Scale globally. Curated pathways to London, Singapore, Tokyo, and San Francisco - for Gulf founders ready to take their next step beyond the region.',
    icon: (
      <>
        <path d="M8 22c3.2-5 6.2-5.2 9.4-.2 2.8 4.4 5.8 4.2 8.6-.4" />
        <circle cx="8" cy="22" r="2" fill="currentColor" stroke="none" />
        <circle cx="30" cy="21.4" r="2" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

export function WhatMFCDoesSection() {
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
    <section id="what-we-do" ref={ref} className="section-block px-[5%] py-[100px]">
      <div className="site-shell">
        <div className="value-head flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
          <div className="reveal">
            <p className="section-lead">What MFC Does</p>
            <h2 className="section-title mt-5 max-w-[720px]">
              One platform. Every resource <span className="text-(--orange)">you need.</span>
            </h2>
            <div className="accent-bar mt-6" />
          </div>
          <p className="copy reveal d1 max-w-[300px] text-[.88rem] xl:text-right">
            Stop spending months on dead ends. MFC maps the entire GCC ecosystem so you move in days, not quarters.
          </p>
        </div>

        <div className="value-grid mt-10 grid grid-cols-1 gap-[2px] md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, i) => (
            <article
              key={feature.no}
              className={`group relative overflow-hidden border border-[rgba(255,255,255,.055)] bg-[rgba(255,255,255,.02)] px-[22px] py-[28px] transition duration-300 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:w-full before:origin-left before:scale-x-0 before:bg-(--orange) before:transition before:duration-300 hover:-translate-y-1 hover:border-[rgba(255,91,35,.14)] hover:bg-[rgba(255,91,35,.03)] hover:before:scale-x-100 reveal d${Math.min(i + 1, 5)}`}
            >
              <p className="font-(--font-display) text-[.67rem] font-bold uppercase tracking-[0.2em] text-(--orange)">{feature.no}</p>
              <svg viewBox="0 0 40 40" className="mt-4 h-[38px] w-[38px] text-(--orange)" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                {feature.icon}
              </svg>
              <h3 className="mt-4 font-(--font-display) text-[1.05rem] font-bold leading-[1.3] text-white">{feature.title}</h3>
              <p className="mt-3 font-(--font-sans) text-[.85rem] font-light leading-[1.72] text-[#d6d6d6]">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

