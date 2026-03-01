'use client'

import React from 'react'
import { motion, MotionProps } from 'framer-motion'
import { buttonVariants, TIMING, EASING } from '@/lib/motion-configs'

interface MotionButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

// Button style variants
const variantClasses = {
  primary: 'bg-orange-600 text-white hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
  outline: 'border-2 border-orange-600 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-950',
  ghost: 'text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
}

/**
 * MotionButton Component - Premium button with micro-interactions
 * Scale on hover, press feedback on click, smooth transitions
 */
export const MotionButton: React.FC<MotionButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  className = '',
  ...props
}) => {
  return (
    <motion.button
      className={`inline-flex items-center gap-2 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      variants={buttonVariants}
      initial="initial"
      whileHover={!disabled && !isLoading ? 'hover' : 'initial'}
      whileTap={!disabled && !isLoading ? 'tap' : 'initial'}
      disabled={disabled || isLoading}
      {...(props as any)}
    >
      {leftIcon && !isLoading && <motion.span>{leftIcon}</motion.span>}
      {isLoading && (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        >
          ⏳
        </motion.span>
      )}
      {children}
      {rightIcon && !isLoading && <motion.span>{rightIcon}</motion.span>}
    </motion.button>
  )
}

interface LinkButtonProps extends MotionButtonProps {
  href: string
}

/**
 * LinkButton Component - Button styled link with motion effects
 */
export const LinkButton: React.FC<LinkButtonProps> = ({
  href,
  children,
  ...props
}) => {
  return (
    <a href={href}>
      <MotionButton as="div" {...(props as any)}>
        {children}
      </MotionButton>
    </a>
  )
}

interface FloatingActionButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  children: React.ReactNode
  icon?: React.ReactNode
}

/**
 * FloatingActionButton Component - FAB with pulse and hover effects
 */
export const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  children,
  icon,
  className = '',
  ...props
}) => {
  return (
    <motion.button
      className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-orange-600 text-white shadow-lg flex items-center justify-center hover:bg-orange-700 dark:bg-orange-500 dark:hover:bg-orange-600 ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        boxShadow: [
          '0 0 0 0 rgba(249, 115, 22, 0.7)',
          '0 0 0 10px rgba(249, 115, 22, 0)',
        ],
      }}
      transition={{
        boxShadow: {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeOut',
        },
      }}
      {...(props as any)}
    >
      {icon || children}
    </motion.button>
  )
}

interface ButtonGroupProps {
  children: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

/**
 * ButtonGroup Component - Multiple buttons with coordinated animations
 */
export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  className = '',
}) => {
  const containerClass =
    orientation === 'horizontal'
      ? 'flex flex-wrap items-center gap-3'
      : 'flex flex-col gap-2'

  return <div className={`${containerClass} ${className}`}>{children}</div>
}
