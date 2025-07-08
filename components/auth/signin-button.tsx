"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Link from 'next/link'



export function SigninButton() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8000'
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center">
            Log in to your account
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Your tasks, just a login away.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Link
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg text-center"
            href={`${backendUrl}/v1/auth/google/login/`}
            target="_blank"
          >
            Sign in with Google
          </Link>
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg"
            onClick={() => {
              // TODO: later we will implement RDS authentication
              console.log("Continue with Real Dev Squad clicked")
            }}
          >
            Continue with Real Dev Squad
          </Button>
        </div>
        <DialogFooter className="flex sm:justify-center">
          <p className="text-sm text-gray-600">
            New here?{" "}
            <button 
              className="text-blue-600 hover:underline"
              onClick={() => {
                // TODO: Implement account creation
                console.log("Create your space clicked")
              }}
            >
              Create your space
            </button>
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
