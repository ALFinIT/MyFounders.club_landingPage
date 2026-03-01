 'use client'

import { useEffect, useState } from 'react'
import { useProfile } from '@/context/profile-context'
import FounderDashboard from './FounderDashboard'
import InvestorDashboard from './InvestorDashboard'

export default function RoleBasedDashboard({ userId }: { userId: string }) {
  const { getProfile } = useProfile()
  const [profile, setProfile] = useState<any>(null)

  useEffect(() => {
    const p = getProfile(userId)
    setProfile(p)
  }, [userId])

  if (!profile) {
    return (
      <div className="glass rounded-2xl p-8">
        <h3 className="text-xl font-light text-white mb-2">No profile found</h3>
        <p className="text-muted-foreground">Please complete onboarding to access your dashboard.</p>
      </div>
    )
  }

  if (profile.type === 'founder') return <FounderDashboard userId={userId} />
  if (profile.type === 'investor') return <InvestorDashboard userId={userId} />

  return (
    <div className="glass rounded-2xl p-8">
      <p className="text-muted-foreground">Unknown profile type.</p>
    </div>
  )
}
