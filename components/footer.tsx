import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-block border-t border-[rgba(255,255,255,.055)] px-[5%] pb-[34px] pt-[54px]">
      <div className="site-shell">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Image src="/App Icon Orange.svg" alt="MFC logo" width={30} height={30} />
              <p className="font-(--font-display) text-[1.35rem] font-bold text-white">MyFounders.Club</p>
            </div>
            <p className="mt-3 text-[.9rem] text-[rgba(204,204,204,.82)]">Six Countries. One Ecosystem. Infinite Reach.</p>
            <div className="mt-4 flex gap-3">
              {['in', 'ig', 'x', 't'].map((s) => (
                <span
                  key={s}
                  className="flex h-[40px] w-[40px] items-center justify-center border border-[rgba(255,255,255,.11)] font-(--font-display) text-[.82rem] font-bold text-[var(--silver)] transition-all duration-200 hover:border-[var(--orange)] hover:bg-[rgba(255,91,35,.07)] hover:text-(--orange)"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div>
            <p className="font-(--font-display) text-[.8rem] font-semibold uppercase tracking-[.08em] text-white">Platform</p>
            <ul className="mt-3 space-y-2 text-[.8rem] text-[rgba(204,204,204,.67)]">
              <li className="transition-all duration-200 hover:text-(--orange)">What We Do</li>
              <li className="transition-all duration-200 hover:text-(--orange)">The Gulf</li>
              <li className="transition-all duration-200 hover:text-(--orange)">Who It&apos;s For</li>
              <li className="transition-all duration-200 hover:text-(--orange)">Get Early Access</li>
            </ul>
          </div>
          <div>
            <p className="font-(--font-display) text-[.8rem] font-semibold uppercase tracking-[.08em] text-white">Community</p>
            <ul className="mt-3 space-y-2 text-[.8rem] text-[rgba(204,204,204,.67)]">
              <li className="transition-all duration-200 hover:text-(--orange)">Gulf Founders</li>
              <li className="transition-all duration-200 hover:text-(--orange)">International Founders</li>
              <li className="transition-all duration-200 hover:text-(--orange)">Investors</li>
              <li className="transition-all duration-200 hover:text-(--orange)">Events &amp; Masterminds</li>
            </ul>
          </div>
          <div>
            <p className="font-(--font-display) text-[.8rem] font-semibold uppercase tracking-[.08em] text-white">Resources</p>
            <ul className="mt-3 space-y-2 text-[.8rem] text-[rgba(204,204,204,.67)]">
              <li className="transition-all duration-200 hover:text-(--orange)">The Gulf Pulse</li>
              <li className="transition-all duration-200 hover:text-(--orange)">GCC Startup Guide</li>
              <li className="transition-all duration-200 hover:text-(--orange)">Our Story</li>
              <li className="transition-all duration-200 hover:text-(--orange)">Contact Us</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-3 border-t border-[rgba(255,255,255,.055)] pt-4 text-[.73rem] text-[rgba(204,204,204,.42)] md:flex-row">
          <p>&copy; {year} MyFounders.Club. All rights reserved. Founded in Riyadh, Saudi Arabia.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms-and-conditions" className="hover:text-white">Terms &amp; Conditions</Link>
            <Link href="/cookie-policy" className="hover:text-white">Cookie Policy</Link>
            <span className="mx-1 hidden h-4 w-px bg-[rgba(255,255,255,.15)] md:inline-block" />
            <a
              href="https://alfinit.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2.5 border border-[rgba(255,91,35,.3)] bg-[rgba(255,91,35,.08)] px-3 py-1.5 text-[.66rem] uppercase tracking-[.12em] text-[rgba(255,255,255,.9)] transition-all duration-300 hover:border-[rgba(255,91,35,.65)] hover:bg-[rgba(255,91,35,.16)] hover:text-white hover:shadow-[0_0_26px_rgba(255,91,35,.42)]"
              aria-label="Made by ALfinit"
            >
              <span className="relative inline-flex h-5 w-5 items-center justify-center overflow-hidden bg-[#0b0b0b]">
                <Image src="/alfinit-favicon.ico" alt="ALfinit favicon" width={20} height={20} className="h-5 w-5 object-cover" />
              </span>
              Made by ALfinit
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
