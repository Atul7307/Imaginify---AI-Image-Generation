'use client'

import { SignUp } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const SignUpPage = () => {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/') // Redirect if already signed in
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded || isSignedIn) return null

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <SignUp fallbackRedirectUrl="/" />
    </div>
  )
}

export default SignUpPage
