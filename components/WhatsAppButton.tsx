'use client'

import { motion } from 'framer-motion'

export default function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    // Open WhatsApp - replace with your WhatsApp Business phone number
    const phoneNumber = '971501234567' // UAE format example
    const message = 'Hello MyFounders.Club, I need help!'
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      className="fixed bottom-20 right-6 z-40 w-14 h-14 
                 bg-black border-2 border-orange-500
                 flex items-center justify-center
                 rounded-lg hover:shadow-[0_0_20px_rgba(255,90,0,0.6)]
                 transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.5 }}
      whileHover={{ y: -5, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title="Chat with us on WhatsApp"
    >
      {/* WhatsApp SVG Icon */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-orange-500"
      >
        <path
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a6.963 6.963 0 00-6.958 6.965c0 1.928.533 3.81 1.545 5.457L2.92 21.75l5.555-1.632c1.592.868 3.39 1.327 5.313 1.327h.004a6.966 6.966 0 006.962-6.962c0-1.86-.504-3.616-1.459-5.123a6.948 6.948 0 00-5.515-3.046"
          fill="currentColor"
        />
      </svg>
    </motion.button>
  )
}
