'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import Link from 'next/link'

export function SigninButton() {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://services.realdevsquad.com/staging-todo'
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-4 text-sm md:px-6 md:text-base">Sign in</Button>
      </DialogTrigger>
      <DialogContent className="mx-4 max-w-[90vw] sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold md:text-2xl">
            Log in to your account
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-gray-600 md:text-base">
            Your tasks, just a login away.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 py-4 md:gap-4">
          <Link
            className="bg-primary hover:bg-primary/90 w-full rounded-lg py-3 text-center text-sm font-medium text-white md:py-3 md:text-base"
            href={`${backendUrl}/v1/auth/google/login`}
            target="_self"
          >
            Sign in with Google
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
