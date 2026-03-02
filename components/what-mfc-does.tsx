'use client';

import { useEffect, useRef } from 'react';

const features = [
  {
    no: '01',
    title: 'AI Next-Step Engine',
    body: 'Tell us your stage, sector, and goal. Get your 3-5 best-fit matches - not 300 links.',
    icon: <path d="M20 11v9l5 3m-5-3a2 2 0 100 4 2 2 0 000-4z" />,
  },
  {
    no: '02',
    title: 'GCC Jurisdiction Navigator',
    body: 'Compare free zones, licensing paths, and incentives across all 6 GCC countries in minutes.',
    icon: <path d="M10 12h20M10 20h20M10 28h20M20 10v20" />,
  },
  {
    no: '03',
    title: 'Verified Founder Communities',
    body: "Join curated, trusted networks built for GCC founders. The room that doesn't ask for $1M revenue.",
    icon: <path d="M13 24a5 5 0 015-5h4a5 5 0 015 5M15 16a3 3 0 110-6 3 3 0 010 6m10 0a3 3 0 110-6 3 3 0 010 6" />,
  },
  {
    no: '04',
    title: 'Investor & Grant Matching',
    body: 'AI matches you with investors aligned to your thesis, stage, and sector before deadlines close.',
    icon: <path d="M12 28h16M14 26l6-12 6 12M20 14v-3" />,
  },
  {
    no: '05',
    title: 'Trusted Supplier Network',
    body: 'Find vetted legal, banking, HR, and operational partners who have worked with Gulf founders.',
    icon: <path d="M8 20c3-4 7-6 12-6s9 2 12 6c-3 4-7 6-12 6s-9-2-12-6zm12 0a3 3 0 100 0z" />,
  },
  {
    no: '06',
    title: 'Global Corridor Access',
    body: 'Build locally. Scale globally through curated pathways to major startup corridors.',
    icon: <path d="M8 22c3-5 6-5 9 0s6 5 9 0M8 22H6m20 0h2" />,
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
        <div className="value-head grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1fr] xl:items-end">
          <div className="reveal">
            <p className="section-lead">What MFC Does</p>
            <h2 className="section-title mt-5">One platform. Every resource you need.</h2>
          </div>
          <p className="copy reveal d1 max-w-[420px] justify-self-end text-[.9rem]">
            Stop spending months on dead ends. MFC maps the entire GCC ecosystem so you move in days, not quarters.
          </p>
        </div>

        <div className="value-grid card-grid mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, i) => (
            <article key={feature.no} className={`card-base value-card reveal d${Math.min(i + 1, 5)}`}>
              <p className="font-(--font-display) text-[.92rem] font-extrabold tracking-[.12em] text-(--orange)">{feature.no}</p>
              <svg viewBox="0 0 40 40" className="mt-4 h-[38px] w-[38px] text-(--orange)" fill="none" stroke="currentColor" strokeWidth="1.4">
                <circle cx="20" cy="20" r="17" opacity="0.35" />
                {feature.icon}
              </svg>
              <h3 className="mt-4 font-(--font-display) text-[1.05rem] font-bold leading-[1.3] text-white">{feature.title}</h3>
              <p className="copy mt-3 text-[.85rem]">{feature.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

