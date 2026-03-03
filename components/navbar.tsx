'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type SessionUser = {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
};

export function Navbar() {
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [user, setUser] = useState<SessionUser | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const readSession = () => {
      try {
        const raw = localStorage.getItem('mfc_user');
        if (!raw) {
          setUser(null);
          return;
        }
        setUser(JSON.parse(raw) as SessionUser);
      } catch {
        setUser(null);
      }
    };

    readSession();
    window.addEventListener('storage', readSession);
    return () => window.removeEventListener('storage', readSession);
  }, []);

  useEffect(() => {
    const onDocClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const fullName = useMemo(() => {
    if (!user) return '';
    const name = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
    return name || user.email || 'Member';
  }, [user]);

  const initials = useMemo(() => {
    if (!fullName) return 'M';
    const parts = fullName.split(' ').filter(Boolean);
    if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  }, [fullName]);

  const logout = () => {
    localStorage.removeItem('mfc_user');
    setUser(null);
    setOpen(false);
    router.push('/');
  };

  return (
    <nav className="nav-shell fixed left-0 right-0 top-0 z-[100] border-b border-[rgba(255,91,35,.1)] bg-[rgba(5,5,5,.92)] px-[5%] py-[18px] backdrop-blur-[20px]">
      <div className="site-shell flex items-center justify-between">
        <Link href="/#top" className="flex items-center gap-3">
          <Image src="/App Icon Orange.svg" alt="MyFounders.Club" width={30} height={30} priority />
          <span className="font-(--font-display) text-[1.2rem] font-bold text-white sm:text-[1.3rem]">
            MyFounders.<span className="text-(--orange)">Club</span>
          </span>
        </Link>

        <div className="nav-links ml-auto mr-8 flex items-center gap-10">
          <Link href="/#story" className="nav-link-item">
            Our Story
          </Link>
          <Link href="/#gulf" className="nav-link-item">
            The Gulf
          </Link>
          <Link href="/#for" className="nav-link-item">
            Who It&apos;s For
          </Link>
          <Link href="/survey" className="nav-link-item">
            Survey
          </Link>
          <Link href="/events" className="nav-link-item">
            Events
          </Link>
        </div>

        {!user ? (
          <div className="flex items-center gap-4">
            <a href="/auth" className="btn btn-primary">
              Get Early Access
            </a>
            <Link href="/auth" className="nav-link-item">
              Sign In
            </Link>
          </div>
        ) : (
          <div ref={menuRef} className="relative">
            <button
              type="button"
              className="flex items-center gap-2.5 border border-[rgba(255,255,255,.12)] bg-[rgba(255,255,255,.03)] px-2.5 py-1.5 transition hover:border-[rgba(255,91,35,.4)]"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(255,91,35,.2)] font-(--font-display) text-[.8rem] font-bold text-(--orange)">
                {initials}
              </span>
              <span className="max-w-28 truncate font-(--font-display) text-[.76rem] uppercase tracking-[.08em] text-white">{fullName}</span>
            </button>

            {open ? (
              <div className="absolute right-0 top-[calc(100%+8px)] min-w-44 border border-[rgba(255,255,255,.12)] bg-[rgba(8,8,8,.98)] p-1.5 shadow-[0_12px_36px_rgba(0,0,0,.45)]">
                <Link href="/profile" className="block px-3 py-2 text-[.76rem] uppercase tracking-[.12em] text-[rgba(255,255,255,.9)] hover:bg-[rgba(255,91,35,.08)] hover:text-(--orange)">
                  Profile Settings
                </Link>
                <button
                  type="button"
                  onClick={logout}
                  className="block w-full px-3 py-2 text-left text-[.76rem] uppercase tracking-[.12em] text-[rgba(255,255,255,.9)] hover:bg-[rgba(255,91,35,.08)] hover:text-(--orange)"
                >
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </nav>
  );
}

