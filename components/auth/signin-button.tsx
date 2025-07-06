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

interface AuthModalProps {
  children: React.ReactNode
}

export function AuthModal({ children }: AuthModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
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
              // TODO: later we will implement Google OAuth
              console.log("Continue with Google clicked")
            }}
          >
            Continue with Google
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
