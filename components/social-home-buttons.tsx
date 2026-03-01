"use client"

import { useState } from 'react'
import { motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { Home, Twitter, Linkedin, Instagram, Youtube, MessageCircle, X, Plus } from 'lucide-react'
import ChatWidget from './ChatWidget'

export default function SocialHomeButtons() {
  const [openChat, setOpenChat] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const xControls = useAnimation()

  const handleToggle = async () => {
    setExpanded((s) => !s)
    // spin clockwise on each click
    try {
      await xControls.start({ rotate: 360, transition: { duration: 0.45, ease: 'easeOut' } })
    } finally {
      xControls.set({ rotate: 0 })
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Glasmorphism card - expands vertically upward when opened */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 18 }}
        animate={expanded ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 18 }}
        transition={{ duration: 0.22 }}
        className="flex flex-col items-center justify-center gap-3 p-3 sm:p-4 rounded-2xl shadow-lg border border-white/10 bg-white/6 backdrop-blur-md"
        style={{ pointerEvents: expanded ? 'auto' : 'none' }}
      >
        {/* Icons appear when expanded */}
        <Link
          href="/"
          className="p-2.5 sm:p-3 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center shadow-sm"
          title="Back to Home"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={expanded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.16 }}
            className="flex items-center justify-center"
          >
            <Home size={20} />
          </motion.span>
        </Link>

        <motion.a
          href="https://twitter.com/my_founders_club"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={expanded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.16, delay: 0.02 }}
          className="p-2.5 sm:p-3 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center shadow-sm"
          title="Follow us on X"
        >
          <Twitter size={20} />
        </motion.a>

        <motion.a
          href="https://linkedin.com/company/my-founders-club"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={expanded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.16, delay: 0.04 }}
          className="p-2.5 sm:p-3 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center shadow-sm"
          title="Connect on LinkedIn"
        >
          <Linkedin size={20} />
        </motion.a>

        <motion.a
          href="https://instagram.com/my_founders_club"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={expanded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.16, delay: 0.06 }}
          className="p-2.5 sm:p-3 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center shadow-sm"
          title="Instagram"
        >
          <Instagram size={20} />
        </motion.a>

        <motion.a
          href="https://www.youtube.com/@myfoundersclub.global"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={expanded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.16, delay: 0.08 }}
          className="p-2.5 sm:p-3 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center shadow-sm"
          title="YouTube"
        >
          <Youtube size={20} />
        </motion.a>

        <motion.button
          onClick={() => setOpenChat((s) => !s)}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={expanded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.16, delay: 0.1 }}
          className="p-2.5 sm:p-3 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center shadow-sm"
          title="AI Assistant"
        >
          <MessageCircle size={20} />
        </motion.button>
      </motion.div>

      {/* X/Plus button - toggle icon based on expanded state */}
      <motion.button
        onClick={handleToggle}
        aria-expanded={expanded}
        className="p-3 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center shadow-lg"
        title={expanded ? 'Close' : 'Open'}
        animate={xControls}
        whileHover={{ scale: 1.06 }}
      >
        {expanded ? <X size={20} /> : <Plus size={20} />}
      </motion.button>

      <ChatWidget open={openChat} onClose={() => setOpenChat(false)} />
    </div>
  )
}
