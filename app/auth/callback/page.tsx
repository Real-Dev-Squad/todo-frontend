'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import { toast } from 'sonner'

const AuthCallbackContent = () => {
  const router = useRouter()
  const params = useSearchParams()

  useEffect(() => {
    const success = params.get('success')
    const error = params.get('error')

    if (success === 'true') {
      toast.success('Login successful!')
    } else if (error) {
      toast.error('Login failed')
    } else {
      toast('Login status unknown.')
    }
    router.replace('/')
  }, [params, router])

  return <div>Processing login...</div>
}

export default function AuthCallback() {
  return (
    <Suspense>
      <AuthCallbackContent />
    </Suspense>
  )
}
