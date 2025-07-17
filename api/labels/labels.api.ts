import { apiClient } from '@/lib/api-client'
import { TApiMethodsRecord } from '../common/common-api.types'
import { Label } from './labels.types'

export const LablesApi = {
  getLabel: {
    key: ['LabelApi.getLables'],
    fn: async (): Promise<Label[]> => {
      const res = await apiClient.get('/v1/labels')
      return res?.data?.labels ?? []
    },
  },
} satisfies TApiMethodsRecord
