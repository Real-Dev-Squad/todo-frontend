"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";

export function SigninButton() {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || "https://services.realdevsquad.com/staging-todo";
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-sm md:text-base px-4 md:px-6">Sign in</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-w-[90vw] mx-4">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl font-semibold text-center">
            Log in to your account
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 text-sm md:text-base">
            Your tasks, just a login away.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3 md:gap-4 py-4">
          <Link
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 md:py-3 rounded-lg text-center text-sm md:text-base font-medium"
            href={`${backendUrl}/v1/auth/google/login/`}
            target="_blank"
          >
            Sign in with Google
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  );
}
