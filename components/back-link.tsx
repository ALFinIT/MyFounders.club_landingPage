"use client"

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'

interface BackLinkProps {
  href?: string
  label?: string
}

export default function BackLink({ href = '/', label = 'Back' }: BackLinkProps) {
  return (
    <Link href={href} aria-label={`Go back to previous page`} className="flex items-center gap-2 text-white text-sm transition-colors">
      <motion.span whileHover={{ x: -6 }} className="flex items-center gap-2">
        <ArrowLeft size={18} />
        <span className="font-medium">{label}</span>
      </motion.span>
    </Link>
  )
}
