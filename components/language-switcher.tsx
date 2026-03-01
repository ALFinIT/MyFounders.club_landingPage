'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from '@/lib/i18n'
import { locales } from '@/lib/i18n'
import { useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe } from 'lucide-react'

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = useLocale()

  const switchLocale = (locale: string) => {
    if (locale !== currentLocale) {
      setIsTransitioning(true)
      setTimeout(() => {
        // navigate to the same pathname under selected locale
        const target = `/${locale}${pathname}`
        router.replace(target)
        setIsOpen(false)
      }, 150)
    }
  }

  useEffect(() => {
    setIsTransitioning(false)
  }, [currentLocale])

  return (
    <div className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white hover:bg-white/20 transition-colors whitespace-nowrap"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={currentLocale}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            {/* use globe icon instead of emoji */}
            <Globe className="inline-block w-4 h-4 mr-1" /> {currentLocale === 'en' ? 'EN' : 'عربي'}
          </motion.span>
        </AnimatePresence>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 right-0 bg-black/95 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden min-w-[140px]"
          >
            {locales.map((locale) => (
              <motion.button
                key={locale}
                onClick={() => switchLocale(locale)}
                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                className={`block w-full px-4 py-2 text-sm text-left transition-colors ${
                  currentLocale === locale 
                    ? 'bg-orange-500 text-white' 
                    : 'text-white'
                }`}
              >
                {locale === 'en' ? '🇬🇧 English' : '🇸🇦 العربية'}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}