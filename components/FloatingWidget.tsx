'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, MessageCircle, Phone, Instagram, Youtube } from 'lucide-react'

interface FloatingWidgetProps {
  onChatClick?: () => void
}

export default function FloatingWidget({ onChatClick }: FloatingWidgetProps = {}) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleWidget = () => {
    setIsOpen(!isOpen)
  }

  const handleChatClick = () => {
    onChatClick?.()
    setIsOpen(false)
  }

  const handleWhatsApp = () => {
    window.open('https://wa.me/+966920000000', '_blank')
    setIsOpen(false)
  }

  const handleInstagram = () => {
    window.open('https://instagram.com/my_founders_club', '_blank')
    setIsOpen(false)
  }

  const handleYouTube = () => {
    window.open('https://youtube.com/my_founders_club', '_blank')
    setIsOpen(false)
  }

  const iconVariants = {
    hidden: { scale: 0, opacity: 0, y: 10 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.4,
        ease: [0.34, 1.56, 0.64, 1]
      }
    }),
    exit: { scale: 0, opacity: 0, y: 10, transition: { duration: 0.2 } }
  }

  return (
    <>
      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Widget Container - Vertical stack */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-4">
        {/* Expanded Icons - Vertical Stack */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="flex flex-col gap-3 items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* AI Chat */}
              <motion.button
                onClick={handleChatClick}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white flex items-center justify-center transition-all shadow-lg hover:shadow-orange-500/50"
                variants={iconVariants}
                custom={0}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255,91,35,0.6)' }}
                title="AI Chat"
              >
                <MessageCircle size={22} />
              </motion.button>

              {/* WhatsApp */}
              <motion.button
                onClick={handleWhatsApp}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white flex items-center justify-center transition-all shadow-lg hover:shadow-orange-500/50"
                variants={iconVariants}
                custom={1}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255,91,35,0.6)' }}
                title="WhatsApp"
              >
                <Phone size={22} />
              </motion.button>

              {/* Instagram */}
              <motion.button
                onClick={handleInstagram}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white flex items-center justify-center transition-all shadow-lg hover:shadow-orange-500/50"
                variants={iconVariants}
                custom={2}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255,91,35,0.6)' }}
                title="Instagram"
              >
                <Instagram size={22} />
              </motion.button>

              {/* YouTube */}
              <motion.button
                onClick={handleYouTube}
                className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white flex items-center justify-center transition-all shadow-lg hover:shadow-orange-500/50"
                variants={iconVariants}
                custom={3}
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ scale: 1.1, boxShadow: '0 0 20px rgba(255,91,35,0.6)' }}
                title="YouTube"
              >
                <Youtube size={22} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.button
          onClick={toggleWidget}
          className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white flex items-center justify-center transition-all shadow-lg hover:shadow-orange-500/50 relative"
          whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(255,91,35,0.7)' }}
          whileTap={{ scale: 0.95 }}
          animate={{
            rotate: isOpen ? 45 : 0,
            transition: { duration: 0.3 }
          }}
        >
          <Plus size={28} strokeWidth={2.5} />
        </motion.button>
      </div>
    </>
  )
}
