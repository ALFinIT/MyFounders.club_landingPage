import { NextRequest, NextResponse } from 'next/server'

// Mark this route as dynamic - never cache
export const dynamic = 'force-dynamic'

// Simulated context knowledge base - can be enhanced with actual data
const knowledgeBase = {
  aboutMFC: 'My Founders Club (MFC) is a vibrant community connecting founders and investors to build amazing companies together.',
  features: 'Key features include founder networking, investor connections, pitch opportunities, mentorship, and exclusive events.',
  signup: 'To join MFC, create an account by clicking the Join button and completing your profile based on your role (Founder or Investor).',
  founders: 'Founders get access to investor networks, mentorship, resources, and funding opportunities.',
  investors: 'Investors can discover promising startups, access deal flow, connect with founders, and build their portfolio.',
  pricing: 'Membership details and pricing information can be found on our website.',
  contact: 'You can reach us via WhatsApp, LinkedIn, Twitter, or visit our website at myfoundersclub.com'
}

// Simple intent matching and response generation
function generateResponse(userMessage: string): string {
  const message = userMessage.toLowerCase()

  // Check for keywords and return appropriate response
  if (message.includes('about') || message.includes('what is') || message.includes('who are')) {
    return knowledgeBase.aboutMFC
  }
  
  if (message.includes('feature') || message.includes('what can') || message.includes('what do')) {
    return knowledgeBase.features
  }
  
  if (message.includes('how to') || message.includes('join') || message.includes('sign') || message.includes('register')) {
    return knowledgeBase.signup
  }
  
  if (message.includes('founder')) {
    return knowledgeBase.founders
  }
  
  if (message.includes('investor')) {
    return knowledgeBase.investors
  }
  
  if (message.includes('price') || message.includes('cost') || message.includes('fee')) {
    return knowledgeBase.pricing
  }
  
  if (message.includes('contact') || message.includes('reach') || message.includes('whatsapp') || message.includes('email')) {
    return knowledgeBase.contact
  }
  
  // If using OpenAI API (optional - requires OPENAI_API_KEY)
  if (process.env.OPENAI_API_KEY) {
    return 'I can help with questions about MFC. Please ask about founders, investors, features, pricing, or how to join!'
  }

  // Default response
  return 'I can help with questions about My Founders Club! Ask about our features, founders, investors, pricing, how to join, or contact information.'
}

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      )
    }

    // Generate bot response
    let botResponse = ''

    // Check if OpenAI API key is available
    if (process.env.OPENAI_API_KEY) {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: `You are a helpful assistant for My Founders Club, a platform connecting founders and investors. 
                You help users understand the platform, answer questions about features, explain how to join, and assist with general inquiries.
                Be friendly, concise, and professional. Keep responses to 2-3 sentences.
                Knowledge: ${JSON.stringify(knowledgeBase)}`,
              },
              ...(conversationHistory || []),
              {
                role: 'user',
                content: message,
              },
            ],
            temperature: 0.7,
            max_tokens: 150,
          }),
        })

        if (!response.ok) {
          throw new Error('OpenAI API error')
        }

        const data = await response.json()
        botResponse = data.choices[0].message.content.trim()
      } catch (error) {
        // Fallback to knowledge base if API fails
        botResponse = generateResponse(message)
      }
    } else {
      // Use knowledge base when API key is not available
      botResponse = generateResponse(message)
    }

    return NextResponse.json({
      response: botResponse,
      success: true,
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    )
  }
}
