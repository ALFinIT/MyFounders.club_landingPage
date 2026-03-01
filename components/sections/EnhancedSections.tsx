'use client'

import React from 'react'
import {
  HeroTitle,
  ScrollRevealGrid,
  MotionCard,
  MotionButton,
  TIMING,
  EASING,
} from '@/components/motion'
import { motion } from 'framer-motion'

/**
 * Enhanced Features Section with Motion Animations
 * Uses ScrollRevealGrid for card staggering and hover effects
 */
export const FeaturesSection = () => {
  const features = [
    {
      icon: '🔗',
      title: 'Network Effect',
      description: 'Connect with founders, investors, and ecosystem players in your region',
    },
    {
      icon: '🤖',
      title: 'AI Intelligence',
      description: 'Get AI-powered insights about opportunities and market trends',
    },
    {
      icon: '📊',
      title: 'Data Analytics',
      description: 'Access comprehensive ecosystem data and funding intelligence',
    },
    {
      icon: '🚀',
      title: 'Growth Tools',
      description: 'Resources and mentorship to accelerate your startup journey',
    },
    {
      icon: '🌍',
      title: 'Global Reach',
      description: 'Connect with international partners and opportunities',
    },
    {
      icon: '💼',
      title: 'Premium Support',
      description: '24/7 support from our team of expert advisors',
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: TIMING.MEDIUM, ease: EASING.EASE_OUT_CUBIC }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Why Choose MyFounders?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comprehensive tools and resources designed for Gulf startup founders
          </p>
        </motion.div>

        <ScrollRevealGrid columnClassName="flex">
          {features.map((feature) => (
            <MotionCard key={feature.title}>
              <motion.div
                className="text-4xl mb-4"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: TIMING.FAST }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </MotionCard>
          ))}
        </ScrollRevealGrid>
      </div>
    </section>
  )
}

/**
 * Enhanced Pricing Section with Card Animations
 */
export const PricingSection = () => {
  const plans = [
    {
      name: 'Starter',
      price: '$29',
      description: 'Perfect for individual founders',
      features: ['Access to network', 'Basic analytics', 'Email support'],
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$99',
      description: 'Best for growing startups',
      features: ['All Starter features', 'Advanced analytics', 'Priority support', 'API access'],
      highlighted: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      description: 'For larger organizations',
      features: ['All Pro features', 'Custom integrations', 'Dedicated support', 'White-label options'],
      highlighted: false,
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: TIMING.MEDIUM }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Choose the plan that works best for you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: TIMING.MEDIUM,
                delay: index * 0.1,
                ease: EASING.EASE_OUT_CUBIC,
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className={`rounded-lg p-8 border-2 transition-all ${
                plan.highlighted
                  ? 'border-orange-500 bg-gradient-to-b from-orange-50 to-white dark:from-orange-950 dark:to-gray-900 shadow-lg shadow-orange-500/30'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
              }`}
            >
              {plan.highlighted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold"
                >
                  Most Popular
                </motion.div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{plan.description}</p>

              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                {plan.price !== 'Custom' && <span className="text-gray-600">/month</span>}
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <motion.li
                    key={feature}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: TIMING.FAST }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-orange-500">✓</span>
                    {feature}
                  </motion.li>
                ))}
              </ul>

              <MotionButton
                variant={plan.highlighted ? 'primary' : 'outline'}
                className="w-full"
              >
                Get Started
              </MotionButton>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * Enhanced CTA Section with Staggered Text
 */
export const EnhancedCTASection = () => {
  const stats = [
    { label: 'Active Members', value: '5,000+' },
    { label: 'Founder Connections', value: '50K+' },
    { label: 'Ecosystem Partners', value: '200+' },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-600 to-orange-500 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: TIMING.MEDIUM }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-bold mb-6"
        >
          Join the Gulf's Premier Founder Network
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: TIMING.MEDIUM, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-xl mb-12 text-orange-50"
        >
          Be part of a community building the next generation of innovative startups
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
          initial="hidden"
          whileInView="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
          viewport={{ once: true }}
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-orange-100">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: TIMING.MEDIUM, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MotionButton variant="primary" size="lg">
            Get Started Today
          </MotionButton>
          <MotionButton variant="outline" size="lg">
            Learn More
          </MotionButton>
        </motion.div>
      </div>
    </section>
  )
}

/**
 * Enhanced Testimonials Section with Scroll Reveals
 */
export const TestimonialsSection = () => {
  const testimonials = [
    {
      author: 'Ahmed Al-Mansouri',
      role: 'Founder, TechStart UAE',
      text: 'MyFounders helped us find the perfect co-founder within weeks. The network quality is exceptional.',
      avatar: '👨‍💼',
    },
    {
      author: 'Fatima Al-Dosari',
      role: 'CEO, InnovateSA',
      text: 'The AI matching algorithm connected us with investors who truly understood our vision.',
      avatar: '👩‍💼',
    },
    {
      author: 'Mohammed Al-Maktoum',
      role: 'CTO, GrowthHub',
      text: 'Best platform for Gulf founders. The community support has been invaluable.',
      avatar: '👨‍💻',
    },
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: TIMING.MEDIUM }}
          viewport={{ once: true }}
          className="text-3xl sm:text-5xl font-bold text-center mb-16"
        >
          Stories from Our Community
        </motion.h2>

        <ScrollRevealGrid>
          {testimonials.map((testimonial) => (
            <MotionCard key={testimonial.author}>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-4xl">{testimonial.avatar}</div>
                <div>
                  <div className="font-semibold">{testimonial.author}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role}
                  </div>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic">"{testimonial.text}"</p>
              <div className="mt-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400">
                    ★
                  </span>
                ))}
              </div>
            </MotionCard>
          ))}
        </ScrollRevealGrid>
      </div>
    </section>
  )
}
