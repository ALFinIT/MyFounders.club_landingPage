'use client'

import { createContext, useContext, useState } from 'react'

export interface FounderProfile {
  userId: string
  type: 'founder'
  name: string
  email: string
  company: string
  stage: 'Idea' | 'Building' | 'Launch' | 'Growth'
  sector: string
  location: string
  cofounderNeeded: boolean
  description: string
  socialLinks: {
    linkedin: string
    twitter: string
  }
}

export interface InvestorProfile {
  userId: string
  type: 'investor'
  name: string
  email: string
  fundName: string
  investmentStage: 'Seed' | 'Series A' | 'Series B' | 'Growth'
  sectorFocus: string[]
  geographyFocus: string[]
  checkSize: string
  portfolioCompanies: string
  linkedin: string
  website: string
}

export type UserProfile = FounderProfile | InvestorProfile

interface ProfileContextType {
  profile: UserProfile | null
  saveProfile: (profile: UserProfile) => void
  getProfile: (userId: string) => UserProfile | null
  removeProfile: (userId: string) => void
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profiles, setProfiles] = useState<UserProfile[]>(() => {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem('profiles')
    return stored ? JSON.parse(stored) : []
  })

  const saveProfile = (profile: UserProfile) => {
    setProfiles((prev) => {
      const filtered = prev.filter((p) => p.userId !== profile.userId)
      const updated = [...filtered, profile]
      localStorage.setItem('profiles', JSON.stringify(updated))
      // Attempt to sync to Supabase when environment variables are present
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        if (typeof window !== 'undefined' && url && key) {
          // Use REST upsert to profiles table (assumes table exists)
          fetch(`${url}/rest/v1/profiles`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: key,
              Authorization: `Bearer ${key}`,
              Prefer: 'resolution=merge-duplicates',
            },
            body: JSON.stringify(profile),
          }).catch((e) => console.warn('Supabase sync failed', e))
        }
      } catch (e) {
        console.warn('Profile sync error', e)
      }
      return updated
    })
  }

  const removeProfile = (userId: string) => {
    setProfiles((prev) => {
      const updated = prev.filter((p) => p.userId !== userId)
      localStorage.setItem('profiles', JSON.stringify(updated))
      return updated
    })
  }

  const getProfile = (userId: string) => {
    return profiles.find((p) => p.userId === userId) || null
  }

  return (
    <ProfileContext.Provider value={{ profile: null, saveProfile, getProfile, removeProfile }}>
      {children}
    </ProfileContext.Provider>
  )
}

export function useProfile() {
  const context = useContext(ProfileContext)
  if (!context) {
    throw new Error('useProfile must be used within ProfileProvider')
  }
  return context
}
