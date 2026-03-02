import Link from 'next/link';

export default function SurveyPage() {
  return (
    <main className="graph-grid-dim relative min-h-screen bg-background px-[5%] py-24 text-foreground">
      <section className="site-shell border border-[rgba(255,255,255,.08)] bg-[rgba(255,255,255,.02)] p-8 md:p-12">
        <p className="section-lead">Gulf Survey 2028</p>
        <h1 className="hero-title mt-4 max-w-[16ch] text-white">
          15 minutes.
          <span className="block text-(--orange)">Three rewards.</span>
          <span className="block">Your story counts.</span>
        </h1>

        <p className="hero-sub mt-6 max-w-[70ch]">
          Founder-grade ecosystem survey for GCC builders. Share your operating reality, unlock priority event access,
          and get considered for awards nominations.
        </p>

        <div className="mt-8 grid gap-2 md:grid-cols-3">
          <article className="card-base p-5">
            <p className="section-lead">Auto Nomination</p>
            <h2 className="section-title mt-3">Gulf Founders Awards</h2>
            <p className="copy mt-3">Complete the survey and unlock category consideration based on your profile.</p>
          </article>
          <article className="card-base p-5">
            <p className="section-lead">Complimentary Ticket</p>
            <h2 className="section-title mt-3">Innovation Forum</h2>
            <p className="copy mt-3">Priority access to curated sessions with founders, VCs, and regional operators.</p>
          </article>
          <article className="card-base p-5">
            <p className="section-lead">Mobile App</p>
            <h2 className="section-title mt-3">Founder Companion</h2>
            <p className="copy mt-3">Mobile-first access to updates, invites, and ecosystem intelligence on the go.</p>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <a className="btn btn-primary btn-primary-lg" href="#start">
            Start Survey
          </a>
          <Link className="btn btn-outline btn-outline-lg" href="/">
            Back to Landing
          </Link>
        </div>
      </section>
    </main>
  );
}
