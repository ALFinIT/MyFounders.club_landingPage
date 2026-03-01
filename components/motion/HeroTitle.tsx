'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { heroTypographyVariants, heroContainerVariants } from '@/lib/motion-configs'

interface HeroTitleProps {
  title: string
  subtitle?: string
  description?: string
  className?: string
  titleClassName?: string
  subtitleClassName?: string
  descriptionClassName?: string
}

/**
 * Hero Title Component - Kinetic Typography Entrance
 * Creates a premium entrance animation with staggered text elements
 */
export const HeroTitle: React.FC<HeroTitleProps> = ({
  title,
  subtitle,
  description,
  className = '',
  titleClassName = 'text-4xl sm:text-5xl lg:text-6xl font-bold',
  subtitleClassName = 'text-lg sm:text-xl text-orange-600',
  descriptionClassName = 'text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl',
}) => {
  return (
    <motion.div
      className={`space-y-4 ${className}`}
      variants={heroContainerVariants}
      initial="hidden"
      animate="visible"
    >
      {subtitle && (
        <motion.p variants={heroTypographyVariants} className={subtitleClassName}>
          {subtitle}
        </motion.p>
      )}

      <motion.h1 variants={heroTypographyVariants} className={titleClassName}>
        {title}
      </motion.h1>

      {description && (
        <motion.p variants={heroTypographyVariants} className={descriptionClassName}>
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
