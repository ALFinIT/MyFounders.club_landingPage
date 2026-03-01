/**
 * Premium Motion System - Bi-directional, Scroll-triggered Animations
 * Designed for high-end, investor-grade experience
 */

export const premiumScrollRevealConfig = {
  once: false, // Allow bi-directional animations
  amount: 0.3, // Trigger when 30% of element is visible
}

/**
 * Scroll Reveal: Subtle opacity + vertical translation
 * Movement: 20-40px upward
 * Duration: 0.6-0.8s (smooth, calm)
 * Easing: ease-out or cubic-bezier for elegance
 */
export const scrollRevealVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1], // Premium ease-out
    },
  },
  exit: {
    opacity: 0,
    y: 30,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/**
 * Staggered Grid/List Animations
 * Consistent, short delays for subtle cascade effect
 */
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08, // Short, consistent delay
      delayChildren: 0.1,
      duration: 0.6,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.06,
      staggerDirection: -1,
    },
  },
}

export const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/**
 * Card Hover: Subtle lift + scale
 * No bounce, refined and controlled
 */
export const cardHoverVariants = {
  initial: {
    y: 0,
    scale: 1,
    boxShadow: '0 4px 12px rgba(255, 91, 35, 0.1)',
  },
  hover: {
    y: -8, // Subtle lift
    scale: 1.02, // Minimal scale
    boxShadow: '0 16px 32px rgba(255, 91, 35, 0.2)',
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

/**
 * Button Hover: Lift + slight glow
 */
export const buttonHoverVariants = {
  initial: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -3,
    scale: 1.03,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
  tap: {
    scale: 0.98,
    y: 2,
  },
}

/**
 * Section Header Animation
 * Larger entrance with controlled motion
 */
export const sectionHeaderVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/**
 * Heading with Character-like Reveal
 */
export const headingVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/**
 * Text Block Reveal
 */
export const textVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/**
 * Input Field Stagger
 */
export const formFieldVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.05,
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

/**
 * Tab/Navigation Transition
 */
export const tabTransitionVariants = {
  initial: { opacity: 0, x: 10 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    x: -10,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
}

/**
 * Icon Rotation on Hover
 */
export const iconRotateVariants = {
  initial: { rotate: 0 },
  hover: {
    rotate: 12,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
}

/**
 * Arrow Movement (subtle directional)
 */
export const arrowMoveVariants = {
  initial: { x: 0 },
  hover: {
    x: 4,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
}

/**
 * Background Gradient Shift (subtle)
 */
export const gradientShiftVariants = {
  initial: {
    backgroundPosition: '0% 50%',
  },
  animate: {
    backgroundPosition: '100% 50%',
    transition: {
      duration: 3,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  },
}

/**
 * Section Flow Transition
 * Smooth visual progression between sections
 */
export const sectionFlowVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/**
 * Modal/Dialog Entrance
 */
export const modalVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

/**
 * Backdrop Fade
 */
export const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
}

/**
 * Micro-interaction: Pulse
 * Subtle attention-grabbing
 */
export const pulseVariants = {
  animate: {
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/**
 * Accessibility Aware Animation Config
 * Returns reduced motion variants if user prefers reduced motion
 */
export const getAccessibleVariants = (variants: any, reducedMotion = false) => {
  if (reducedMotion) {
    return {
      ...variants,
      transition: {
        ...(variants.transition || {}),
        duration: 0,
      },
    }
  }
  return variants
}
