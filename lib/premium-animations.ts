// Premium bi-directional scroll animation configurations
// Institutional, smooth, fintech-grade animations

export const premiumAnimations = {
  // Hero & Top-Level Sections
  fadeInUp: {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 40 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }, // smooth ease-out
  },

  // Staggered List Items
  staggerContainer: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },

  staggerItem: {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 30 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },

  // Cards & Feature Blocks
  scaleIn: {
    initial: { opacity: 0.8, scale: 0.95 },
    whileInView: { opacity: 1, scale: 1 },
    exit: { opacity: 0.8, scale: 0.95 },
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },

  // Side Slides
  slideInLeft: {
    initial: { opacity: 0, x: -40 },
    whileInView: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -40 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },

  slideInRight: {
    initial: { opacity: 0, x: 40 },
    whileInView: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 40 },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },

  // Subtle Parallax
  parallax: {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 60 },
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
  },

  // Number Counter Reveal
  numberReveal: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },

  // Hover Effects
  hoverLift: {
    whileHover: { y: -8, transition: { duration: 0.3 } },
  },

  hoverGlow: {
    whileHover: {
      boxShadow: '0 0 30px rgba(255, 91, 35, 0.3)',
      transition: { duration: 0.3 },
    },
  },
}

// Viewport configuration for smooth bi-directional detection
export const scrollViewportConfig = {
  once: false, // Allow re-triggers on scroll up
  margin: '-100px', // Trigger slightly before/after viewport
}

// Easing functions
export const smoothEasing = [0.22, 1, 0.36, 1] // cubic-bezier for premium feel
export const gentleEasing = [0.25, 0.46, 0.45, 0.94] // gentle ease-out

// Animation preset combinations
export const premiumReveal = {
  fade: { opacity: 0 },
  translate: { y: 30 },
  scale: { scale: 0.98 },
}
