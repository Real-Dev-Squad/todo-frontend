import { apiClient } from '@/lib/api-client'
import { TApiMethodsRecord, TApiResponse } from '../common/common-api.types'
import { TUser } from './users.types'

export const UsersApi = {
  getUserInfo: {
    key: ['usersApi.getUserInfo'],
    fn: async (): Promise<TUser> => {
      const { data } = await apiClient.get<TApiResponse<TUser>>('/v1/users', {
        params: {
          profile: true,
        },
      })

      return data.data
    },
  },
  searchUser: {
    key: (username: string) => ['usersApi.searchUser', username],
    fn: async (username: string) => {
      const { data } = await apiClient.get(`/v1/users?search=${encodeURIComponent(username)}`)
      return data
    },
  },
} satisfies TApiMethodsRecord
