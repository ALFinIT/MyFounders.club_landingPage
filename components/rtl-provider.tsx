'use client'

import { useEffect } from 'react'
import { useLocale } from 'next-intl'

export function RTLProvider() {
  const locale = useLocale()

  useEffect(() => {
    const isArabic = locale === 'ar'
    
    // Set language and direction
    document.documentElement.lang = locale
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr'
    
    // Apply to body for additional styling
    document.body.dir = isArabic ? 'rtl' : 'ltr'
    
    // Apply RTL-specific classes
    if (isArabic) {
      document.documentElement.classList.add('rtl', 'arabic')
      document.body.classList.add('rtl', 'arabic')
    } else {
      document.documentElement.classList.remove('rtl', 'arabic')
      document.body.classList.remove('rtl', 'arabic')
    }
  }, [locale])

  return null
}

