'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { useLocale } from 'next-intl'

interface LanguageContextType {
  isTransitioning: boolean
  switchLanguage: (locale: string) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const currentLocale = useLocale()

  const switchLanguage = useCallback((locale: string) => {
    if (locale !== currentLocale) {
      setIsTransitioning(true)
      // The fade out/in will be handled by the component using this context
    }
  }, [currentLocale])

  return (
    <LanguageContext.Provider value={{ isTransitioning, switchLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguageTransition() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguageTransition must be used within LanguageProvider')
  }
  return context
}
