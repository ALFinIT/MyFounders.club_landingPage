'use client'

import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { User, Users, Globe, Target, Briefcase } from 'lucide-react'

export default function SurveyPage() {
  const t = useTranslations()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    country: '',
    stage: '',
    goal: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      {/* NAV */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-[5%] py-[18px] bg-black/90 backdrop-blur-xl border-b border-orange-500/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link href="/" className="flex items-center gap-3 font-syne font-bold text-lg text-white no-underline">
          <img src="/App Icon Orange.svg" alt="MyFounders Logo" className="w-7 h-7" />
          <span>MyFounders<span className="text-orange-500">.</span>Club</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#story" className="font-dm-sans text-gray-400 hover:text-white transition-colors text-sm no-underline">Our Story</Link>
          <Link href="/#countries" className="font-dm-sans text-gray-400 hover:text-white transition-colors text-sm no-underline">The Gulf</Link>
          <Link href="/#for-who" className="font-dm-sans text-gray-400 hover:text-white transition-colors text-sm no-underline">Who It's For</Link>
          <Link href="/survey" className="font-dm-sans text-gray-400 hover:text-white transition-colors text-sm no-underline">Survey</Link>
          <Link href="/#beta" className="font-syne font-bold bg-orange-500 text-white text-sm uppercase tracking-widest px-6 py-3 no-underline hover:bg-orange-600 transition-colors">Get Early Access</Link>
        </div>
      </motion.nav>

      {/* BANNER */}
      <section className="pt-24 px-[5%] pb-8 bg-black border-b border-orange-500/20">
        <motion.div
          className="max-w-6xl mx-auto bg-orange-500/10 border border-orange-500/30 rounded-lg p-6 flex items-center justify-between"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <p className="font-dm-sans text-xs text-orange-500 uppercase tracking-wider mb-2">⭐ Founder revolutionizing & boosts massive are from cream, time wasted, life fast</p>
            <p className="font-syne font-bold text-white text-sm">Join 500+ founders building in the Gulf</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[
                <User key="user" className="w-8 h-8 text-white bg-orange-500 rounded-full p-1" />, 
                <Users key="users" className="w-8 h-8 text-white bg-orange-500 rounded-full p-1" />, 
                <Briefcase key="briefcase" className="w-8 h-8 text-white bg-orange-500 rounded-full p-1" />
              ]}
            </div>
            <span className="font-syne font-bold text-orange-500">15 D</span>
          </div>
        </motion.div>
      </section>

      {!submitted ? (
        <>
          {/* HERO SECTION */}
          <section className="px-[5%] py-24 bg-black relative overflow-hidden">
            <motion.div
              className="max-w-4xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h1 className="font-syne font-black text-[2.8rem] md:text-[3.8rem] leading-tight mb-6 text-white">
                {t('survey.survey_title')}.<br/>
                <span className="text-orange-500">{t('survey.survey_subtitle')}.</span><br/>
                {t('survey.description')}
              </h1>
              <p className="font-dm-sans text-gray-400 text-lg max-w-2xl mx-auto mb-12">
                {t('survey.survey_description')}
              </p>
            </motion.div>

            {/* THREE REWARD CARDS */}
            <motion.div
              className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {[
                { Icon: Target, title: 'AI Next-Step Engine', desc: 'Get your 3 best-fit accelerators, grants, or investors based on your profile.' },
                { Icon: Globe, title: 'Jurisdiction Navigator', desc: 'Discover the optimal GCC free zone and program for your business.' },
                { Icon: Users, title: 'Founder Community', desc: 'Instant access to 500+ verified founders building in the Gulf.' }
              ].map((reward, i) => (
                <motion.div
                  key={i}
                  className="border border-orange-500/30 bg-orange-500/5 rounded-lg p-8 hover:bg-orange-500/10 hover:border-orange-500/50 transition-all"
                  whileHover={{ y: -4 }}
                >
                  <reward.Icon className="text-4xl mb-4 text-white" />
                  <h3 className="font-syne font-bold text-white text-lg mb-3">{reward.title}</h3>
                  <p className="font-dm-sans text-gray-400 text-sm">{reward.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA BUTTON */}
            <motion.div
              className="max-w-4xl mx-auto text-center mb-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <button
                onClick={() => document.getElementById('survey-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="font-syne font-bold bg-orange-500 text-white uppercase tracking-wider px-10 py-4 hover:bg-orange-600 transition-all text-lg"
              >
                Start the Survey Now →
              </button>
            </motion.div>
          </section>

          {/* WHAT YOU GET SECTION */}
          <section className="px-[5%] py-24 bg-black/50 border-y border-orange-500/10">
            <div className="max-w-6xl mx-auto">
              <motion.div
                className="text-center mb-20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="font-syne font-black text-[2.2rem] md:text-[2.8rem] text-white mb-4">
                  What you'll unlock <span className="text-orange-500">in 15 minutes.</span>
                </h2>
                <p className="font-dm-sans text-gray-400">Real recommendations. Real access. Real community.</p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Personalized Program Matches',
                    items: ['Accelerator & incubator matching', 'Grant & funding programs', 'Jurisdiction recommendations', 'Sector-specific support']
                  },
                  {
                    title: 'Verified Investor Introductions',
                    items: ['Angels aligned to your stage', 'VC firms matching your thesis', 'Family office networks', 'Government support access']
                  },
                  {
                    title: 'Trusted Ecosystem Partners',
                    items: ['Legal & compliance advisors', 'Banking & fintech setup', 'HR & operations support', 'Tech & vendor networks']
                  },
                  {
                    title: 'Founder Community Access',
                    items: ['Mastermind groups', 'Peer mentorship circles', 'Weekly office hours', 'Exclusive founder events']
                  }
                ].map((section, i) => (
                  <motion.div
                    key={i}
                    className="border border-white/10 bg-white/3 rounded-lg p-8"
                    whileInView={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                  >
                    <h3 className="font-syne font-bold text-white text-lg mb-6 pb-4 border-b border-orange-500/20">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.items.map((item, j) => (
                        <li key={j} className="font-dm-sans flex items-start gap-3 text-gray-300">
                          <span className="text-orange-500 font-bold mt-1">→</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* SURVEY FORM SECTION */}
          <section id="survey-form" className="px-[5%] py-24 bg-black">
            <motion.div
              className="max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-center mb-16">
                <div className="inline-block bg-orange-500/10 border border-orange-500/30 text-orange-500 text-xs uppercase tracking-wider font-semibold px-4 py-2 mb-6 rounded">
                  Quick survey
                </div>
                <h2 className="font-syne font-black text-[2.2rem] text-white mb-4">
                  Tell us about <span className="text-orange-500">your journey.</span>
                </h2>
                <p className="font-dm-sans text-gray-400">5 questions. Under 60 seconds. Zero commitment.</p>
              </div>

              <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 p-12 rounded-lg space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-dm-sans text-xs text-gray-300 font-medium uppercase tracking-wider">First Name</label>
                    <input
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      className="w-full font-dm-sans bg-white/5 border border-white/10 text-white placeholder-gray-600 px-4 py-3 focus:border-orange-500 focus:bg-white/10 outline-none transition-colors"
                      type="text"
                      placeholder="Katerina"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="font-dm-sans text-xs text-gray-300 font-medium uppercase tracking-wider">Last Name</label>
                    <input
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      className="w-full font-dm-sans bg-white/5 border border-white/10 text-white placeholder-gray-600 px-4 py-3 focus:border-orange-500 focus:bg-white/10 outline-none transition-colors"
                      type="text"
                      placeholder="Hayes"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-dm-sans text-xs text-gray-300 font-medium uppercase tracking-wider">Email Address</label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full font-dm-sans bg-white/5 border border-white/10 text-white placeholder-gray-600 px-4 py-3 focus:border-orange-500 focus:bg-white/10 outline-none transition-colors"
                    type="email"
                    placeholder="you@company.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-dm-sans text-xs text-gray-300 font-medium uppercase tracking-wider">Your Base</label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full font-dm-sans bg-white/5 border border-white/10 text-white px-4 py-3 focus:border-orange-500 focus:bg-white/10 outline-none cursor-pointer transition-colors"
                      required
                    >
                      <option value="" disabled className="text-gray-600">Select country</option>
                      <optgroup label="GCC" className="text-gray-200">
                        <option className="text-gray-700">UAE — Dubai</option>
                        <option className="text-gray-700">UAE — Abu Dhabi</option>
                        <option className="text-gray-700">Saudi Arabia — Riyadh</option>
                        <option className="text-gray-700">Saudi Arabia — Jeddah</option>
                        <option className="text-gray-700">Qatar — Doha</option>
                        <option className="text-gray-700">Bahrain</option>
                        <option className="text-gray-700">Kuwait</option>
                        <option className="text-gray-700">Oman</option>
                      </optgroup>
                      <optgroup label="International" className="text-gray-200">
                        <option className="text-gray-700">United Kingdom</option>
                        <option className="text-gray-700">USA / Canada</option>
                        <option className="text-gray-700">Europe</option>
                        <option className="text-gray-700">Asia Pacific</option>
                        <option className="text-gray-700">Other</option>
                      </optgroup>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="font-dm-sans text-xs text-gray-300 font-medium uppercase tracking-wider">Startup Stage</label>
                    <select
                      name="stage"
                      value={formData.stage}
                      onChange={handleChange}
                      className="w-full font-dm-sans bg-white/5 border border-white/10 text-white px-4 py-3 focus:border-orange-500 focus:bg-white/10 outline-none cursor-pointer transition-colors"
                      required
                    >
                      <option value="" disabled className="text-gray-600">Select stage</option>
                      <option className="text-gray-700">Idea Stage</option>
                      <option className="text-gray-700">Pre-Seed</option>
                      <option className="text-gray-700">Seed</option>
                      <option className="text-gray-700">Series A</option>
                      <option className="text-gray-700">Series B+</option>
                      <option className="text-gray-700">Investor / Fund</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="font-dm-sans text-xs text-gray-300 font-medium uppercase tracking-wider">Primary Goal</label>
                  <select
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    className="w-full font-dm-sans bg-white/5 border border-white/10 text-white px-4 py-3 focus:border-orange-500 focus:bg-white/10 outline-none cursor-pointer transition-colors"
                    required
                  >
                    <option value="" disabled className="text-gray-600">What brings you to MFC?</option>
                    <option className="text-gray-700">Navigate GCC programs, grants & accelerators</option>
                    <option className="text-gray-700">Find the right free zone / jurisdiction</option>
                    <option className="text-gray-700">Match with investors</option>
                    <option className="text-gray-700">Join a verified founder community</option>
                    <option className="text-gray-700">Expand my startup into the Gulf</option>
                    <option className="text-gray-700">Find trusted local suppliers & partners</option>
                  </select>
                </div>

                <div className="pt-4">
                  <button
                    className="w-full font-syne font-bold bg-orange-500 text-white uppercase tracking-wider px-8 py-4 hover:bg-orange-600 transition-all transform hover:scale-105 text-lg"
                    type="submit"
                  >
                    Claim My Rewards & Begin Survey →
                  </button>
                </div>

                <p className="font-dm-sans text-center text-xs text-gray-500 mt-4">
                  By completing this survey you agree to our Privacy Policy and Terms & Conditions.
                </p>
              </form>
            </motion.div>
          </section>
        </>
      ) : (
        <section className="min-h-screen flex items-center justify-center px-[5%] bg-black">
          <motion.div
            className="text-center max-w-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-20 h-20 border-3 border-orange-500 rounded-full flex items-center justify-center mx-auto mb-8 text-5xl text-orange-500">
              ✓
            </div>
            <h2 className="font-syne font-black text-[2.8rem] text-white mb-4">You're all set.</h2>
            <p className="font-dm-sans text-gray-400 text-lg mb-4">
              Your personalized recommendations are being prepared.
            </p>
            <p className="font-dm-sans text-gray-400 text-lg mb-12">
              Check your email for your AI-matched programs, verified investor introductions, and community access details.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/" className="font-syne font-bold bg-orange-500 text-white uppercase tracking-wider px-8 py-4 hover:bg-orange-600 transition-all no-underline">
                Back to Home
              </Link>
              <Link href="#" className="font-syne font-bold border border-orange-500 text-orange-500 uppercase tracking-wider px-8 py-4 hover:bg-orange-500/10 transition-all no-underline">
                Join the Community
              </Link>
            </div>
          </motion.div>
        </section>
      )}
    </>
  )
}
