'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }

    // Redirect to role-based dashboard
    const dashboardPath = user.role === 'investor' ? '/dashboard/investor' : '/dashboard/founder'
    router.push(dashboardPath)
  }, [user, router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Redirecting to your dashboard...</div>
    </div>
  )
}

