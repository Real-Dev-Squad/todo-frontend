import { useMutation } from '@tanstack/react-query'
import { signInWithGoogle } from '@/api/signin/signin.api'

export const useSignInMutation = () => {
  return useMutation({
    mutationFn: signInWithGoogle,
    onSuccess: (data) => {
      console.log('Sign in successful:', data)
      // TODO: Handle successful sign-in (e.g., redirect, store tokens, etc.)
    },
    onError: (error) => {
      console.error('Sign in failed:', error)
      // TODO: Handle sign-in error (e.g., show error message)
    },
  })
} 