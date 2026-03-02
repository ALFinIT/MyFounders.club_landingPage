'use client';

import Image from 'next/image';
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-[100] border-b border-[rgba(255,91,35,.1)] bg-[rgba(5,5,5,.92)] px-[5%] py-[18px] backdrop-blur-[20px]">
      <div className="site-shell flex items-center justify-between">
        <Link href="#top" className="flex items-center gap-2.5">
          <Image src="/App Icon Orange.svg" alt="MyFounders.Club" width={22} height={22} priority />
          <span className="font-(--font-display) text-[1.05rem] font-bold text-white">
            MyFounders.<span className="text-(--orange)">Club</span>
          </span>
        </Link>

        <div className="nav-links ml-auto mr-8 flex items-center gap-10">
          <Link href="#story" className="text-[0.82rem] font-normal tracking-[.05em] text-[var(--silver)] transition-colors duration-200 hover:text-white">
            Our Story
          </Link>
          <Link href="#gulf" className="text-[0.82rem] font-normal tracking-[.05em] text-[var(--silver)] transition-colors duration-200 hover:text-white">
            The Gulf
          </Link>
          <Link href="#for" className="text-[0.82rem] font-normal tracking-[.05em] text-[var(--silver)] transition-colors duration-200 hover:text-white">
            Who It&apos;s For
          </Link>
          <Link href="/events" className="text-[0.82rem] font-normal tracking-[.05em] text-[var(--silver)] transition-colors duration-200 hover:text-white">
            Events
          </Link>
        </div>

        <a href="#waitlist" className="btn btn-primary">
          Get Early Access
        </a>
      </div>
    </nav>
  );
}

