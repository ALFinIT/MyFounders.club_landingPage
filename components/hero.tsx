export function HeroSection() {
  return (
    <section id="top" className="section-block relative min-h-screen overflow-hidden px-[5%] pt-32.5">
      <div className="pointer-events-none absolute -right-20 -top-37.5 h-175 w-175 bg-[radial-gradient(circle,rgba(255,91,35,.11),transparent_65%)] animate-[breathe_9s_infinite]" />
      <div className="pointer-events-none absolute -bottom-20 -left-15 h-125 w-125 bg-[radial-gradient(circle,rgba(62,92,94,.13),transparent_68%)] animate-[breathe_12s_reverse_infinite]" />
      <div className="site-shell relative z-2">
        <p className="section-lead animate-[fadeUp_.8s_ease_.15s_both]">
          <span className="blink mr-2 inline-block">&bull;</span>
          Beta Access Now Open - Join Free
        </p>

        <h1 className="hero-title mt-5 text-white animate-[fadeUp_.8s_ease_.35s_both]">
          <span className="block">Build in the Gulf.</span>
          <span className="block text-(--orange)">Wired to</span>
          <span className="block text-[#d9d9d9] md:pl-16">the World.</span>
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
          <div className="border border-[rgba(255,255,255,.055)] bg-[rgba(255,255,255,.02)] p-6">
            <p style={{ fontFamily: 'var(--font-display)' }} className="text-[2.5rem] font-extrabold leading-none text-(--orange)">
              $4.5B
            </p>
            <p className="mt-2 text-[.72rem] uppercase tracking-[.16em] text-(--silver)">GCC Capital Q3 2025</p>
          </div>
          <div className="border border-[rgba(255,255,255,.055)] bg-[rgba(255,255,255,.02)] p-6">
            <p style={{ fontFamily: 'var(--font-display)' }} className="text-[2.5rem] font-extrabold leading-none text-(--orange)">
              523%
            </p>
            <p className="mt-2 text-[.72rem] uppercase tracking-[.16em] text-(--silver)">YoY Funding Growth</p>
          </div>
          <div className="border border-[rgba(255,255,255,.055)] bg-[rgba(255,255,255,.02)] p-6">
            <p style={{ fontFamily: 'var(--font-display)' }} className="text-[2.5rem] font-extrabold leading-none text-(--orange)">
              63K+
            </p>
            <p className="mt-2 text-[.72rem] uppercase tracking-[.16em] text-(--silver)">Active Startups</p>
          </div>
          <div className="border border-[rgba(255,255,255,.055)] bg-[rgba(255,255,255,.02)] p-6">
            <p style={{ fontFamily: 'var(--font-display)' }} className="text-[2.5rem] font-extrabold leading-none text-(--orange)">
              6
            </p>
            <p className="mt-2 text-[.72rem] uppercase tracking-[.16em] text-(--silver)">Countries. One Platform.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
