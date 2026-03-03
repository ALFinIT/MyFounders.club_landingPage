'use client';

import { useEffect, useRef } from 'react';

const stats = [
  ['80%', 'of MENA founders experience isolation some or all of the time'],
  ['64%', 'say stress and overwork negatively impact their decision-making'],
  ['50%', 'more likely to delay critical business decisions when isolated'],
  ['41%', 'say the cost of accelerators or coaching is completely out of reach'],
];

export function ProblemWeSolveSection() {
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
    <section ref={ref} className="section-block border-y border-[rgba(255,91,35,.1)] bg-[rgba(255,91,35,.04)] px-[5%] py-20">
      <div className="site-shell">
        <header className="reveal mx-auto max-w-215 text-center">
          <p className="section-lead">The Problem We Solve</p>
          <h2 className="section-title mt-5">The Gulf is booming. Founders are still alone.</h2>
          <p className="copy mt-5 text-[.9rem]">
            Survey of 120+ founders across the Middle East by The Founder&apos;s Sanctuary, 2025. This is why MFC exists.
          </p>
        </header>

        <div className="iso-grid card-grid mt-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(([value, text], i) => (
            <article key={value} className={`reveal d${Math.min(i + 1, 5)} glass-card p-7 text-center`}>
              <p style={{ fontFamily: 'var(--font-display)' }} className="text-[2.8rem] font-extrabold leading-none text-white">
                {value}
              </p>
              <p className="copy mt-3 text-[.85rem]">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
