'use client'

import { motion } from 'framer-motion'
import { useInView } from '@/hooks/use-in-view'
import React from 'react'

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  id?: string
  variant?: 'fade' | 'slideUp' | 'slideDown'
  staggerChildren?: boolean
}

export function AnimatedSection({
  children,
  className = '',
  id,
  variant = 'slideUp',
  staggerChildren = false
}: AnimatedSectionProps) {
  const { ref, isInView } = useInView()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: staggerChildren ? {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      }
    } : { opacity: 1 }
  }

  const itemVariants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { duration: 0.6 } }
    },
    slideUp: {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.320, 1] } }
    },
    slideDown: {
      hidden: { opacity: 0, y: -40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.23, 1, 0.320, 1] } }
    }
  }

  return (
    <motion.section
      ref={ref}
      className={className}
      id={id}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {staggerChildren ? (
        <motion.div variants={containerVariants}>
          {React.Children.map(children, (child) => (
            <motion.div variants={itemVariants[variant]}>
              {child}
            </motion.div>
          ))}
        </motion.div>
      ) : (
        children
      )}
    </motion.section>
  )
}
