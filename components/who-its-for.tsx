'use client';

import { useMemo, useState } from 'react';

type Tab = 'gulf' | 'international' | 'investors';

const tabs: Record<
  Tab,
  { label: string; intro: string; cards: Array<{ tag: string; title: string; body: string }> }
> = {
  gulf: {
    label: 'Gulf Founders',
    intro: "Whether you're building in the Gulf or coming into it - MFC removes the guesswork. Select your profile.",
    cards: [
      { tag: 'Early Stage', title: 'Pre-Seed to Seed', body: 'Stop drowning in options. Get one clear next step - the right accelerator, grant, and intro.' },
      { tag: 'Scaling', title: 'Seed to Series A', body: "You've proven the idea. Navigate GCC expansion with verified resources and founders." },
      { tag: 'Diversity-First', title: 'Female Founders', body: 'Female-led UAE startups raised only $176M in H1 2025 despite equal entrepreneurial representation.' },
      { tag: 'Post-Accelerator', title: 'Alumni & Graduates', body: "The program ended. The community doesn't have to. Your network remains always on." },
    ],
  },
  international: {
    label: 'International Founders',
    intro: 'From market-entry decisions to partner discovery, MFC removes blind spots before you spend time and capital.',
    cards: [
      { tag: 'Market Entry', title: 'Launch Stack', body: 'Choose the right jurisdiction, licensing path, and banking setup before incorporation.' },
      { tag: 'Compliance', title: 'Country Clarity', body: 'See practical differences across GCC markets in a single decision flow.' },
      { tag: 'Programs', title: 'Funding Routes', body: 'Find grants and accelerators aligned to your stage instead of random lists.' },
      { tag: 'Network', title: 'Trusted Intros', body: 'Connect with operators and founders who have executed similar expansion moves.' },
    ],
  },
  investors: {
    label: 'Investors',
    intro: 'Track founder momentum and ecosystem movement with contextual intelligence across all six GCC countries.',
    cards: [
      { tag: 'Deal Flow', title: 'Qualified Pipelines', body: 'Filter opportunities by thesis, stage, geography, and ecosystem indicators.' },
      { tag: 'Signal', title: 'Regional Intelligence', body: 'Access updates on programs, regulation shifts, and corridor growth trends.' },
      { tag: 'Network', title: 'Verified Communities', body: 'Source through trusted founder communities and curated operator circles.' },
      { tag: 'Support', title: 'Portfolio Enablement', body: 'Help portfolio founders with operational partners and expansion pathways.' },
    ],
  },
};

export function WhoItsForSection() {
  const [active, setActive] = useState<Tab>('gulf');
  const data = useMemo(() => tabs[active], [active]);

  return (
    <section id="for" className="section-block px-[5%] py-[110px]">
      <div className="site-shell">
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_1fr] xl:items-end">
          <div>
            <p className="section-lead">Who It&apos;s For</p>
            <h2 className="section-title mt-5">Built for every founder at every stage.</h2>
          </div>
          <p className="copy max-w-[500px] justify-self-end text-[.9rem]">{data.intro}</p>
        </div>

        <div className="mt-10 inline-flex border border-[rgba(255,255,255,.09)] bg-[rgba(255,255,255,.035)] p-1">
          {(Object.keys(tabs) as Tab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              className={`px-5 py-2 text-[.79rem] font-medium tracking-[.05em] transition-all duration-200 ${
                active === tab ? 'bg-[var(--orange)] text-white' : 'text-[var(--silver)] hover:text-white'
              }`}
            >
              {tabs[tab].label}
            </button>
          ))}
        </div>

        <div className="for-grid card-grid mt-8 grid grid-cols-1 md:grid-cols-2">
          {data.cards.map((card, index) => (
            <article
              key={`${active}-${card.title}`}
              className="profile-card"
              style={{
                animation: `tabIn .45s ease both`,
                animationDelay: `${index * 55}ms`,
              }}
            >
              <span className="teal-badge">{card.tag}</span>
              <h3 className="mt-4 font-(--font-display) text-[1.05rem] font-bold leading-[1.3] text-white">
                {card.title}
              </h3>
              <p className="copy mt-3 text-[.85rem]">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

