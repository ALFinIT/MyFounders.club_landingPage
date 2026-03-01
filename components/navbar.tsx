'use client'

import { motion } from 'framer-motion'
import { Plus, X, Settings, LogOut, Layout } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useLocale } from 'next-intl'
import { Logo } from './logo'
import { useAuth } from '@/context/auth-context'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [userImage, setUserImage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user, logout } = useAuth()
  const router = useRouter()
  const locale = useLocale()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Load user image from localStorage
  useEffect(() => {
    if (user) {
      const storedImage = localStorage.getItem(`user_image_${user.id}`)
      if (storedImage) {
        setUserImage(storedImage)
      } else {
        // Set default AI avatar if no image
        const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || user.email)}&background=random&color=fff`
        setUserImage(defaultAvatar)
      }
    }
    setIsLoading(false)
  }, [user])

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false)
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])

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
        // fallback: update hash
        window.location.hash = href
      }
      setIsOpen(false)
      return
    }

    // Internal page links -> navigate then smooth scroll to top
    if (href.startsWith('/')) {
      e.preventDefault()
      setIsOpen(false)
      router.push(href)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const prefetchRoute = (href?: string | null) => {
    if (!href) return
    try {
      if (href.startsWith('/')) router.prefetch(href)
    } catch (e) {
      // ignore
    }
  }

  return (
    <>
      {/* Floating Navbar - Centered */}
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="glass rounded-full px-4 sm:px-6 py-3 w-full max-w-4xl flex items-center justify-between">

          {/* Left: Logo + Text */}
          <a href="#hero" onClick={handleNavClick} className="inline-flex items-center gap-3 flex-shrink-0">
            <Logo />
            <span className="hidden sm:inline font-bold text-white text-lg">My Founders Club</span>
          </a>

          {/* Right: Desktop Menu + Language + CTA */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            {/* Menu Items */}
            <div className="flex items-center gap-4">
              <a href="#founders" onClick={handleNavClick} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-white transition-colors font-light whitespace-nowrap">
                For Founders
              </a>
              <a href="#international" onClick={handleNavClick} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-white transition-colors font-light whitespace-nowrap">
                International Entry
              </a>
              <a href="#how" onClick={handleNavClick} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-white transition-colors font-light whitespace-nowrap">
                How It Works
              </a>
              <a href="/survey" onClick={handleNavClick} className="text-xs uppercase tracking-widest text-muted-foreground hover:text-white transition-colors font-light whitespace-nowrap">
                Survey
              </a>
            </div>

            {/* Language Toggle */}
            <div className="flex items-center gap-2 border-l border-white/20 pl-6">
              <button
                onClick={() => router.push(`/${locale === 'ar' ? 'en' : 'ar'}`)}
                className="px-3 py-1 rounded-lg text-xs uppercase tracking-widest font-medium transition-all"
                style={{
                  backgroundColor: locale === 'ar' ? 'rgba(255, 165, 0, 0.2)' : 'transparent',
                  color: locale === 'ar' ? '#FFA500' : '#9CA3AF',
                  borderRight: '1px solid rgba(255, 165, 0, 0.2)'
                }}
              >
                عربي
              </button>
              <button
                onClick={() => router.push(`/${locale === 'en' ? 'ar' : 'en'}`)}
                className="px-3 py-1 rounded-lg text-xs uppercase tracking-widest font-medium transition-all"
                style={{
                  backgroundColor: locale === 'en' ? 'rgba(255, 165, 0, 0.2)' : 'transparent',
                  color: locale === 'en' ? '#FFA500' : '#9CA3AF'
                }}
              >
                EN
              </button>
            </div>

            {/* Join Beta / User Menu */}
            <div className="flex items-center gap-2 md:gap-3">
              {user && !isLoading ? (
                <div className="relative">
                  <motion.button
                    ref={buttonRef}
                    onClick={() => setIsUserMenuOpen(prev => !prev)}
                    className="h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg hover:shadow-orange-500/50 transition-all overflow-hidden border border-orange-400/30"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    title={user.name || user.email}
                  >
                    {userImage && (
                      <img
                        src={userImage}
                        alt={user.name || 'User'}
                        className="w-full h-full object-cover object-top rounded-full"
                      />
                    )}
                  </motion.button>
                </div>
              ) : (
                <Link
                  href="/auth?mode=signup"
                  className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full text-sm font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/60 transition-all overflow-hidden group relative flex-shrink-0"
                >
                  <motion.span
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative z-10 inline-block"
                  >
                    Join Beta
                  </motion.span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-700 -z-10"
                    initial={{ x: '100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language Toggle */}
            <div className="flex items-center gap-1 text-xs">
              <button
                onClick={() => router.push(`/${locale === 'ar' ? 'en' : 'ar'}`)}
                className="px-2 py-1 rounded text-xs font-medium transition-all"
                style={{
                  backgroundColor: locale === 'ar' ? 'rgba(255, 165, 0, 0.3)' : 'transparent',
                  color: locale === 'ar' ? '#FFA500' : '#9CA3AF'
                }}
              >
                عربي
              </button>
              <span className="text-white/30">/</span>
              <button
                onClick={() => router.push(`/${locale === 'en' ? 'ar' : 'en'}`)}
                className="px-2 py-1 rounded text-xs font-medium transition-all"
                style={{
                  backgroundColor: locale === 'en' ? 'rgba(255, 165, 0, 0.3)' : 'transparent',
                  color: locale === 'en' ? '#FFA500' : '#9CA3AF'
                }}
              >
                EN
              </button>
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white flex-shrink-0 ml-2"
            >
              {isOpen ? <X size={24} /> : <Plus size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* User Dropdown - Rendered Outside Navbar */}
      {user && !isLoading && isUserMenuOpen && (
        <motion.div
    ref={dropdownRef}
    className="fixed top-[88px] left-1/2 -translate-x-1/2 md:left-auto md:right-[calc((100vw-768px)/2+24px)] w-72 max-w-[calc(100vw-2rem)] bg-black/80 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl p-6 z-[9999]"
    initial={{ opacity: 0, scale: 0.8, y: -10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.8, y: -10 }}
  >
          {/* User Profile Section */}
          <div className="text-center mb-4 pb-4 border-b border-white/20">
            <p className="text-white font-semibold text-lg">{user.name || 'User'}</p>
            <p className="text-white/70 text-xs">{user.email}</p>
          </div>

          {/* Menu Items */}
          <div className="space-y-2 mb-4">
            <Link href="/settings">
              <motion.div
                className="w-full flex items-center gap-3 px-4 py-2 bg-black/10 hover:bg-white/5 rounded-lg transition-colors text-white text-sm cursor-pointer"
                whileHover={{ x: 4 }}
                onClick={() => setIsUserMenuOpen(false)}
              >
                <Settings className="w-4 h-4" />
                Settings & Profile
              </motion.div>
            </Link>

            <Link href="/dashboard">
              <motion.div
                className="w-full flex items-center gap-3 px-4 py-2 bg-black/10 hover:bg-white/5 rounded-lg transition-colors text-white text-sm cursor-pointer"
                whileHover={{ x: 4 }}
                onClick={() => setIsUserMenuOpen(false)}
              >
                <Layout className="w-4 h-4" />
                Dashboard
              </motion.div>
            </Link>

            <motion.button
              onClick={() => {
                logout()
                setIsUserMenuOpen(false)
              }}
              className="w-full flex items-center gap-3 px-4 py-2 bg-black/10 hover:bg-red-600/30 rounded-lg transition-colors text-white text-sm"
              whileHover={{ x: 4 }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </motion.button>
          </div>

          {/* Social Media Icons */}
          <div className="border-t border-white/20 pt-4">
            <p className="text-white/70 text-xs mb-3 text-center font-semibold">Follow us</p>
            <div className="flex items-center justify-center gap-3">
              <a href="https://twitter.com/my_founders_club" target="_blank" rel="noopener noreferrer" className="p-2 text-white bg-black/10 hover:bg-white/5 rounded-full transition-all flex items-center justify-center" title="X (Twitter)">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="white" d="M17.53 3H21l-7.19 8.19L22 21h-6.56l-5.25-6.28L3.5 21H0l7.78-8.89L2 3h6.68l4.73 5.67L17.53 3zm-1.1 15.5h1.85L8.62 5.59H6.66l9.77 12.91z"></path></svg>
              </a>
              <a href="https://linkedin.com/company/my-founders-club" target="_blank" rel="noopener noreferrer" className="p-2 text-white bg-black/10 hover:bg-white/5 rounded-full transition-all flex items-center justify-center" title="LinkedIn">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="white" d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm15.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 0 3.6 2 3.6 4.59v4.72z"></path></svg>
              </a>
              <a href="https://instagram.com/my_founders_club" target="_blank" rel="noopener noreferrer" className="p-2 text-white bg-black/10 hover:bg-white/5 rounded-full transition-all flex items-center justify-center" title="Instagram">
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="white" d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.056 1.97.24 2.43.41.59.22 1.01.48 1.45.92.44.44.7.86.92 1.45.17.46.354 1.26.41 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.056 1.17-.24 1.97-.41 2.43-.22.59-.48 1.01-.92 1.45-.44.44-.86.7-1.45.92-.46.17-1.26.354-2.43.41-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.056-1.97-.24-2.43-.41-.59-.22-1.01-.48-1.45-.92-.44-.44-.7-.86-.92-1.45-.17-.46-.354-1.26-.41-2.43C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.056-1.17.24-1.97.41-2.43.22-.59.48-1.01.92-1.45.44-.44.86-.7 1.45-.92.46-.17 1.26-.354 2.43-.41C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.012 7.052.07c-1.28.058-2.16.25-2.91.53-.8.3-1.48.7-2.16 1.38-.68.68-1.08 1.36-1.38 2.16-.28.75-.472 1.63-.53 2.91C.012 8.332 0 8.736 0 12c0 3.264.012 3.668.07 4.948.058 1.28.25 2.16.53 2.91.3.8.7 1.48 1.38 2.16.68.68 1.36 1.08 2.16 1.38.75.28 1.63.472 2.91.53C8.332 23.988 8.736 24 12 24s3.668-.012 4.948-.07c1.28-.058 2.16-.25 2.91-.53.8-.3 1.48-.7 2.16-1.38.68-.68 1.08-1.36 1.38-2.16.28-.75.472-1.63.53-2.91.058-1.28.07-1.684.07-4.948s-.012-3.668-.07-4.948c-.058-1.28-.25-2.16-.53-2.91-.3-.8-.7-1.48-1.38-2.16-.68-.68-1.36-1.08-2.16-1.38-.75-.28-1.63-.472-2.91-.53C15.668.012 15.264 0 12 0zm0 5.838A6.162 6.162 0 0 0 5.838 12 6.162 6.162 0 0 0 12 18.162 6.162 6.162 0 0 0 18.162 12 6.162 6.162 0 0 0 12 5.838zm0 10.162A3.999 3.999 0 1 1 12 8a3.999 3.999 0 0 1 0 7.999zm6.406-11.845a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"></path></svg>
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          className="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black/50 backdrop-blur-sm md:hidden flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            className="mt-20 mx-4 glass rounded-2xl p-6 w-full max-w-xs self-center"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col gap-4">
              <a href="#founders" onClick={handleNavClick} className="text-sm text-gray-300 hover:text-orange-400 transition-colors px-3 py-2">
                For Founders
              </a>
              <a href="#international" onClick={handleNavClick} className="text-sm text-gray-300 hover:text-orange-400 transition-colors px-3 py-2">
                International Entry
              </a>
              <a href="#how" onClick={handleNavClick} className="text-sm text-gray-300 hover:text-orange-400 transition-colors px-3 py-2">
                How It Works
              </a>
              <a href="/survey" onClick={handleNavClick} className="text-sm text-gray-300 hover:text-orange-400 transition-colors px-3 py-2">
                Survey
              </a>

              {user ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsOpen(false)} className="w-full block text-center px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold text-sm mt-2">
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="w-full px-4 py-2.5 bg-red-500/20 border border-red-500 text-red-400 rounded-lg font-semibold text-sm"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/auth?mode=signup" onClick={() => setIsOpen(false)} className="w-full block text-center px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold text-sm mt-2">
                  Join Beta
                </Link>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
