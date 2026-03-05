'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const finalizeOAuth = async () => {
      try {
        const supabase = createClient()
        const url = new URL(window.location.href)
        const code = url.searchParams.get('code')

        if (!code) {
          router.replace('/auth?tab=signin')
          return
        }

        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)
        if (exchangeError) throw exchangeError

        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()
        if (sessionError || !sessionData.session?.access_token) {
          throw sessionError || new Error('Missing OAuth session.')
        }

        const bridgeResponse = await fetch('/api/auth/oauth/session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionData.session.access_token}`,
          },
        })
        const bridgeData = await bridgeResponse.json()
        if (!bridgeResponse.ok || !bridgeData?.user) {
          throw new Error(bridgeData?.error || 'Unable to establish app session.')
        }

        localStorage.setItem('mfc_user', JSON.stringify(bridgeData.user))
        const redirectTo = String(bridgeData.redirectTo ?? '/profile')
        if (redirectTo.startsWith('http://') || redirectTo.startsWith('https://')) {
          window.location.replace(redirectTo)
          return
        }
        router.replace(redirectTo)
        router.refresh()
      } catch {
        router.replace('/auth?tab=signin')
      }
    }

    void finalizeOAuth()
  }, [router])

  return <main className="min-h-screen bg-[#050505]" />
}
