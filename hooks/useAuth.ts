'use client'

import { appConfig } from '@/config/app-config'
import { useQuery } from '@tanstack/react-query'

// todo: remove this and use zustand
export function useAuth() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['users', 'profile'],
    queryFn: async () => {
      const res = await fetch(`${appConfig.backendBaseUrl}/v1/users?profile=true`, {
        credentials: 'include',
      })
      if (!res.ok) throw new Error('Not authenticated')
      return res.json()
    },
    retry: false,
  })

  const isAuthenticated = !isError && !isLoading && !!user
  const userData = isAuthenticated ? user : undefined

  return { isAuthenticated, user: userData, isLoading, isError }
}
