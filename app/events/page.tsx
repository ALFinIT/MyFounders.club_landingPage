import Link from 'next/link';

export default function EventsPage() {
  return (
    <main className="graph-grid-dim relative min-h-screen bg-background px-[5%] py-28 text-foreground">
      <section className="site-shell border border-[rgba(255,255,255,.09)] bg-[rgba(255,255,255,.02)] p-10">
        <p className="section-lead">Events</p>
        <h1 className="section-title mt-5">Founder Events &amp; Masterminds</h1>
        <p className="copy mt-5 max-w-[680px] text-[.95rem]">
          This events page is now live and connected from the navbar. Upcoming sessions, founder circles, and regional meetups will appear here.
        </p>
        <div className="mt-8">
          <Link href="/#waitlist" className="btn btn-primary">
            Join the Beta - Free
          </Link>
        </div>
      </section>
    </main>
  );
}
