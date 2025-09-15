import { apiClient } from '@/lib/api-client'
import { TApiResponse } from '../common/common.types'
import { TUser, TUsersSearchParams, TUsersSearchResponse } from './users.types'

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
  users: {
    key: (params?: TUsersSearchParams) => ['usersApi.users', ...Object.values(params || {})],
    fn: async (params?: TUsersSearchParams): Promise<TApiResponse<TUsersSearchResponse>> => {
      const { data } = await apiClient.get(`/v1/users`, { params })
      return data
    },
  },
}
