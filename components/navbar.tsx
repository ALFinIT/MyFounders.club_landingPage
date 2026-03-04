'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

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
  const [mobileOpen, setMobileOpen] = useState(false);

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
    const syncServerSession = async () => {
      try {
        const response = await fetch('/api/auth/session', { cache: 'no-store' });
        if (!response.ok) {
          localStorage.removeItem('mfc_user');
          setUser(null);
          return;
        }
        const data = await response.json();
        if (data?.user) {
          localStorage.setItem('mfc_user', JSON.stringify(data.user));
          setUser(data.user as SessionUser);
        }
      } catch {
        // Keep UI resilient during transient network errors.
      }
    };

    void syncServerSession();
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

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch {
      // Always clear local cache even if network request fails.
    } finally {
      localStorage.removeItem('mfc_user');
      setUser(null);
      setOpen(false);
      setMobileOpen(false);
      router.replace('/');
      router.refresh();
    }
  };

  const goTo = (path: string) => {
    setOpen(false);
    setMobileOpen(false);
    router.push(path);
  };

  return (
    <nav className="nav-shell sticky left-0 right-0 top-0 z-[100] border-b border-[rgba(255,91,35,.1)] bg-[rgba(5,5,5,.92)] px-[5%] py-[18px] backdrop-blur-[20px]">
      <div className="site-shell flex items-center justify-between">
        <Link href="/#top" className="flex items-center gap-3">
          <Image src="/App Icon Orange.svg" alt="MyFounders.Club" width={30} height={30} priority />
          <span className="font-(--font-display) text-[1.2rem] font-bold text-white sm:text-[1.3rem]">
            MyFounders.<span className="text-(--orange)">Club</span>
          </span>
        </Link>

        <div className="nav-links ml-auto mr-8 hidden items-center gap-10 md:flex">
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
          <div className="hidden items-center gap-4 md:flex">
            <Link href="/auth" className="btn btn-primary">
              Get Early Access
            </Link>
            <Link href="/auth?tab=signin" className="nav-link-item">
              Sign In
            </Link>
          </div>
        ) : (
          <div ref={menuRef} className="relative hidden md:block">
            <button
              type="button"
              className="flex items-center gap-2.5 border border-[rgba(255,255,255,.12)] bg-[rgba(255,255,255,.03)] px-2.5 py-1.5 transition hover:border-[rgba(255,91,35,.4)]"
              onClick={(event) => {
                event.stopPropagation();
                setOpen((v) => !v);
              }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgba(255,91,35,.2)] font-(--font-display) text-[.8rem] font-bold text-(--orange)">
                {initials}
              </span>
              <span className="max-w-28 truncate font-(--font-display) text-[.76rem] uppercase tracking-[.08em] text-white">{fullName}</span>
            </button>

            {open ? (
              <div className="absolute right-0 top-[calc(100%+8px)] min-w-44 border border-[rgba(255,255,255,.12)] bg-[rgba(8,8,8,.98)] p-1.5 shadow-[0_12px_36px_rgba(0,0,0,.45)]">
                {user?.role === 'admin' ? (
                  <button
                    type="button"
                    onClick={() => goTo('/admin')}
                    className="block w-full px-3 py-2 text-left text-[.76rem] uppercase tracking-[.12em] text-[rgba(255,255,255,.9)] hover:bg-[rgba(255,91,35,.08)] hover:text-(--orange)"
                  >
                    Dashboard
                  </button>
                ) : null}
                <button
                  type="button"
                  onClick={() => goTo('/profile')}
                  className="block w-full px-3 py-2 text-left text-[.76rem] uppercase tracking-[.12em] text-[rgba(255,255,255,.9)] hover:bg-[rgba(255,91,35,.08)] hover:text-(--orange)"
                >
                  Profile Settings
                </button>
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

        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center border border-[rgba(255,255,255,.14)] bg-[rgba(255,255,255,.03)] md:hidden"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <span className="relative block h-3.5 w-4">
            <span className={`absolute left-0 right-0 h-[1.5px] bg-white transition ${mobileOpen ? 'top-[6px] rotate-45' : 'top-0'}`} />
            <span className={`absolute left-0 right-0 top-[6px] h-[1.5px] bg-white transition ${mobileOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`absolute left-0 right-0 h-[1.5px] bg-white transition ${mobileOpen ? 'top-[6px] -rotate-45' : 'top-[12px]'}`} />
          </span>
        </button>
      </div>

      {mobileOpen ? (
        <div className="site-shell mt-3 border border-[rgba(255,255,255,.1)] bg-[rgba(8,8,8,.98)] p-3 md:hidden">
          <div className="grid gap-2">
            <Link href="/#story" className="nav-link-item py-2" onClick={() => setMobileOpen(false)}>
              Our Story
            </Link>
            <Link href="/#gulf" className="nav-link-item py-2" onClick={() => setMobileOpen(false)}>
              The Gulf
            </Link>
            <Link href="/#for" className="nav-link-item py-2" onClick={() => setMobileOpen(false)}>
              Who It&apos;s For
            </Link>
            <Link href="/survey" className="nav-link-item py-2" onClick={() => setMobileOpen(false)}>
              Survey
            </Link>
            <Link href="/events" className="nav-link-item py-2" onClick={() => setMobileOpen(false)}>
              Events
            </Link>
          </div>

          <div className="mt-3 border-t border-[rgba(255,255,255,.08)] pt-3">
            {!user ? (
              <div className="grid gap-2">
                <Link href="/auth" className="btn btn-primary text-center" onClick={() => setMobileOpen(false)}>
                  Get Early Access
                </Link>
                <Link href="/auth?tab=signin" className="nav-link-item py-2 text-center" onClick={() => setMobileOpen(false)}>
                  Sign In
                </Link>
              </div>
            ) : (
              <div className="grid gap-2">
                {user?.role === 'admin' ? (
                  <button type="button" className="nav-link-item py-2 text-left" onClick={() => goTo('/admin')}>
                    Dashboard
                  </button>
                ) : null}
                <button type="button" className="nav-link-item py-2 text-left" onClick={() => goTo('/profile')}>
                  Profile Settings
                </button>
                <button
                  type="button"
                  onClick={logout}
                  className="nav-link-item py-2 text-left"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </nav>
  );
}

