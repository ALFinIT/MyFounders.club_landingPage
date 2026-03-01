'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { scrollRevealVariants, containerVariants, itemVariants } from '@/lib/motion-system'

const faqs = [
  {
    question: 'Who gets approved?',
    answer: "Around 75% of applicants. We look for quality (proven traction or clear value), Gulf alignment (serious about the region), and contribution mindset (willing to help others).",
  },
  {
    question: 'What if I\'m rejected?',
    answer: "We'll explain why and suggest next steps. You can reapply when you've addressed the gaps (no limit on attempts).",
  },
  {
    question: 'What\'s included in the $120/year?',
    answer: "WhatsApp community access, warm introductions (based on your needs), event invitations, government program alerts, member directory access, and personalized support.",
  },
  {
    question: 'Can I cancel?',
    answer: "Annual commitment, but you can cancel before renewal. No refunds mid-year unless we fail to deliver promised value.",
  },
  {
    question: 'Is there a free trial?',
    answer: "No trial, but we only charge after approval. If you're unhappy within first 30 days, contact us for consideration.",
  },
  {
    question: 'I\'m not in the Gulf yet. Can I still join?',
    answer: "Yes! 60% of members are international. We help you navigate from wherever you are.",
  },
  {
    question: 'How many introductions will I get?',
    answer: "3 personalized warm intros immediately upon joining, then ongoing introductions based on activity and needs (typically 2 to 5 per month for active members).",
  },
  {
    question: 'What\'s the WhatsApp group like?',
    answer: "Daily posts of opportunities (investor intros, partnerships, events, market intel), member questions/offers, and community discussions. Moderated for quality. Around 20 to 50 messages per day.",
  },
  {
    question: 'Do you take equity in my company?',
    answer: "No. Membership fee only. (Grant program recipients give 2% equity on exit, but that's a separate competitive program.)",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative w-full py-12 sm:py-16 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-10 sm:mb-16"
          variants={scrollRevealVariants}
          initial="hidden"
          whileInView="visible"
          exit="exit"
          viewport={{ once: false, margin: '-100px' }}
        >
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 drop-shadow-lg text-orange-400" style={{
            textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)'
          }}>
            Questions?
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-white/85 font-light drop-shadow-lg" style={{
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)'
          }}>
            Get clarity before joining.
          </p>
        </motion.div>

        {/* FAQ items */}
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, margin: '-100px' }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="rounded-lg border border-orange-500/30 bg-gradient-to-r from-orange-500/5 to-orange-600/5 overflow-hidden hover:border-orange-500/50 transition-colors"
              variants={itemVariants}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-4 sm:p-6 flex items-center justify-between hover:bg-white/5 transition-colors text-left"
              >
                <span className="text-sm sm:text-base lg:text-lg font-medium text-white drop-shadow-lg" style={{
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
                }}>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-orange-400" />
                </motion.div>
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: openIndex === index ? 'auto' : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border-t border-orange-500/20"
              >
                <div className="px-6 pb-6 text-white/85 leading-relaxed font-light drop-shadow-lg" style={{
                  textShadow: '0 1px 4px rgba(0, 0, 0, 0.8)'
                }}>
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Still have questions */}
        <motion.div
  className="mt-16 max-w-3xl mx-auto px-4 flex flex-col items-center text-center space-y-6"
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: 20 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
>
  {/* Headline */}
  <h2 className="text-3xl md:text-4xl font-bold text-white">
    Ready to access Gulf opportunities?
  </h2>

  {/* Subtext */}
  <p className="text-gray-300 text-base md:text-lg">
    Apply now and get a decision within 48 to 72 hours.
  </p>

  {/* Primary Button */}
  <motion.button
    onClick={() => document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' })}
    whileHover={{ scale: 1.05, y: -2, boxShadow: '0 15px 30px rgba(255,91,35,0.35)' }}
    whileTap={{ scale: 0.96 }}
    className="inline-block bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
  >
    Apply Now →
  </motion.button>

  {/* Divider */}
  <div className="w-full border-t border-white/20 my-4"></div>

  {/* Subtle contact info */}
  <h4>
    Have questions?
  </h4>
  <p className="text-white/90 text-lg space-y-2">
   Contact : 
  <a 
    href="mailto:apply@myfounders.club" 
    className="text-orange-400 font-semibold hover:text-orange-500 transition-colors"
  >
     &nbsp;Get in touch with our team
  </a>
  <br />
  Or schedule a meeting : 
  <a 
    href="[Your Calendly Link]" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="text-orange-400 font-semibold hover:text-orange-500 transition-colors"
  >
     &nbsp;Book a call
  </a>
</p>

</motion.div>

        
      </div>
    </section>
  )
}
