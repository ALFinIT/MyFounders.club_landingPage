const steps = [
  {
    n: '01',
    title: 'Tell us about you',
    text: 'Stage, sector, location, and goal. Five questions. Under 60 seconds. We map your starting point precisely.',
  },
  {
    n: '02',
    title: 'Get your next step',
    text: 'AI scans 400+ programs, grants, investors, and free zones. Returns your 3-5 best fits - a recommendation, not a list.',
  },
  {
    n: '03',
    title: 'Join the community',
    text: "Connect with verified founders at your stage. The room that doesn't require $1M revenue first.",
  },
  {
    n: '04',
    title: 'Build. Expand. Scale.',
    text: 'As you hit milestones, recommendations update. Build locally, expand regionally, scale globally.',
  },
];

export function HowItWorksSection() {
  return (
    <section className="section-block border-y border-[rgba(62,92,94,.3)] bg-[rgba(62,92,94,.05)] px-[5%] py-[100px]">
      <div className="site-shell">
        <header className="mx-auto max-w-[760px] text-center">
          <p className="section-lead">How It Works</p>
          <h2 className="section-title mt-5">Four steps to clarity.</h2>
          <p className="copy mt-5 text-[.9rem]">No friction, no jargon, no dead ends. Just the next step that makes sense for where you are now.</p>
        </header>

        <div className="steps-grid relative mt-11 grid grid-cols-1 gap-[2px] md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step) => (
            <article key={step.n} className="relative border border-[rgba(255,255,255,.055)] bg-[rgba(255,255,255,.02)] p-7 text-center">
              <div className="relative z-[2] mx-auto flex h-[44px] w-[44px] items-center justify-center border border-[var(--orange)] bg-[rgba(255,91,35,.07)] font-(--font-display) text-[.92rem] font-extrabold text-(--orange)">
                {step.n}
              </div>
              <h3 className="mt-5 font-(--font-display) text-[1.05rem] font-bold text-white">{step.title}</h3>
              <p className="copy mt-3 text-[.85rem]">{step.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

