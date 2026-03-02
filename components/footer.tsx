import Image from 'next/image';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="section-block border-t border-[rgba(255,255,255,.055)] px-[5%] pb-[34px] pt-[54px]">
      <div className="site-shell">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/App Icon Orange.svg" alt="MFC logo" width={18} height={18} />
              <p className="font-(--font-display) text-[1rem] font-bold text-white">MyFounders.Club</p>
            </div>
            <p className="mt-3 text-[.73rem] text-[rgba(204,204,204,.67)]">Six Countries. One Ecosystem. Infinite Reach.</p>
            <div className="mt-4 flex gap-2">
              {['in', 'ig', 'x', 't'].map((s) => (
                <span
                  key={s}
                  className="flex h-[33px] w-[33px] items-center justify-center border border-[rgba(255,255,255,.11)] font-(--font-display) text-[.7rem] font-bold text-[var(--silver)] transition-all duration-200 hover:border-[var(--orange)] hover:bg-[rgba(255,91,35,.07)] hover:text-(--orange)"
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
          <div className="flex gap-4">
            <span>Privacy Policy</span>
            <span>Terms &amp; Conditions</span>
            <span>Cookie Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
