'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Logo } from '@/components/logo'
import HighQualityImage from '@/components/HighQualityImage'
import { ChevronRight } from 'lucide-react'

export default function AuthContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const returnUrl = searchParams.get('returnUrl') || '/setup-profile'
  const roleParam = searchParams.get('role') || ''
  const modeParam = searchParams.get('mode') || 'login'
  const { login, signup } = useAuth()
  const [isSignup, setIsSignup] = useState(modeParam === 'signup')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [country, setCountry] = useState('AE')
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [role, setRole] = useState(roleParam || 'founder')
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotMessage, setForgotMessage] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotError, setForgotError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (isSignup) {
        // Ensure terms accepted
        if (!termsAccepted) {
          setError('You must accept the Terms & Conditions to continue')
          setIsLoading(false)
          return
        }
        // Validate password match for signup
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          setIsLoading(false)
          return
        }
        await signup(email, password, name, role)
      } else {
        await login(email, password)
      }
      // Redirect to return URL or setup profile
      router.push(returnUrl)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setForgotError('')
    setForgotMessage('')
    setForgotLoading(true)

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send reset email')
      }

      setForgotMessage('✓ Password reset link sent to your email. Please check your inbox.')
      setForgotEmail('')
      setTimeout(() => {
        setIsForgotPassword(false)
        setForgotMessage('')
      }, 4000)
    } catch (err) {
      setForgotError(err instanceof Error ? err.message : 'Failed to send reset email')
    } finally {
      setForgotLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Side - Image/Branding */}
      <motion.div
        className="hidden lg:flex w-1/2 bg-gradient-to-br from-orange-600 via-orange-500 to-red-600 flex-col items-center justify-center p-12 relative overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center">
          <motion.div
            className="mb-8 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-32 h-32 flex items-center justify-center"
            >
              <div className="mb-0 w-28 h-28 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden bg-gradient-to-r from-orange-600 to-orange-500 p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <HighQualityImage
                    src="/App Icon Orange.svg"
                    alt="MyFoundersClub"
                    width={120}
                    height={120}
                    className="w-24 h-24 object-contain scale-125"
                    quality={100}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
          <h1 className="text-5xl font-bold text-white mb-6 drop-shadow-2xl" style={{ textShadow: '0 4px 16px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(0, 0, 0, 0.8)' }}>My Founders Club</h1>
          <p className="text-xl text-white/95 mb-8 drop-shadow-lg font-light" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)' }}>Build Locally. Champion Regionally. Scale Globally.</p>

          {/* Stats Below Text */}
          <motion.div
            className="mt-8 grid grid-cols-3 gap-8 bg-white/5 rounded-2xl p-8 border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div>
              <p className="text-3xl font-bold text-orange-400">500+</p>
              <p className="text-sm text-white/90">Founders</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-400">50+</p>
              <p className="text-sm text-white/90">Investors</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-orange-400">$100M+</p>
              <p className="text-sm text-white/90">Funding</p>
            </div>
          </motion.div>

          <p className="text-lg text-white/90 mt-8 font-light">Join 500+ founders in the Gulf startup ecosystem</p>
        </div>
      </motion.div>

      {/* Right Side - Auth Form */}
      <motion.div
        className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 md:p-12"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-full max-w-md">
          {/* Logo for Mobile */}
          <motion.div className="lg:hidden mb-8 flex justify-center" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              className="w-24 h-24 flex items-center justify-center"
            >
              <div className="mb-0 w-20 h-20 rounded-full flex items-center justify-center overflow-hidden bg-gradient-to-r from-orange-600 to-orange-500 p-1">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <HighQualityImage
                    src="/App Icon Orange.svg"
                    alt="MyFoundersClub"
                    width={80}
                    height={80}
                    className="w-18 h-18 object-contain scale-110"
                    quality={100}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-2xl" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 6px rgba(0, 0, 0, 0.8)' }}>
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-white/85 mb-8 drop-shadow-lg font-light" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)' }}>
              {isSignup ? 'Join the My Founders Club community' : 'Sign in to your account'}
            </p>

            {error && (
              <motion.div
                className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-white/95 mb-2 drop-shadow-sm" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}>Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-white/95 mb-2 drop-shadow-sm" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/95 mb-2 drop-shadow-sm" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}>Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-muted-foreground focus:outline-none focus:border-orange-500 transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5B23" strokeWidth="2.5"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-8 1.02-2.6 2.71-4.73 4.76-6.01"></path><path d="M1 1l22 22"></path></svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5B23" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                    )}
                  </button>
                </div>
              </div>

              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-white/95 mb-2 drop-shadow-sm" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}>Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5B23" strokeWidth="2.5"><path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-5 0-9.27-3-11-8 1.02-2.6 2.71-4.73 4.76-6.01"></path><path d="M1 1l22 22"></path></svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#FF5B23" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-white/95 mb-3 drop-shadow-sm">What's your role?</label>
                  <div className="space-y-2">
                    {[
                      { value: 'founder', label: 'Founder', description: 'Building a startup' },
                      { value: 'investor', label: 'Investor', description: 'Looking for opportunities' },
                      { value: 'both', label: 'Both', description: 'Founder & Investor' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center gap-3 p-3 rounded-lg border border-white/10 cursor-pointer hover:border-orange-500/50 transition-colors" style={{
                        background: role === option.value ? 'rgba(255, 91, 35, 0.1)' : 'transparent',
                        borderColor: role === option.value ? 'rgba(255, 91, 35, 0.5)' : 'rgba(255, 255, 255, 0.1)'
                      }}>
                        <input
                          type="radio"
                          name="role"
                          value={option.value}
                          checked={role === option.value}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="text-sm font-medium text-white">{option.label}</p>
                          <p className="text-xs text-gray-400">{option.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-white/95 mb-2 drop-shadow-sm">Country</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
                  >
                    <option value="AE">United Arab Emirates</option>
                    <option value="SA">Saudi Arabia</option>
                    <option value="KW">Kuwait</option>
                    <option value="QA">Qatar</option>
                    <option value="OM">Oman</option>
                    <option value="BH">Bahrain</option>
                  </select>

                  <label className="mt-3 flex items-start gap-2 text-sm">
                    <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="mt-1" />
                    <span className="text-white/90">I accept the <a href="/terms" className="text-orange-400 font-semibold hover:text-orange-300">Terms &amp; Conditions</a></span>
                  </label>
                </div>
              )}

              <motion.button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-6"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLoading ? (
                  <span>{isSignup ? 'Creating Account...' : 'Signing in...'}</span>
                ) : (
                  <>
                    <span>{isSignup ? 'Create Account' : 'Sign In'}</span>
                    <ChevronRight size={18} />
                  </>
                )}
              </motion.button>
            </form>

            {/* Toggle Auth Mode */}
            <div className="mt-6 text-center space-y-3">
              <p className="text-white/85">
                {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
                <button
                  onClick={() => {
                    setIsSignup(!isSignup)
                    setError('')
                  }}
                  className="text-orange-400 hover:text-orange-300 font-semibold"
                >
                  {isSignup ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
              {!isSignup && (
                <p className="text-sm text-white/80">
                  <button
                    type="button"
                    onClick={() => setIsForgotPassword(!isForgotPassword)}
                    className="text-orange-400 hover:text-orange-300 font-semibold"
                  >
                    Forgot password?
                  </button>
                </p>
              )}
            </div>
          </motion.div>
          {isForgotPassword && !isSignup && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 pt-8 border-t border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 drop-shadow-lg" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.9)' }}>Reset Password</h3>
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/95 mb-2 drop-shadow-sm" style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)' }}>Email Address</label>
                  <input
                    type="email"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    disabled={forgotLoading}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors disabled:opacity-50"
                  />
                </div>

                {forgotError && (
                  <motion.div
                    className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {forgotError}
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={forgotLoading}
                  className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  whileHover={{ scale: forgotLoading ? 1 : 1.02 }}
                  whileTap={{ scale: forgotLoading ? 1 : 0.98 }}
                >
                  {forgotLoading ? 'Sending...' : 'Send Reset Link'}
                </motion.button>
              </form>
              {forgotMessage && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-green-400 text-sm text-center">
                  {forgotMessage}
                </motion.p>
              )}
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false)
                  setForgotMessage('')
                  setForgotError('')
                }}
                className="w-full mt-4 px-4 py-2 text-white/70 hover:text-white transition-colors text-sm"
              >
                Back to Login
              </button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
