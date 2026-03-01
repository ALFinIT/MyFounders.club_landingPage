'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Message { role: 'user' | 'bot'; text: string }

export default function ChatWidget({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'bot', text: 'Hi - I can help with questions about My Founders Club. Ask me anything!' }])
    }
  }, [open])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages, open])

  const sendMessage = async () => {
    if (!input.trim()) return
    const userMsg: Message = { role: 'user', text: input.trim() }
    setMessages((m) => [...m, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg.text, conversationHistory: messages.map(m => ({ role: m.role === 'bot' ? 'assistant' : 'user', content: m.text })) }),
      })
      const data = await res.json()
      if (data?.response) {
        setMessages((m) => [...m, { role: 'bot', text: data.response }])
      } else {
        setMessages((m) => [...m, { role: 'bot', text: 'Sorry, I could not get a response right now.' }])
      }
    } catch (err) {
      setMessages((m) => [...m, { role: 'bot', text: 'Network error - please try again.' }])
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="fixed bottom-28 right-6 z-50 w-80 bg-black/90 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-3 border-b border-white/10 flex items-center justify-between">
        <div className="text-sm font-semibold">MFC AI Assistant</div>
        <button onClick={onClose} className="text-white/70 hover:text-white">Close</button>
      </div>

      <div ref={containerRef} className="p-3 h-56 overflow-auto space-y-3 text-sm">
        {messages.map((m, i) => (
          <div key={i} className={`p-2 rounded-md ${m.role === 'user' ? 'bg-white/5 self-end text-white' : 'bg-white/6 text-gray-200'}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="p-3 border-t border-white/10 flex items-center gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }} placeholder="Ask about the community, events, pricing..." className="flex-1 px-3 py-2 rounded-md bg-white/5 text-white text-sm focus:outline-none" />
        <button onClick={sendMessage} disabled={loading || !input.trim()} className="px-3 py-2 bg-orange-500 rounded-md text-white font-semibold disabled:opacity-50">{loading ? '...' : 'Ask'}</button>
      </div>
    </motion.div>
  )
}
