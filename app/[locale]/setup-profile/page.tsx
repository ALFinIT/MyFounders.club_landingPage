'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { Logo } from '@/components/logo'
import { MessageCircle, Linkedin, Twitter, Instagram, Home, Youtube } from 'lucide-react'
import Link from 'next/link'
import { FounderProfileForm } from '@/components/founder-profile-form'
import { InvestorProfileForm } from '@/components/investor-profile-form'

export default function SetupProfilePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'bot'; content: string }>>([])
  const [chatInput, setChatInput] = useState('')
  const [isSendingChat, setIsSendingChat] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    if (!user) {
      router.push('/login')
      return
    }

    // Check if user already has a profile - if so, redirect to dashboard
    const profiles = JSON.parse(localStorage.getItem('profiles') || '[]')
    const founderProfiles = JSON.parse(localStorage.getItem('founder_profiles') || '[]')
    const investorProfiles = JSON.parse(localStorage.getItem('investor_profiles') || '[]')
    
    const hasProfile = profiles.find((p: any) => p.userId === user.id) || 
                       founderProfiles.find((p: any) => p.user_id === user.id) ||
                       investorProfiles.find((p: any) => p.user_id === user.id)
    
    if (hasProfile) {
      router.push(`/dashboard/${user.role === 'investor' ? 'investor' : 'founder'}`)
      return
    }

    setIsLoading(false)
  }, [user, router])

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return

    const userMessage = chatInput.trim()
    setChatInput('')
    setChatMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setIsSendingChat(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: chatMessages.map((msg) => ({
            role: msg.role === 'user' ? 'user' : 'assistant',
            content: msg.content,
          })),
        }),
      })

      const data = await response.json()
      if (data.response) {
        setChatMessages((prev) => [...prev, { role: 'bot', content: data.response }])
      }
    } catch (err) {
      console.error('Chat error:', err)
      setChatMessages((prev) => [
        ...prev,
        { role: 'bot', content: 'Sorry, I encountered an error. Please try again.' },
      ])
    } finally {
      setIsSendingChat(false)
    }
  }

  const handleProfileComplete = () => {
    // Redirect to dashboard based on role
    const dashboardPath = user?.role === 'investor' ? '/dashboard/investor' : '/dashboard/founder'
    router.push(dashboardPath)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen py-12 px-4 md:px-6 relative overflow-hidden bg-black flex flex-col items-center justify-center"
      style={{
        backgroundImage: 'url(/MFC%20theme.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dim overlay matching landing page contrast */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(/MFC%20theme.png)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} />

      {/* Content */}
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex justify-center mb-6">
            <Logo />
          </div>
          <h1 className="text-4xl font-light text-gray-100 mb-2 drop-shadow-2xl" style={{ textShadow: '0 4px 16px rgba(0, 0, 0, 0.9), 0 2px 8px rgba(0, 0, 0, 0.8)' }}>Complete Your Profile</h1>
          <p className="text-gray-400 drop-shadow-lg" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.9)' }}>
            {user?.role === 'investor' ? 'As an investor, help us understand your investment criteria' : 'As a founder, tell us about your startup'}
          </p>
        </motion.div>

        {/* Dynamic Profile Form */}
        <motion.div
          className="rounded-2xl p-8"
          style={{
            background: 'linear-gradient(145deg, rgba(25, 25, 25, 1), rgba(12, 12, 12, 1))',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: 'inset 0 1px 4px rgba(255, 255, 255, 0.15), inset 0 -1px 4px rgba(0, 0, 0, 0.5), 0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          {user?.role === 'investor' ? (
            <InvestorProfileForm user={user} onComplete={handleProfileComplete} />
          ) : (
            <FounderProfileForm user={user} onComplete={handleProfileComplete} />
          )}
        </motion.div>
      </div>

      {/* Social Media Icons + Chat Bot Assistant */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-4">
        {/* Social Media Icons in a Line */}
        <div className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-3 hover:bg-white/10 transition-all">
          {/* Home */}
          <Link href="/">
            <motion.button
              className="p-2 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center"
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              title="Back to Home"
            >
              <Home size={18} />
            </motion.button>
          </Link>

          {/* X (Twitter) */}
          <motion.a
            href="https://twitter.com/my_founders_club"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            title="Follow us on X"
          >
            <Twitter size={18} />
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href="https://linkedin.com/company/my-founders-club"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            title="Connect on LinkedIn"
          >
            <Linkedin size={18} />
          </motion.a>

          {/* Instagram */}
          <motion.a
            href="https://instagram.com/my_founders_club"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            title="Follow on Instagram"
          >
            <Instagram size={18} />
          </motion.a>

          {/* YouTube */}
          <motion.a
            href="https://www.youtube.com/@myfoundersclub.global"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-white bg-black rounded-full hover:bg-gray-800 transition-all flex items-center justify-center"
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            title="YouTube"
          >
            <Youtube size={18} />
          </motion.a>
        </div>

        {/* Chat Bot Assistant Button */}
        {isChatOpen && (
          <motion.div
            className="absolute bottom-20 right-0 w-80 bg-gradient-to-br from-gray-900 to-black rounded-xl border border-white/10 shadow-2xl p-4 flex flex-col"
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            style={{ height: '400px' }}
          >
            <div className="flex-1 overflow-y-auto mb-3 pr-2">
              {chatMessages.length === 0 ? (
                <div className="text-center text-gray-400 text-xs mt-4">
                  <p className="font-semibold text-white mb-2">Bot Assistant</p>
                  <p>Ask me anything about My Founders Club!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {chatMessages.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-xs p-2 rounded-lg ${
                        msg.role === 'user'
                          ? 'bg-orange-500/20 text-orange-100 ml-8'
                          : 'bg-white/10 text-gray-200 mr-8'
                      }`}
                    >
                      {msg.content}
                    </motion.div>
                  ))}
                  {isSendingChat && (
                    <div className="text-xs p-2 rounded-lg bg-white/10 text-gray-400 mr-8">
                      <span className="animate-pulse">Thinking...</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask a question..."
                disabled={isSendingChat}
                className="flex-1 px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 text-xs focus:outline-none focus:border-orange-500 disabled:opacity-50"
              />
              <motion.button
                onClick={handleSendMessage}
                disabled={isSendingChat || !chatInput.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-2 bg-orange-500 text-white rounded-lg text-xs font-semibold hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Send
              </motion.button>
            </div>
          </motion.div>
        )}

        <motion.button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="p-2.5 text-white bg-black border border-white/20 rounded-full hover:border-white/40 hover:bg-gray-900 transition-all"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title="Chat Assistant"
        >
          {isChatOpen ? <span className="text-lg">×</span> : <MessageCircle size={20} />}
        </motion.button>
      </div>
    </div>
  )
}
