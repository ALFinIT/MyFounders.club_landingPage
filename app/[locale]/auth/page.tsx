import { Suspense } from 'react'
import AuthContent from './auth-content'

// Mark this route as dynamic to prevent static generation
export const dynamic = 'force-dynamic'

// Server component that wraps the client component in Suspense
export default function AuthPage() {
  return (
    <Suspense fallback={<AuthLoadingFallback />}>
      <AuthContent />
    </Suspense>
  )
}

function AuthLoadingFallback() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>
  )
}


