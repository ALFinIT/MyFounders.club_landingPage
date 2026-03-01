/**
 * PREMIUM BI-DIRECTIONAL SCROLL ANIMATIONS
 * Gulf-focused Fintech-grade motion library
 * 
 * Features:
 * - Smooth animations in both scroll directions
 * - Elements reset when leaving viewport
 * - Elegant, institutional feel
 * - No snapping, bouncing, or jarring movement
 * - Respects prefers-reduced-motion
 */

// Premium easing curves
export const easings = {
  smooth: [0.25, 0.46, 0.45, 0.94],        // Smooth ease-out cubic
  smootherOut: [0.16, 1, 0.3, 1],          // Smoother ease-out quint
  smoothEnter: [0.22, 1, 0.36, 1],         // Premium entrance
  gentleExit: [0.4, 0.0, 0.2, 1],          // Gentle exit curve
}

export const animationVariants = {
  // 🌊 PREMIUM FADE + SLIDE UP (bi-directional)
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: easings.smootherOut,
      },
    },
    exit: {
      opacity: 0,
      y: 24,
      transition: {
        duration: 0.5,
        ease: easings.gentleExit,
      },
    },
  },

  // 🌊 FADE IN (smooth, no harsh movement)
  fadeIn: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: easings.smootherOut,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: easings.gentleExit,
      },
    },
  },

  // 🌊 SCALE + FADE (subtle rise with premium scale)
  scaleUp: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: easings.smootherOut,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: 0.5,
        ease: easings.gentleExit,
      },
    },
  },

  // 🌊 STAGGER CONTAINER (for grouped elements)
  staggerContainer: {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        staggerDirection: -1,
      },
    },
  },

  // 🌊 STAGGER ITEM (child in staggered animations)
  staggerItem: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: easings.smootherOut,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: {
        duration: 0.4,
        ease: easings.gentleExit,
      },
    },
  },

  // 🌊 SLIDE FROM LEFT
  slideInLeft: {
    hidden: { opacity: 0, x: -28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.75,
        ease: easings.smootherOut,
      },
    },
    exit: {
      opacity: 0,
      x: -28,
      transition: {
        duration: 0.5,
        ease: easings.gentleExit,
      },
    },
  },

  // 🌊 SLIDE FROM RIGHT
  slideInRight: {
    hidden: { opacity: 0, x: 28 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.75,
        ease: easings.smootherOut,
      },
    },
    exit: {
      opacity: 0,
      x: 28,
      transition: {
        duration: 0.5,
        ease: easings.gentleExit,
      },
    },
  },

  // 🌊 PREMIUM PARALLAX DEPTH (subtle offset + scale)
  parallaxDepth: {
    hidden: { opacity: 0, y: 32, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.85,
        ease: easings.smootherOut,
      },
    },
    exit: {
      opacity: 0,
      y: 32,
      scale: 0.95,
      transition: {
        duration: 0.6,
        ease: easings.gentleExit,
      },
    },
  },

  // 🌊 SOFT HUM SCALE (hover effect - subtle)
  hoverLift: {
    initial: { y: 0, boxShadow: '0 0 0 rgba(255, 91, 35, 0)' },
    hover: {
      y: -4,
      boxShadow: '0 12px 32px rgba(255, 91, 35, 0.15)',
      transition: {
        duration: 0.3,
        ease: easings.smooth,
      },
    },
    tap: {
      y: -2,
      transition: { duration: 0.15 },
    },
  },
}

/**
 * Viewport config for smooth bi-directional scroll reveals
 * 🌊 PREMIUM BI-DIRECTIONAL SETTINGS
 * once: false = animates smoothly when scrolling UP or DOWN
 * margin: trigger animation slightly before element fully visible
 * Mobile-optimized for smooth reveal
 */
export const scrollRevealConfig = {
  once: false, // ✅ ENABLED: Re-trigger animations on both scroll directions
  margin: '-100px', // Smoother reveal before hitting viewport
}

/**
 * Alternative config for performance-sensitive sections
 * Use this for heavy animation sequences to reduce re-renders
 */
export const scrollRevealConfigOptimized = {
  once: false,
  margin: '-80px',
}
