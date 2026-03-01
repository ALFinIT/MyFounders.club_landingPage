'use client'

import { motion } from 'framer-motion'
import HighQualityImage from '@/components/HighQualityImage'

export function Logo() {
  return (
    <motion.div
      className="flex items-center gap-4 order-first"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
      >
        <HighQualityImage
          src="/images/App Icon Orange.svg"
          alt="My Founders Club Logo"
          width={40}
          height={40}
          className="w-full h-full rounded-full"
          quality={100}
        />
      </motion.div>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-bold text-white">My Founders</span>
        <span className="text-xs text-orange-400">Club</span>
      </div>
    </motion.div>
  )
}
