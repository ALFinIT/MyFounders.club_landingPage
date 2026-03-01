'use client'

import React from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { pageTransitionVariants, pageSlideVariants } from '@/lib/motion-configs'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: React.ReactNode
  variant?: 'fade' | 'slide'
  className?: string
}

/**
 * PageTransition Component - Smooth page transitions between routes
 * Prevents layout shift and hard visual cuts
 */
export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  variant = 'fade',
  className = '',
}) => {
  const pathname = usePathname()

  const variants = variant === 'fade' ? pageTransitionVariants : pageSlideVariants

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

interface SectionTransitionProps {
  children: React.ReactNode
  id?: string
  className?: string
  delay?: number
}

/**
 * SectionTransition Component - Smooth transitions for page sections
 * Creates layered animation effect for multi-section pages
 */
export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  id,
  className = '',
  delay = 0,
}) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay,
          ease: 'easeOut',
        },
      }}
      viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

/**
 * StaggerContainer Component - Creates staggered animations for children
 * Perfect for hero content, feature lists, testimonials
 */
export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
}) => {
  const childrenArray = React.Children.toArray(children)

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.4,
                ease: 'easeOut',
              },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

interface RevealTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: boolean
}

/**
 * RevealText Component - Character-by-character reveal animation
 * Creates dramatic text entrance effect
 */
export const RevealText: React.FC<RevealTextProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = false,
}) => {
  const characters = text.split('')

  return (
    <motion.span className={className}>
      {stagger
        ? characters.map((char, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: delay + index * 0.02,
                duration: 0.3,
              }}
            >
              {char}
            </motion.span>
          ))
        : text}
    </motion.span>
  )
}

interface SimpleAnimatedProps {
  children: React.ReactNode
  duration?: number
  delay?: number
  className?: string
}

/**
 * SimpleAnimated Component - Basic fade-in animation
 * Useful for lazy-loaded content
 */
export const SimpleAnimated: React.FC<SimpleAnimatedProps> = ({
  children,
  duration = 0.5,
  delay = 0,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
