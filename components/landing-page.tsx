'use client'

import { useTranslations, useLocale } from 'next-intl'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { usePathname } from '@/lib/i18n'
import { Logo } from './logo'

export default function LandingPage() {
  const t = useTranslations()
  const router = useRouter()
  const locale = useLocale()
  const [activeTab, setActiveTab] = useState('gulf')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [navbarScrolled, setNavbarScrolled] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [prevLocale, setPrevLocale] = useState(locale)

  // Handle language change with smooth transition
  useEffect(() => {
    if (locale !== prevLocale) {
      setIsTransitioning(false)
      setPrevLocale(locale)
    }
  }, [locale, prevLocale])

  const pathname = usePathname()

  const handleLanguageSwitch = (newLocale: string) => {
    setIsTransitioning(true)
    setTimeout(() => {
      // navigate to same path under chosen locale prefix
      const target = `/${newLocale}${pathname}`
      router.replace(target)
    }, 150)
  }

  const handleNavClick = (e: any) => {
    const href = e.currentTarget?.getAttribute('href') || ''
    if (!href) return

    // In-page hash links -> smooth scroll
    if (href.startsWith('#')) {
      e.preventDefault()
      const el = document.querySelector(href)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        window.location.hash = href
      }
      setMobileMenuOpen(false)
      return
    }

    // Internal page links -> navigate then smooth scroll to top
    if (href.startsWith('/')) {
      e.preventDefault()
      setMobileMenuOpen(false)
      router.replace(href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  // Handle navbar scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setNavbarScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const pageTransition = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  return (
    <motion.div key={locale} {...pageTransition}>
      {isTransitioning && (
        <div className="fixed inset-0 bg-black/50 z-[99999] pointer-events-none" />
      )}
        {/* NAV - FULL WIDTH AT TOP */}
        <motion.nav
          className={`fixed top-0 left-0 right-0 z-[9999] w-full px-4 py-4 transition-all duration-300 ${
            navbarScrolled ? 'shadow-2xl backdrop-blur-xl' : ''
          }`}
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Hot Orange Neon Frame - Full Width Container */}
          <div className={`mx-auto max-w-full rounded-2xl border transition-all duration-300 ${
          navbarScrolled
            ? 'bg-black/95 border-orange-500/50 shadow-[0_0_20px_rgba(255,91,35,0.4)]'
            : 'bg-black/90 border-orange-500/70 shadow-[0_0_40px_rgba(255,91,35,0.6),inset_0_0_20px_rgba(255,91,35,0.15)]'
        }`}>
          
          <div className="flex items-center justify-between px-4 md:px-8 py-3 relative z-10">
            
            {/* LEFT: LOGO + BRAND NAME */}
            <motion.a 
              href="/"
              className="flex items-center gap-2 md:gap-3 flex-shrink-0"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                <img src="/images/App%20Icon%20Orange.svg" alt="MFC" className="w-full h-full" />
              </div>
              <span className="hidden sm:inline font-syne font-bold text-white text-sm md:text-base">MyFounders</span>
            </motion.a>

            {/* CENTER: NAVIGATION LINKS - HIDDEN ON MOBILE */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6">
              <a href="#founders" className="text-xs uppercase tracking-widest text-gray-300 hover:text-orange-400 transition-colors font-medium">
                {t('nav.founders')}
              </a>
              <a href="#international" className="text-xs uppercase tracking-widest text-gray-300 hover:text-orange-400 transition-colors font-medium">
                {t('nav.international')}
              </a>
              <a href="#how" className="text-xs uppercase tracking-widest text-gray-300 hover:text-orange-400 transition-colors font-medium">
                {t('nav.how')}
              </a>
              <Link href="/survey" className="text-xs uppercase tracking-widest text-gray-300 hover:text-orange-400 transition-colors font-medium no-underline">
                Survey
              </Link>
            </div>

            {/* RIGHT: LANGUAGE TOGGLE + CTA + HAMBURGER - ALL VISIBLE */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Language Toggle - INSIDE NAVBAR */}
              <div className="flex items-center gap-1 px-2 md:px-3 border-l border-orange-500/30 py-1">
                <button
                  onClick={() => handleLanguageSwitch('ar')}
                  className="px-2 py-1 rounded text-xs font-semibold transition-all whitespace-nowrap hover:scale-105"
                  style={{
                    backgroundColor: locale === 'ar' ? 'rgba(255, 91, 35, 0.3)' : 'transparent',
                    color: locale === 'ar' ? '#FF5B23' : '#9CA3AF',
                  }}
                >
                  عربي
                </button>
                <span className="text-white/20 mx-1">/</span>
                <button
                  onClick={() => handleLanguageSwitch('en')}
                  className="px-2 py-1 rounded text-xs font-semibold transition-all whitespace-nowrap hover:scale-105"
                  style={{
                    backgroundColor: locale === 'en' ? 'rgba(255, 91, 35, 0.3)' : 'transparent',
                    color: locale === 'en' ? '#FF5B23' : '#9CA3AF',
                  }}
                >
                  EN
                </button>
              </div>

              {/* CTA Button - HIDDEN ON SMALL SCREENS */}
              <Link
                href="/auth?mode=signup"
                className="hidden sm:block px-3 md:px-5 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:shadow-[0_0_15px_rgba(255,91,35,0.6)] transition-all no-underline flex-shrink-0 whitespace-nowrap"
              >
                Join Beta
              </Link>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-white hover:text-orange-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>

          {/* MOBILE MENU */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                className="lg:hidden border-t border-orange-500/30 px-4 py-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex flex-col gap-3">
                  <Link
                    href="#founders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm uppercase tracking-widest text-gray-300 hover:text-orange-400 transition-colors font-medium no-underline py-2"
                  >
                    {t('nav.founders')}
                  </Link>
                  <Link
                    href="#international"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm uppercase tracking-widest text-gray-300 hover:text-orange-400 transition-colors font-medium no-underline py-2"
                  >
                    {t('nav.international')}
                  </Link>
                  <Link
                    href="#how"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm uppercase tracking-widest text-gray-300 hover:text-orange-400 transition-colors font-medium no-underline py-2"
                  >
                    {t('nav.how')}
                  </Link>
                  <Link
                    href="/survey"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm uppercase tracking-widest text-gray-300 hover:text-orange-400 transition-colors font-medium no-underline py-2"
                  >
                    Survey
                  </Link>
                  <Link
                    href="/auth?mode=signup"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all no-underline w-full text-center"
                  >
                    Join Beta
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>

      {/* HERO */}
      <section className="min-h-screen flex flex-col justify-center pt-32 md:pt-40 pb-6 relative overflow-hidden">
        {/* Animated Background Gradient */}
        <motion.div 
          className="absolute inset-0 opacity-0 pointer-events-none"
          animate={{ opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="bg-[linear-gradient(rgba(255,91,35,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,91,35,0.04)_1px,transparent_1px)] bg-[60px_60px] w-full h-full [mask-image:radial-gradient(ellipse_80%_70%_at_60%_40%,black_20%,transparent_100%)]"></div>
        </motion.div>
        
        {/* Radial Glow */}
        <motion.div 
          className="absolute top-0 right-0 w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] bg-radial-[circle_at_center,rgba(255,91,35,0.18)_0%,transparent_70%] pointer-events-none"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 5, repeat: Infinity }}
        ></motion.div>

        <div className="max-w-7xl mx-auto px-4 w-full">
          <div className="relative z-10 max-w-4xl">
            {/* Eyebrow */}
            <motion.div 
              className="font-dm-sans text-orange-500 text-sm font-medium uppercase tracking-wider mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0 }}
            >
              {t('hero.eyebrow')}
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="font-syne text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {t('hero.headline1')}<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                {t('hero.headline2')}
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              className="font-dm-sans text-base md:text-lg text-gray-300 max-w-[600px] leading-7 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t('hero.sub')}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex items-center gap-4 flex-wrap mb-16"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <Link href="#beta" className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold px-6 md:px-8 py-3 text-sm md:text-base hover:shadow-[0_0_30px_rgba(255,91,35,0.6)] transition-all transform hover:scale-105 no-underline rounded-lg">
                {t('hero.cta_primary')}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <Link href="#how" className="inline-flex items-center gap-2 text-white text-base font-medium hover:text-orange-400 transition-colors no-underline border border-gray-600 px-6 md:px-8 py-3 rounded-lg hover:border-orange-500">
                {t('hero.cta_ghost')}
                {/* <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> */}
              </Link>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 items-center"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
            <motion.div variants={fadeInUp} className="border-l border-orange-500 pl-3">
              <div className="font-syne text-lg font-black text-orange-500 leading-none mb-0.5">63K+</div>
              <div className="font-dm-sans text-xs text-gray-400 uppercase tracking-wider">{t('hero.stat1')}</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="border-l border-orange-500 pl-3">
              <div className="font-syne text-lg font-black text-orange-500 leading-none mb-0.5">400+</div>
              <div className="font-dm-sans text-xs text-gray-400 uppercase tracking-wider">{t('hero.stat2')}</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="border-l border-orange-500 pl-3">
              <div className="font-syne text-lg font-black text-orange-500 leading-none mb-0.5">$4.5B</div>
              <div className="font-dm-sans text-xs text-gray-400 uppercase tracking-wider">{t('hero.stat3')}</div>
            </motion.div>
            <motion.div variants={fadeInUp} className="border-l border-orange-500 pl-3">
              <div className="font-syne text-lg font-black text-orange-500 leading-none mb-0.5">6</div>
              <div className="font-dm-sans text-xs text-gray-400 uppercase tracking-wider">{t('hero.stat4')}</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      </section>

      {/* FOUNDER STORY */}
<section className="py-6 lg:py-8 px-[4vw] border-t border-white/10 relative overflow-hidden">
  <div className="max-w-7xl mx-auto">
    <motion.div
      className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >

      {/* LEFT SIDE */}
      <div>
        <motion.div
          className="font-dm-sans text-orange-500 text-sm font-medium uppercase tracking-wider mb-3"
          {...fadeInUp}
        >
          {t('founder.label')}
        </motion.div>

        <motion.blockquote
          className="font-syne text-base md:text-lg font-black leading-tight mb-4 text-white"
          {...fadeInUp}
          transition={{ delay: 0.1 }}
        >
          {t('founder.quote')}
        </motion.blockquote>

        <motion.p
          className="font-dm-sans text-gray-400 text-sm leading-6 mb-4"
          {...fadeInUp}
          transition={{ delay: 0.2 }}
        >
          {t('founder.body1')}
        </motion.p>

        <motion.p
          className="font-dm-sans text-gray-400 text-sm leading-6 mb-4"
          {...fadeInUp}
          transition={{ delay: 0.25 }}
        >
          {t('founder.body2')}
        </motion.p>

        <motion.p
          className="font-dm-sans text-gray-400 text-sm leading-6 mb-6"
          {...fadeInUp}
          transition={{ delay: 0.3 }}
        >
          {t('founder.body3')}
        </motion.p>

        {/* FOUNDER SIGNATURE BLOCK */}
        <motion.div
          className="flex items-center gap-4"
          {...fadeInUp}
          transition={{ delay: 0.35 }}
        >
          <div className="w-14 h-14 bg-white/10 border border-white/20 flex items-center justify-center font-syne font-bold text-white text-lg rounded-full">
            KH
          </div>

          <div>
            <div className="font-syne font-bold text-white text-base">
              {t('founder.name')}
            </div>
            <div className="font-dm-sans text-gray-400 text-xs">
              {t('founder.title')}
            </div>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE GRADIENT INTELLIGENCE CARD */}
      <motion.div
       className="relative mt-6 lg:mt-10"
        {...fadeInUp}
        transition={{ delay: 0.4 }}
      >

      {/* Floating Tags */}

    {/* Top Right */}
    <div className="absolute top-10 right-10 bg-black/80 border border-white/10 
    px-5 py-3 text-xs backdrop-blur-md rounded-lg
    animate-float transition-transform duration-300 hover:scale-105 hover:border-orange-500/50 cursor-pointer">
      <div className="text-orange-500 font-bold text-lg">80%</div>
      <div className="text-gray-400 text-[12px]">{t('founder.badge1')}</div>
    </div>

    {/* Left Center */}
    <div className="absolute top-1/2 left-10 -translate-y-1/2 bg-black/80 border border-white/10 
    px-5 py-3 text-xs backdrop-blur-md rounded-lg
    animate-float-slow transition-transform duration-300 hover:scale-105 hover:border-orange-500/50 cursor-pointer">
      <div className="text-orange-500 font-bold text-lg">1</div>
      <div className="text-gray-400 text-[12px]">{t('founder.badge3')}</div>
    </div>

    {/* Bottom Right */}
    <div className="absolute bottom-10 right-16 bg-black/80 border border-white/10 
    px-5 py-3 text-xs backdrop-blur-md rounded-lg
    animate-float transition-transform duration-300 hover:scale-105 hover:border-orange-500/50 cursor-pointer">
      <div className="text-orange-500 font-bold text-lg">{t('founder.badge2_num')}</div>
      <div className="text-gray-400 text-[12px]">{t('founder.badge2_lbl')}</div>
    </div>

        {/* Main Card */}
  <div className="relative bg-gradient-to-br from-orange-500/20 via-orange-500/5 to-transparent 
border border-orange-500/20 h-[300px] lg:h-[350px] 
px-6 py-8 flex flex-col justify-between overflow-hidden rounded-xl">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,115,0,0.3),_transparent_60%)] opacity-40"></div>

          <div className="relative z-10">
            <div className="text-orange-500 text-[11px] tracking-widest uppercase mb-3">
              Founded in Riyadh, 2022
            </div>

            <div className="font-syne text-lg font-bold text-white mb-2">
              MyFounders.Club
            </div>

            <p className="text-gray-300 text-sm leading-5">
              The room that matters. Built in the Gulf. Wired to the world.
            </p>
          </div>

        </div>
      </motion.div>

    </motion.div>
  </div>
</section>

    {/* PROBLEMS */}
<section className="py-8 px-[4vw] border-t border-white/10 relative">
  <div className="max-w-6xl mx-auto">

    {/* Heading */}
    <div className="mb-6">
      <div className="text-orange-500 text-xs tracking-[0.25em] uppercase mb-1.5">
        — The Problem We Solve
      </div>

      <h2 className="font-syne text-base md:text-lg font-bold leading-tight text-white max-w-3xl">
        The Gulf has the capital.
        <br />
        Founders just can’t find the door.
      </h2>
    </div>

    {/* Grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-white/10">

      {[
        {
          number: "01",
          title: "Fragmented Intelligence",
          desc: "400+ accelerators, grants, and programs across six countries — each with different rules and deadlines."
        },
        {
          number: "02",
          title: "Laws That Move Fast",
          desc: "Regulations evolve fast. Most founders act on outdated information."
        },
        {
          number: "03",
          title: "No Map for Entry",
          desc: "Startups struggle to choose the right free zone, jurisdiction, or banking partner."
        },
        {
          number: "04",
          title: "Wrong Rooms",
          desc: "Founders attend events and pitch investors that don’t match their stage."
        },
        {
          number: "05",
          title: "Isolation at Scale",
          desc: "80% of MENA founders report building alone."
        },
        {
          number: "06",
          title: "The Diversity Gap",
          desc: "Female-led startups raised just $17.6M in H1 2025."
        }
      ].map((item, i) => (
        <div
          key={i}
          className="group relative p-3 border-r border-b border-white/10 
          hover:bg-orange-500/5 transition-all duration-300 overflow-hidden"
        >
          {/* Top Hover Line */}
          <div className="absolute top-0 left-0 h-[2px] w-0 bg-orange-500 
          group-hover:w-full transition-all duration-300"></div>

          {/* Number */}
          <div className="text-orange-500/40 text-base font-bold mb-1">
            {item.number}
          </div>

          {/* Title */}
          <h3 className="text-white text-xs font-semibold mb-1">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-gray-400 text-xs leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}

    </div>
  </div>
</section>


      {/* AUDIENCE */}
<section className="py-6 px-[4vw] border-t border-white/10" id="audience">
  <div className="max-w-7xl mx-auto">

    <div className="text-orange-500 text-xs tracking-[0.3em] uppercase mb-2">
      — Who MFC Is Built For
    </div>

    {/* Main Heading */}
    <h2 className="font-syne text-base md:text-lg font-black leading-tight text-white mb-6 max-w-3xl">
      The right room for the right builder.
    </h2>

    {/* Tabs */}
    <div className="flex gap-3 border-b border-white/10 mb-6">
      {[
        { key: "gulf", label: "Gulf Founders" },
        { key: "intl", label: "International Startups" },
        { key: "investors", label: "Investors" }
      ].map((tab) => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`pb-4 text-sm transition-all ${
            activeTab === tab.key
              ? "text-orange-500 border-b-2 border-orange-500"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>

    {/* Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* LEFT CONTENT */}
      <div>

        {/* Dynamic Headline */}
        <h3 className="font-syne text-sm md:text-base font-bold text-white mb-3 leading-tight">
          {activeTab === "gulf" && (
            <>
              Local roots.<br />
              Regional scale.<br />
              Global ambition.
            </>
          )}
          {activeTab === "intl" && (
            <>
              Expanding to the Gulf?<br />
              Skip the two-year<br />
              cold start.
            </>
          )}
          {activeTab === "investors" && (
            <>
              Signal before noise.<br />
              See deals before<br />
              the market.
            </>
          )}
        </h3>

        {/* Description */}
        <p className="text-gray-400 mb-4 max-w-xl text-xs">
          {activeTab === "gulf" &&
            "You're building something real in the Gulf. MFC helps you find the right program, investor, and network — without wasting cycles."}

          {activeTab === "intl" &&
            "Six countries. Multiple frameworks. MFC helps you enter as an insider — not a tourist."}

          {activeTab === "investors" &&
            "Access AI-scored deal flow from real builders — not just pitch decks."}
        </p>

        {/* Bullet Points */}
        <div className="space-y-2 text-xs">
          {activeTab === "gulf" && (
            <>
              <p className="text-gray-300">→ AI Next-Step Engine</p>
              <p className="text-gray-300">→ Grant & Program Matcher</p>
              <p className="text-gray-300">→ Investor Matching</p>
              <p className="text-gray-300">→ Curated Mastermind Groups</p>
              <p className="text-gray-300">→ Demo Day Access</p>
            </>
          )}

          {activeTab === "intl" && (
            <>
              <p className="text-gray-300">→ Gulf Entry Navigator</p>
              <p className="text-gray-300">→ Jurisdiction Matching</p>
              <p className="text-gray-300">→ Trusted Supplier Network</p>
              <p className="text-gray-300">→ Regulatory Intelligence</p>
              <p className="text-gray-300">→ Local Founder Community</p>
            </>
          )}

          {activeTab === "investors" && (
            <>
              <p className="text-gray-300">→ AI-Scored Deal Flow</p>
              <p className="text-gray-300">→ Private Deal Rooms</p>
              <p className="text-gray-300">→ Due Diligence Packs</p>
              <p className="text-gray-300">→ Gulf Startup Pulse</p>
              <p className="text-gray-300">→ Demo Day Priority Access</p>
            </>
          )}
        </div>
      </div>

      {/* RIGHT FEATURE CARDS */}
      <div className="space-y-3">

        {activeTab === "gulf" && (
          <>
            {["AI Next-Step Engine", "Grant & Program Matcher", "Investor Matching", "Global Expansion Corridors"].map((item, i) => (
              <div
                key={i}
                className="group border border-white/10 p-3 transition-all duration-300 hover:bg-orange-500/10 hover:border-orange-500/40"
              >
                <h4 className="text-white font-semibold mb-0.5 text-xs">{item}</h4>
                <p className="text-gray-400 text-xs">
                  Clear, curated access aligned to your stage and ambition.
                </p>
              </div>
            ))}
          </>
        )}

        {activeTab === "intl" && (
          <>
            {["Gulf Entry Navigator", "Regulatory Intelligence", "Trusted Supplier Network", "Local Founder Community"].map((item, i) => (
              <div
                key={i}
                className="group border border-white/10 p-3 transition-all duration-300 hover:bg-orange-500/10 hover:border-orange-500/40"
              >
                <h4 className="text-white font-semibold mb-0.5 text-xs">{item}</h4>
                <p className="text-gray-400 text-xs">
                  Enter the Gulf ecosystem with confidence and clarity.
                </p>
              </div>
            ))}
          </>
        )}

        {activeTab === "investors" && (
          <>
            {["AI-Scored Deal Flow", "Private Deal Rooms", "Due Diligence Packs", "Gulf Startup Pulse"].map((item, i) => (
              <div
                key={i}
                className="group border border-white/10 p-3 transition-all duration-300 hover:bg-orange-500/10 hover:border-orange-500/40"
              >
                <h4 className="text-white font-semibold mb-0.5 text-xs">{item}</h4>
                <p className="text-gray-400 text-xs">
                  Curated visibility into the Gulf's most promising founders.
                </p>
              </div>
            ))}
          </>
        )}

      </div>

    </div>
  </div>
</section>


{/* HOW IT WORKS */}

<section className="py-6 px-[4vw] border-t border-white/10" id="how">
  <div className="max-w-7xl mx-auto">

    {/* Header */}
    <motion.div
      className="mb-6"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center gap-3 text-orange-500 text-xs uppercase tracking-[0.2em] mb-2">
        <span className="w-8 h-[1px] bg-orange-500"></span>
        How it works
      </div>

      <h2 className="text-lg md:text-xl font-black leading-[1.05] text-white max-w-4xl">
        One platform.<br />
        One clear next step.
      </h2>
    </motion.div>

    {/* Steps Grid */}
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={staggerContainer}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
    >
      {[
        {
          step: 'STEP 01',
          title: 'Build Your Profile',
          desc: '5 questions. Stage, sector, geography, funding status, and goal. Under two minutes. Instantly useful.'
        },
        {
          step: 'STEP 02',
          title: 'Get Your Next Step',
          desc: 'The AI engine scans every GCC program, grant, investor, and free zone — and gives you one clear recommendation.'
        },
        {
          step: 'STEP 03',
          title: 'Connect & Apply',
          desc: 'Match with the right accelerator, apply to the right grant, get a warm introduction to the right investor — all inside the platform.'
        },
        {
          step: 'STEP 04',
          title: 'Scale With the Room',
          desc: 'Join masterminds, attend events, go on ecosystem trips. Your next step updates automatically as your milestones evolve.'
        }
      ].map((item, i) => (
        <motion.div
          key={i}
          variants={fadeInUp}
          className="group p-3 bg-white/5 border border-white/10 
                     hover:bg-orange-500/10 transition-all duration-300 rounded-lg"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs tracking-widest text-orange-500 font-semibold">
              {item.step}
            </span>

            <span className="text-white/40 text-xs transition-colors duration-300 group-hover:text-orange-500">
              →
            </span>
          </div>

          <h3 className="text-xs font-semibold text-white mb-1">
            {item.title}
          </h3>

          <p className="text-gray-400 text-xs leading-4">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </motion.div>

  </div>
</section>

      {/* BETA FORM */}
<section className="py-8 px-[4vw] border-t border-white/10 relative" id="beta">
  <div className="max-w-5xl mx-auto">

    {/* Header */}
    <motion.div
      className="text-center mb-8"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="inline-flex items-center gap-2 border border-orange-500/40 text-orange-500 
                      text-xs uppercase tracking-widest px-3 py-1 rounded-full mb-4">
        • Now accepting beta applications
      </div>

      <h2 className="text-2xl md:text-3xl font-black leading-[1.05] text-white mb-3">
        Get early access.<br />
        Build with us.
      </h2>

      <p className="text-gray-400 text-sm max-w-2xl mx-auto leading-relaxed">
        We're opening the platform to a first cohort of Gulf founders and
        international companies expanding to the Gulf. Free. No credit card. Just signal.
      </p>
    </motion.div>

    {/* Form */}
    <motion.form
      className="space-y-4 border border-white/10 p-6 md:p-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >

      {/* Name Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-gray-400">First Name</label>
          <input
            className="w-full bg-transparent border border-white/10 text-white px-3 py-2 text-sm
                       focus:border-orange-500 outline-none transition-colors"
            type="text"
            placeholder="Katerina"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-gray-400">Last Name</label>
          <input
            className="w-full bg-transparent border border-white/10 text-white px-3 py-2 text-sm
                       focus:border-orange-500 outline-none transition-colors"
            type="text"
            placeholder="Hayes"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider text-gray-400">Email Address</label>
        <input
          className="w-full bg-transparent border border-white/10 text-white px-3 py-2 text-sm
                     focus:border-orange-500 outline-none transition-colors"
          type="email"
          placeholder="you@company.com"
          required
        />
      </div>

      {/* Company + Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-gray-400">Company / Startup Name</label>
          <input
            className="w-full bg-transparent border border-white/10 text-white px-3 py-2 text-sm
                       focus:border-orange-500 outline-none transition-colors"
            type="text"
            placeholder="Your startup"
          />
        </div>

        <div className="space-y-1">
          <label className="text-xs uppercase tracking-wider text-gray-400">Based In</label>
          <select
            className="w-full bg-transparent border border-white/10 text-white px-3 py-2 text-sm
                       focus:border-orange-500 outline-none transition-colors cursor-pointer"
            defaultValue=""
          >
            <option value="" disabled>Select your country</option>
            <option>UAE</option>
            <option>Saudi Arabia</option>
            <option>Qatar</option>
            <option>Kuwait</option>
            <option>Bahrain</option>
            <option>Oman</option>
            <option>UK</option>
            <option>USA</option>
            <option>India</option>
            <option>Other</option>
          </select>
        </div>
      </div>

      {/* Stage */}
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider text-gray-400">Startup Stage</label>
        <select
          className="w-full bg-transparent border border-white/10 text-white px-3 py-2 text-sm
                     focus:border-orange-500 outline-none transition-colors cursor-pointer"
          defaultValue=""
        >
          <option value="" disabled>Select your stage</option>
          <option>Pre-idea</option>
          <option>Idea Stage</option>
          <option>MVP / Prototype</option>
          <option>Early Revenue</option>
          <option>Growth Stage</option>
        </select>
      </div>

      {/* Challenge */}
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-wider text-gray-400">
          What's your biggest challenge right now? (Optional)
        </label>
        <textarea
          rows={3}
          className="w-full bg-transparent border border-white/10 text-white px-3 py-2 text-sm
                     focus:border-orange-500 outline-none transition-colors resize-none"
          placeholder="e.g. Finding the right free zone, connecting with Saudi investors..."
        />
      </div>

      {/* CTA */}
      <button
        type="submit"
        className="w-full bg-orange-500 hover:bg-orange-600 text-white 
                   font-semibold uppercase tracking-wider py-2 text-sm transition-colors"
      >
        Join the Beta — Free Access
      </button>

      <p className="text-center text-xs text-gray-500 pt-2">
        By submitting you agree to our{' '}
        <Link href="/privacy" className="text-gray-400 hover:text-orange-500 transition-colors no-underline">
          Privacy Policy
        </Link>
        {' '}and{' '}
        <Link href="/terms" className="text-gray-400 hover:text-orange-500 transition-colors no-underline">
          Terms & Conditions
        </Link>
        .
      </p>

    </motion.form>
  </div>
</section>

      {/* NEWSLETTER */}
      <section className="py-8 px-[4vw] border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <div className="text-orange-500 text-xs font-medium uppercase tracking-wider mb-1">Weekly newsletter</div>
              <h3 className="text-lg font-bold text-white leading-tight mb-2">The Gulf Pulse</h3>
              <p className="text-gray-400 text-xs">Weekly insights on regional startups, capital movements, and founder stories. Every Tuesday.</p>
            </div>
            <form className="flex gap-2">
              <input
                className="flex-1 bg-white/10 border border-white/20 text-white placeholder-gray-500 px-3 py-2 text-sm focus:border-orange-500 focus:bg-white/15 outline-none transition-colors"
                type="email"
                placeholder="Enter your email"
                required
              />
              <button
                className="bg-orange-500 text-white font-semibold uppercase tracking-wider px-5 py-2 text-sm hover:bg-orange-600 transition-colors whitespace-nowrap"
                type="submit"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 px-[4vw]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <a
  href="#hero"
  onClick={handleNavClick}
  className="inline-flex items-center gap-3 flex-shrink-0"
>
  {/* Logo Image */}
  <img
    src="/App Icon Orange.svg"   // place your logo inside /public folder
    alt="MyFounders.Club Logo"
    className="h-8 w-auto"
  />

  {/* Text */}
  <span className="hidden sm:inline font-bold text-white text-lg">
    MyFounders.Club
  </span>
</a>


              <p className="text-gray-500 text-xs leading-5 mb-4">The Gulf's ecosystem operating system connecting founders, capital, and opportunity.</p>
              <div className="flex gap-2">
                <a className="w-8 h-8 border border-white/20 flex items-center justify-center text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors text-xs" href="https://linkedin.com" target="_blank" rel="noopener">
                  in
                </a>
                <a className="w-8 h-8 border border-white/20 flex items-center justify-center text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors" href="https://instagram.com" target="_blank" rel="noopener">
                  📷
                </a>
                <a className="w-8 h-8 border border-white/20 flex items-center justify-center text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors" href="https://x.com" target="_blank" rel="noopener">
                  𝕏
                </a>
                <a className="w-8 h-8 border border-white/20 flex items-center justify-center text-gray-400 hover:border-orange-500 hover:text-orange-500 transition-colors" href="https://youtube.com" target="_blank" rel="noopener">
                  ▶️
                </a>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-white font-bold mb-3">Platform</div>
              <ul className="space-y-2">
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-xs" href="#features">For Founders</a></li>
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-xs" href="#investors">For Investors</a></li>
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-xs" href="#programs">Programs</a></li>
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-xs" href="#community">Community</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-white font-bold mb-3">Company</div>
              <ul className="space-y-2">
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-xs" href="#about">About</a></li>
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-xs" href="#blog">Blog</a></li>
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-xs" href="#careers">Careers</a></li>
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-xs" href="#contact">Contact</a></li>
              </ul>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-white font-bold mb-3">Legal</div>
              <ul className="space-y-2">
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-xs" href="/privacy">Privacy Policy</a></li>
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-xs" href="/terms">Terms of Service</a></li>
                <li><a className="text-gray-500 hover:text-orange-500 transition-colors text-xs" href="#cookies">Cookie Policy</a></li>
              </ul>
            </div>
          </motion.div>

          <div className="flex items-center justify-between flex-wrap gap-2 border-t border-white/10 pt-4">
            <p className="text-gray-600 text-xs">© 2026 MyFounders.Club. All rights reserved.</p>
            <div className="flex gap-4 flex-wrap">
              <a className="text-gray-600 hover:text-orange-500 transition-colors text-xs" href="/privacy">Privacy</a>
              <a className="text-gray-600 hover:text-orange-500 transition-colors text-xs" href="/terms">Terms</a>
            </div>
          </div>
        </div>
      </footer>
      </motion.div>
  )
}