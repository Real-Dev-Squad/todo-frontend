import { AuthApi } from '@/api/auth/auth.api'
import { UsersApi } from '@/api/users/users.api'
import { TUser } from '@/api/users/users.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const DEFAULT_USER: TUser = {
  userId: '',
  email: '',
  name: '',
  picture: '',
}

export const useAuth = () => {
  const queryClient = useQueryClient()

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    retry: false,
    staleTime: 15 * 60 * 1000,
    queryKey: UsersApi.getUserInfo.key,
    queryFn: UsersApi.getUserInfo.fn,
  })

  const logoutMutation = useMutation({
    mutationFn: AuthApi.logout.fn,
    onSuccess: () => {
      queryClient.clear()
      window.location.href = '/'
    },
  })

  return { user: user || DEFAULT_USER, isLoading, isError, isLoggedIn: !!user, logoutMutation }
}
