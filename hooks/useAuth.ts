import { UsersApi } from '@/api/users/users.api'
import { TUser } from '@/api/users/users.types'
import { useQuery } from '@tanstack/react-query'

const DEFAULT_USER: TUser = {
  user_id: '',
  auth_type: '',
  google_id: '',
  email: '',
  name: '',
}

export function useAuth() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    retry: false,
    queryKey: UsersApi.getUserInfo.key,
    queryFn: UsersApi.getUserInfo.fn,
  })

  return { user: user || DEFAULT_USER, isLoading, isError, isLoggedIn: !!user }
}
