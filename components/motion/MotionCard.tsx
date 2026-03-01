'use client'

import React from 'react'
import { motion, MotionProps } from 'framer-motion'
import { cardHoverVariants, TIMING, EASING } from '@/lib/motion-configs'

interface MotionCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, keyof MotionProps> {
  children: React.ReactNode
  className?: string
  hoverScale?: number
  hoverY?: number
  onClick?: () => void
}

/**
 * MotionCard Component - Premium card with hover effects
 * Provides lift, scale, and shadow animations on hover
 */
export const MotionCard: React.FC<MotionCardProps> = ({
  children,
  className = '',
  hoverScale = 1.02,
  hoverY = -8,
  onClick,
  ...props
}) => {
  return (
    <motion.div
      className={`rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 cursor-pointer transition-colors ${className}`}
      initial="initial"
      whileHover="hover"
      variants={{
        initial: {
          y: 0,
          scale: 1,
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08)',
        },
        hover: {
          y: hoverY,
          scale: hoverScale,
          boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
          transition: {
            duration: TIMING.NORMAL,
            ease: EASING.EASE_OUT_CUBIC,
          },
        },
      }}
      onClick={onClick}
      {...(props as any)}
    >
      {children}
    </motion.div>
  )
}

interface MotionCardImageProps {
  src: string
  alt: string
  className?: string
}

/**
 * Image component for MotionCard - scales on parent hover
 */
export const MotionCardImage: React.FC<MotionCardImageProps> = ({
  src,
  alt,
  className = 'w-full h-48 object-cover rounded-md mb-4',
}) => {
  return (
    <motion.div
      className="overflow-hidden rounded-md mb-4"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: TIMING.NORMAL }}
    >
      <img src={src} alt={alt} className={className} />
    </motion.div>
  )
}

interface CardGridProps {
  children: React.ReactNode
  className?: string
}

/**
 * CardGrid Component - Grid of MotionCards with coordinated animations
 */
export const CardGrid: React.FC<CardGridProps> = ({
  children,
  className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
}) => {
  return <div className={className}>{children}</div>
}
