'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  name: string
  role?: 'founder' | 'investor' | 'both'
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  signup: (email: string, password: string, name: string, role?: string) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  deleteAccount?: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Failed to parse stored user:', error)
        localStorage.removeItem('user')
      }
    }
    setIsLoading(false)
  }, [])

  const signup = async (email: string, password: string, name: string, role?: string) => {
    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    if (users.some((u: any) => u.email === email)) {
      throw new Error('User already exists')
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: (role as 'founder' | 'investor' | 'both') || 'founder',
    }

    // Store password (in production, this should be hashed on the server)
    users.push({ ...newUser, password })
    localStorage.setItem('users', JSON.stringify(users))
    localStorage.setItem('user', JSON.stringify(newUser))
    setUser(newUser)
  }

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]')
    const foundUser = users.find((u: any) => u.email === email && u.password === password)

    if (!foundUser) {
      throw new Error('Invalid email or password')
    }

    const { password: _, ...userWithoutPassword } = foundUser
    localStorage.setItem('user', JSON.stringify(userWithoutPassword))
    setUser(userWithoutPassword)
  }

  const logout = () => {
    localStorage.removeItem('user')
    setUser(null)
  }

  const deleteAccount = () => {
    if (!user) return
    try {
      // remove from users list
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const filtered = users.filter((u: any) => u.id !== user.id)
      localStorage.setItem('users', JSON.stringify(filtered))

      // remove profile entry
      const profiles = JSON.parse(localStorage.getItem('profiles') || '[]')
      const filteredProfiles = profiles.filter((p: any) => p.userId !== user.id)
      localStorage.setItem('profiles', JSON.stringify(filteredProfiles))

      // remove avatar images
      localStorage.removeItem(`user_image_${user.id}`)

      // logout and clear current user
      localStorage.removeItem('user')
      setUser(null)
    } catch (e) {
      console.error('Failed to delete account', e)
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signup, login, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
