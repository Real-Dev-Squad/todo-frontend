import { apiClient } from '@/lib/api-client'
import { TApiMethodsRecord } from '../common/common.types'

export const AuthApi = {
  logout: {
    key: ['AuthApi.logout'],
    fn: async (): Promise<void> => {
      await apiClient.post('/v1/auth/logout')
    },
  },
} satisfies TApiMethodsRecord
