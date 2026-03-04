'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export function OriginStorySection() {
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
    <section id="story" ref={ref} className="section-block border-y border-[rgba(255,77,0,.12)] bg-[rgba(255,255,255,.015)] px-[5%] py-[110px]">
      <div className="site-shell story-grid grid grid-cols-1 gap-14 xl:grid-cols-[1fr_1fr] xl:gap-20">
        <div>
          <p className="section-lead reveal">The Origin Story</p>
          <h2 className="section-title reveal d1 mt-5">The room she wished existed.</h2>
          <div className="accent-bar reveal d2 mt-6" />

          <div className="copy reveal d3 mt-8 max-w-[640px] space-y-5 text-[.95rem]">
            <p>
              Katerina Hayes built ventures in the UK. And failed some. She knew what it felt like to search for reliable answers at 11pm with every source contradicting the last.
            </p>
            <p>
              In 2022, she arrived in Riyadh, Saudi Arabia. A region exploding with capital and ambition - yet no single source of truth for how to navigate it. Laws changing overnight. No community built with diversity at its core.
            </p>
            <p>
              Companies expanding into the Gulf were drowning too. Six countries. Six regulatory frameworks. Hundreds of free zones. Zero clear guide.
            </p>
            <p>
              <span className="font-semibold text-white">So she built MFC.</span> The platform she needed when she started - now with a team of advanced AI engineers and investors who believe the Gulf deserves intelligent infrastructure that actually works.
            </p>
          </div>
        </div>

        <aside className="reveal d4 glass-card relative self-center p-9">
          <div className="absolute right-0 top-0 h-[2px] w-[55%] bg-[var(--orange)]" />
          <p className="font-(--font-display) text-[1.55rem] font-semibold italic leading-[1.5] text-white">
            &ldquo;I didn&apos;t just build MFC for founders. I built it for the version of me that arrived here not knowing where to start, what to trust, or who to ask.&rdquo;
          </p>

          <div className="mt-8">
            <div className="group relative w-fit">
              <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[rgba(255,91,35,.4)] opacity-0 blur-[24px] transition duration-300 group-hover:scale-110 group-hover:opacity-100" />
              <Image
                src="/founders/kh-avatar.jpeg"
                alt="KH - Katerina Hayes"
                width={96}
                height={96}
                className="h-[96px] w-[96px] border-2 border-(--orange) object-cover"
              />
            </div>
            {/* <p className="mt-3 font-(--font-display) text-[.82rem] uppercase tracking-[.12em] text-(--orange)">KH</p> */}
            <p className="mt-1 font-(--font-display) text-[1rem] font-semibold text-white">Katerina Hayes</p>
            <p className="mt-0.5 text-[.83rem] text-[var(--silver)]">Founder &amp; CEO, MyFounders.Club</p>
            <span className="orange-badge mt-2">Founded 2022 Riyadh</span>
          </div>
        </aside>
      </div>
    </section>
  );
}

