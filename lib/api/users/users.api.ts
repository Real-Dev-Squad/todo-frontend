import { apiClient } from '../api-client'

export const usersApi = {
  searchUser: {
    key: ['usersApi.searchUser'],
    fn: async (username: string) => {
      const { data } = await apiClient.get(`/v1/users?search=${encodeURIComponent(username)}`)
      return data
    },
  },
}
