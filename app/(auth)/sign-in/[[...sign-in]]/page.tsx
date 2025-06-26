'use client'

import { SignIn } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const SignInPage = () => {
  const { isSignedIn, isLoaded } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push('/') // or wherever you want
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded || isSignedIn) return null

  return (
    <>
      <div className='flex  items-center justify-center w-full bg-gray-100'>
        <SignIn fallbackRedirectUrl="/"
        />
      </div>
    </>
  )
}

export default SignInPage
