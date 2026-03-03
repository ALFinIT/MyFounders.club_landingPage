export function HeroSection() {
  return (
    <section id="top" className="section-block relative min-h-screen overflow-hidden px-[5%] pt-[3rem] md:pt-[3.5rem]">
      <div className="pointer-events-none absolute -right-20 -top-37.5 h-175 w-175 bg-[radial-gradient(circle,rgba(255,91,35,.11),transparent_65%)] animate-[breathe_9s_infinite]" />
      <div className="pointer-events-none absolute -bottom-20 -left-15 h-125 w-125 bg-[radial-gradient(circle,rgba(62,92,94,.13),transparent_68%)] animate-[breathe_12s_reverse_infinite]" />
      <div className="site-shell relative z-2">
        <p className="section-lead hero-eyebrow animate-[fadeUp_.8s_ease_.15s_both]">
          <span className="hero-eyebrow-square blink mr-2.5 inline-block" />
          Beta Access Now Open - Join Free
        </p>

        <h1 className="hero-title hero-title-premium mt-5 text-white animate-[fadeUp_.8s_ease_.35s_both]">
          <span className="block">
            Build in the <span className="text-(--orange)">Gulf.</span>
          </span>
          <span className="block">
            Wired to the <span className="text-(--orange)">World.</span>
          </span>
        </h1>

        <p className="hero-sub mt-7 max-w-180 animate-[fadeUp_.8s_ease_.55s_both]">
          The Gulf&apos;s AI-powered startup intelligence platform. One source of truth for 6 GCC countries - find the right jurisdiction, program, investor, accelerator, or grant. Built for founders who are done guessing.
        </p>

        <div className="mt-8 flex flex-wrap gap-3 animate-[fadeUp_.8s_ease_.75s_both]">
          <a href="#waitlist" className="btn btn-primary btn-primary-lg">
            Join the Beta - Free
          </a>
          <a href="#gulf" className="btn btn-outline btn-outline-lg">
            Explore the Gulf
          </a>
        </div>

        <div className="stats-strip card-grid mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 animate-[fadeUp_.8s_ease_.95s_both]">
          <div className="glass-card-soft hero-stat-card p-5">
            <p style={{ fontFamily: 'var(--font-display)' }} className="text-[2rem] font-extrabold leading-none text-white">
              $4.5B
            </p>
            <p className="mt-2 text-[.64rem] uppercase tracking-[.14em] text-(--silver)">GCC Capital Q3 2025</p>
          </div>
          <div className="glass-card-soft hero-stat-card p-5">
            <p style={{ fontFamily: 'var(--font-display)' }} className="text-[2rem] font-extrabold leading-none text-white">
              523%
            </p>
            <p className="mt-2 text-[.64rem] uppercase tracking-[.14em] text-(--silver)">YoY Funding Growth</p>
          </div>
          <div className="glass-card-soft hero-stat-card p-5">
            <p style={{ fontFamily: 'var(--font-display)' }} className="text-[2rem] font-extrabold leading-none text-white">
              63K+
            </p>
            <p className="mt-2 text-[.64rem] uppercase tracking-[.14em] text-(--silver)">Active Startups</p>
          </div>
          <div className="glass-card-soft hero-stat-card p-5">
            <p style={{ fontFamily: 'var(--font-display)' }} className="text-[2rem] font-extrabold leading-none text-white">
              6
            </p>
            <p className="mt-2 text-[.64rem] uppercase tracking-[.14em] text-(--silver)">Countries. One Platform.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
