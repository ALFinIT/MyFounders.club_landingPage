/**
 * Premium Motion Design System - Configuration and Utilities
 * Matches Stripe/Linear/Vercel aesthetic with GPU-optimized animations
 */

import { Variants, TargetAndTransition, Transition } from 'framer-motion'

// Core timing configurations
export const TIMING = {
  FAST: 0.2,
  NORMAL: 0.3,
  MEDIUM: 0.5,
  SLOW: 0.8,
  EXTRA_SLOW: 1.2,
} as const

// Easing functions for premium feel
export const EASING = {
  EASE_OUT_CUBIC: [0.215, 0.61, 0.355, 1],
  EASE_OUT_EXPO: [0.19, 1, 0.22, 1],
  EASE_IN_OUT_CUBIC: [0.645, 0.045, 0.355, 1],
  EASE_IN_OUT_BACK: [0.68, -0.55, 0.265, 1.55],
  EASE_OUT_BACK: [0.175, 0.885, 0.32, 1.275],
} as const

// Hero Typography Animations - Kinetic entrance with stagger
export const heroTypographyVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.MEDIUM,
      ease: EASING.EASE_OUT_CUBIC,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: TIMING.NORMAL,
    },
  },
}

// Container for staggering child elements
export const heroContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

// Scroll Reveal Animations - Fade in + upward motion
export const scrollRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.MEDIUM,
      ease: EASING.EASE_OUT_CUBIC,
    },
  },
}

// Stagger container for scroll reveals
export const scrollRevealContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

// Card Hover Effects
export const cardHoverVariants: Variants = {
  initial: {
    y: 0,
    scale: 1,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
  },
  hover: {
    y: -8,
    scale: 1.02,
    boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
    transition: {
      duration: TIMING.NORMAL,
      ease: EASING.EASE_OUT_CUBIC,
    },
  },
}

// Button Micro-interactions
export const buttonVariants: Variants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: TIMING.FAST,
      ease: EASING.EASE_OUT_CUBIC,
    },
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: TIMING.FAST,
    },
  },
}

// Page Transition - Cross fade
export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: TIMING.NORMAL,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: TIMING.NORMAL,
      ease: 'easeIn',
    },
  },
}

// Page Transition - Slide from bottom (alternative)
export const pageSlideVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: TIMING.MEDIUM,
      ease: EASING.EASE_OUT_CUBIC,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: TIMING.NORMAL,
    },
  },
}

// Fade In - Generic fade animation
export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: TIMING.MEDIUM,
    },
  },
}

// Scale In - Entrance with scale
export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: TIMING.MEDIUM,
      ease: EASING.EASE_OUT_BACK,
    },
  },
}

// Rotate In - Rotate on entrance
export const rotateInVariants: Variants = {
  hidden: {
    opacity: 0,
    rotate: -10,
  },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: TIMING.MEDIUM,
      ease: EASING.EASE_OUT_CUBIC,
    },
  },
}

// Utility function for respecting prefers-reduced-motion
export const getTransitionDuration = (
  preferredDuration: number,
  respectsAccessibility: boolean = true
): number => {
  if (!respectsAccessibility) return preferredDuration

  if (typeof window !== 'undefined') {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return prefersReduced ? 0.01 : preferredDuration
  }

  return preferredDuration
}

// Utility function for reduced motion variants
export const createAccessibleVariant = (baseVariant: Variants): Variants => {
  const accessible: Variants = {}

  for (const [key, config] of Object.entries(baseVariant)) {
    if (typeof config === 'object' && config !== null && 'transition' in config) {
      accessible[key] = {
        ...config,
        transition: {
          ...config.transition,
          duration: 0.01,
        },
      }
    } else {
      accessible[key] = config
    }
  }

  return accessible
}
