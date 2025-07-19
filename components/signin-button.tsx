'use client'

import { Button } from '@/components/ui/button'
import { appConfig } from '@/config/app-config'
import { useAuth } from '@/hooks/useAuth'
import { ArrowRight, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog'
import { Skeleton } from './ui/skeleton'

const GoogleIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24px"
      height="24ps"
      viewBox="-3 0 262 262"
      preserveAspectRatio="xMidYMid"
    >
      <path
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
        fill="#4285F4"
      />
      <path
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
        fill="#34A853"
      />
      <path
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
        fill="#FBBC05"
      />
      <path
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
        fill="#EB4335"
      />
    </svg>
  )
}

export const SigninButton = () => {
  const { isLoggedIn, isLoading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const handleSignIn = () => {
    if (isLoggedIn) return
    window.location.href = `${appConfig.backendBaseUrl}/v1/auth/google/login`
  }

  if (isLoading) {
    return <Skeleton className="h-12 w-64 bg-neutral-950" />
  }

  if (isLoggedIn) {
    return (
      <div className="group relative">
        <Button
          size="lg"
          className="relative cursor-pointer overflow-hidden rounded-xl border-2 border-neutral-600 bg-gradient-to-r from-black via-neutral-600 to-black p-4 py-6 text-lg font-bold text-white transition-all duration-500 ease-out hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
          <span className="relative z-10 flex items-center gap-3 font-semibold tracking-wide">
            <Link href="/dashboard">Launch Dashboard</Link>
            <ArrowRight />
          </span>
        </Button>
      </div>
    )
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <div className="group relative">
          <Button
            size="lg"
            className="relative cursor-pointer overflow-hidden rounded-xl border-2 border-neutral-600 bg-gradient-to-r from-black via-neutral-600 to-black p-4 py-6 text-lg font-bold text-white transition-all duration-500 ease-out hover:scale-105 active:scale-95"
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
            <span className="relative z-10 flex items-center gap-3 font-semibold tracking-wide">
              <div className="flex items-center gap-2">Start Your Journey</div>
              <ArrowRight />
            </span>
          </Button>
        </div>
      </AlertDialogTrigger>

      <AlertDialogContent className="mx-4 max-w-[90vw] sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-xl font-semibold md:text-2xl">
            Log in to your account
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm text-gray-600 md:text-base">
            Your tasks, just a login away.
          </AlertDialogDescription>

          <Button
            size="sm"
            variant="ghost"
            className="absolute top-2 right-2"
            onClick={() => setIsOpen(false)}
          >
            <XIcon />
          </Button>
        </AlertDialogHeader>

        <div className="flex flex-col gap-3 py-4 md:gap-4">
          <Button variant="outline" onClick={handleSignIn} className="cursor-pointer">
            <GoogleIcon /> Sign in with Google
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}
