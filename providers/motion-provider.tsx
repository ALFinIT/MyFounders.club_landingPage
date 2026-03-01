'use client'

import { MotionConfig } from 'framer-motion'
import { ReactNode } from 'react'

/**
 * MotionProvider
 * Wraps the entire app with MotionConfig so that:
 * - Framer Motion respects the user's "prefers-reduced-motion" OS setting
 * - All animation durations and distances are automatically reduced/disabled
 *   when the user has requested reduced motion.
 *
 * This is the cleanest, most performant way to handle reduced motion globally
 * across all framer-motion components without touching each component individually.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
