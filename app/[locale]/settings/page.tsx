'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import { useProfile } from '@/context/profile-context'
import BackLink from '@/components/back-link'
import HighQualityImage from '@/components/HighQualityImage'
import { Trash2, Save, Camera } from 'lucide-react'
import SocialHomeButtons from '@/components/social-home-buttons'
import { Footer } from '@/components/sections/footer'

export default function SettingsPage() {
  const router = useRouter()
  const { user } = useAuth()
  const { getProfile, saveProfile } = useProfile()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [userImage, setUserImage] = useState<string | null>(null)

  const [formData, setFormData] = useState<any>({
    name: user?.name || '',
    email: user?.email || '',
  })

  useEffect(() => {
    if (!user) {
      router.push('/auth')
      return
    }

    // Load user profile based on their role
    const profile = getProfile(user.id)
    setUserProfile(profile)
    
    if (profile) {
      setFormData({
        ...profile,
        name: profile.name,
        email: profile.email,
      })
    } else {
      setFormData({
        name: user.name || '',
        email: user.email || '',
      })
    }

    // Load user image from localStorage
    const storedImage = localStorage.getItem(`user_image_${user.id}`)
    if (storedImage) {
      setUserImage(storedImage)
    }

    setLoading(false)
  }, [user, router, getProfile])

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const imageData = event.target?.result as string
        setUserImage(imageData)
        // Save to localStorage
        localStorage.setItem(`user_image_${user!.id}`, imageData)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      if (userProfile) {
        saveProfile({
          ...formData,
          userId: user!.id,
        })
      }
      // Update user name in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const updatedUsers = users.map((u: any) =>
        u.id === user!.id ? { ...u, name: formData.name } : u
      )
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      
      setIsEditing(false)
    } catch (error) {
      console.error('Error saving profile:', error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteAccount = () => {
    if (typeof window !== 'undefined') {
      // Remove user from localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const updatedUsers = users.filter((u: any) => u.id !== user!.id)
      localStorage.setItem('users', JSON.stringify(updatedUsers))
      localStorage.removeItem('user')
      
      // Remove profile from localStorage
      const profiles = JSON.parse(localStorage.getItem('profiles') || '[]')
      const updatedProfiles = profiles.filter((p: any) => p.userId !== user!.id)
      localStorage.setItem('profiles', JSON.stringify(updatedProfiles))

      // Remove user image
      localStorage.removeItem(`user_image_${user!.id}`)

      router.push('/')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  return (
    <div
      className="min-h-screen bg-black relative overflow-hidden"
      style={{
        backgroundImage: 'url(/MFC%20theme.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/80 pointer-events-none" />

      {/* Header */}
      <div className="fixed top-6 left-6 z-50">
        <BackLink href="/" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto pt-24 pb-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          {/* Profile Header with Image Upload */}
          <div className="text-center mb-8">
            <div className="relative w-32 h-32 mx-auto mb-4">
              {userImage ? (
                <div className="w-full h-full rounded-full overflow-hidden shadow-lg bg-black">
                  <HighQualityImage
                    src={userImage}
                    alt="Profile"
                    width={128}
                    height={128}
                    objectFit="cover"
                    className="rounded-full"
                    quality={100}
                  />
                </div>
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-5xl shadow-lg">
                  {user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase()}
                </div>
              )}
              
              {isEditing && (
                <motion.button
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-2 right-2 p-3 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  title="Upload Profile Picture"
                >
                  <Camera size={20} />
                </motion.button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            <h1 className="text-3xl font-bold text-white mb-2 drop-shadow-2xl" style={{ textShadow: '0 4px 12px rgba(0, 0, 0, 0.9), 0 2px 6px rgba(0, 0, 0, 0.8)' }}>{formData.name || 'User'}</h1>
            <p className="text-gray-300 drop-shadow-lg" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)' }}>{formData.email}</p>
            {userProfile && (
              <p className="text-orange-400 text-sm font-semibold mt-2 drop-shadow-lg" style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.8)' }}>
                {userProfile.type === 'founder' ? 'Founder' : 'Investor'}
              </p>
            )}
          </div>

          {/* Basic Info */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white">Profile Information</h2>
              <motion.button
                onClick={() => setIsEditing(!isEditing)}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-semibold hover:bg-orange-600 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </motion.button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  disabled
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
              </div>
            </div>
          </div>

          {/* Role-Based Profile Details */}
          {userProfile && (
            <div className="border-t border-white/10 pt-8 mt-8">
              <h2 className="text-xl font-bold text-white mb-6">Profile Details</h2>

              {/* Founder Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-orange-400 mb-4">Founder Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Company</label>
                      <input
                        type="text"
                        value={formData.company || ''}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Stage</label>
                      <input
                        type="text"
                        value={formData.stage || ''}
                        disabled
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Sector</label>
                    <input
                      type="text"
                      value={formData.sector || ''}
                      disabled
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 disabled:opacity-50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Location</label>
                      <input
                        type="text"
                        value={formData.location || ''}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.cofounderNeeded || false}
                          onChange={(e) => handleInputChange('cofounderNeeded', e.target.checked)}
                          disabled={!isEditing}
                          className="w-4 h-4 rounded border-white/10 disabled:opacity-50"
                        />
                        <span className="text-gray-300 text-sm font-medium">Co-founder Needed</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 h-24 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">LinkedIn</label>
                      <input
                        type="text"
                        value={formData.socialLinks?.linkedin || ''}
                        onChange={(e) => handleInputChange('socialLinks', { ...formData.socialLinks, linkedin: e.target.value })}
                        disabled={!isEditing}
                        placeholder="linkedin.com/in/..."
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Twitter</label>
                      <input
                        type="text"
                        value={formData.socialLinks?.twitter || ''}
                        onChange={(e) => handleInputChange('socialLinks', { ...formData.socialLinks, twitter: e.target.value })}
                        disabled={!isEditing}
                        placeholder="twitter.com/..."
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Investor Section */}
              <div className="border-t border-white/10 pt-8">
                <h3 className="text-lg font-semibold text-orange-400 mb-4">Investor Information</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Fund Name</label>
                      <input
                        type="text"
                        value={formData.fundName || ''}
                        onChange={(e) => handleInputChange('fundName', e.target.value)}
                        disabled={!isEditing}
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Investment Stage</label>
                      <input
                        type="text"
                        value={formData.investmentStage || ''}
                        disabled
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Check Size</label>
                    <input
                      type="text"
                      value={formData.checkSize || ''}
                      onChange={(e) => handleInputChange('checkSize', e.target.value)}
                      disabled={!isEditing}
                      placeholder="e.g., $100k - $1M"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-300 text-sm font-medium mb-2">Portfolio Companies</label>
                    <textarea
                      value={formData.portfolioCompanies || ''}
                      onChange={(e) => handleInputChange('portfolioCompanies', e.target.value)}
                      disabled={!isEditing}
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 h-20 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">LinkedIn</label>
                      <input
                        type="text"
                        value={formData.linkedin || ''}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        disabled={!isEditing}
                        placeholder="linkedin.com/in/..."
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 text-sm font-medium mb-2">Website</label>
                      <input
                        type="text"
                        value={formData.website || ''}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        disabled={!isEditing}
                        placeholder="example.com"
                        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white disabled:opacity-50 text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="border-t border-white/10 pt-8 mt-8 flex gap-4">
            {isEditing && (
              <motion.button
                onClick={handleSave}
                disabled={isSaving}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Save size={20} />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </motion.button>
            )}

            <motion.button
              onClick={() => setShowDeleteConfirm(true)}
              className="px-6 py-3 bg-red-500/20 border border-red-500 text-red-400 rounded-lg font-semibold hover:bg-red-500/30 transition-all flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Trash2 size={20} />
              Delete Account
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl p-8 max-w-md mx-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Delete Account?</h3>
            <p className="text-gray-300 mb-6">
              This action cannot be undone. All your data will be permanently deleted.
            </p>
            <div className="flex gap-4">
              <motion.button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={handleDeleteAccount}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-semibold"
                whileHover={{ scale: 1.05 }}
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
      {/* Footer */}
      <Footer />

      {/* Social Home + Social Buttons (shared) */}
      <SocialHomeButtons />
    </div>
  )
}
