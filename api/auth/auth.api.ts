import { apiClient } from '@/lib/api-client'
import { TApiMethodsRecord } from '../common/common-api.types'

export const AuthApi = {
  logout: {
    key: ['AuthApi.logout'],
    fn: async (): Promise<void> => {
      await apiClient.get('/v1/auth/google/logout/')
    },
  },
} satisfies TApiMethodsRecord
