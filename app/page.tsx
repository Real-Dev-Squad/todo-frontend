"use client"
import { Button } from "@/components/ui/button";
import { AuthModal } from "@/components/auth/signin-button";

export default function Home() {
  return <div className="flex min-h-screen flex-col items-center py-8 ">
    <h1>Hello World!</h1>
    {/* TODO: Later this AuthModal will be used from header */}
    <AuthModal>
      <Button>Sign in</Button>
    </AuthModal>
  </div>;
}
