"use client"
import { signInWithGoogle } from "@/api/signin/signin.api"
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
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"


export function SigninButton() {
  const router = useRouter()
  const googleSignInMutation = useMutation({
    mutationFn: signInWithGoogle,
    onSuccess: () => {
        toast.success("Logged in successfully")
        router.push("/dashboard")
    },
    onError: () => {
      toast.error("Failed to log in. Please try again.")
    }
  })
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
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg"
            onClick={() => {
              googleSignInMutation.mutate()
            }}
            disabled={googleSignInMutation.isPending}
          >
            {googleSignInMutation.isPending ? "Signing in..." : "Continue with Google"}
          </Button>
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
