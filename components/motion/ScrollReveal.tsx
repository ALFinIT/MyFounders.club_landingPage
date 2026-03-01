'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  scrollRevealVariants,
  scrollRevealContainerVariants,
} from '@/lib/motion-configs'

interface ScrollRevealProps {
  children: React.ReactNode
  className?: string
  asChild?: boolean
  stagger?: boolean
  delay?: number
}

/**
 * ScrollReveal Component - Triggers animations on viewport entry
 * Provides fade-in + upward motion when elements enter the viewport
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  asChild = false,
  stagger = false,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' })

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(
      children,
      {
        ref,
        as: motion.div,
        initial: 'hidden',
        animate: isInView ? 'visible' : 'hidden',
        variants: scrollRevealVariants,
      } as any
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={stagger ? scrollRevealContainerVariants : scrollRevealVariants}
    >
      {children}
    </motion.div>
  )
}

interface ScrollRevealGridProps {
  children: React.ReactNode
  className?: string
  columnClassName?: string
}

/**
 * ScrollRevealGrid Component - Grid layout with staggered reveals
 * Perfect for card grids, testimonials, features, etc.
 */
export const ScrollRevealGrid: React.FC<ScrollRevealGridProps> = ({
  children,
  className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
  columnClassName = '',
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' })

  const childrenArray = React.Children.toArray(children)

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
          },
        },
      }}
    >
      {childrenArray.map((child, index) => (
        <motion.div key={index} variants={scrollRevealVariants} className={columnClassName}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  )
}

interface ScrollRevealListProps {
  items: React.ReactNode[]
  className?: string
  itemClassName?: string
}

/**
 * ScrollRevealList Component - List with staggered item reveals
 * Perfect for step-by-step guides, features lists, etc.
 */
export const ScrollRevealList: React.FC<ScrollRevealListProps> = ({
  items,
  className = 'space-y-4',
  itemClassName = '',
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '0px 0px -50px 0px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.08,
            delayChildren: 0.05,
          },
        },
      }}
    >
      {items.map((item, index) => (
        <motion.div key={index} variants={scrollRevealVariants} className={itemClassName}>
          {item}
        </motion.div>
      ))}
    </motion.div>
  )
}
