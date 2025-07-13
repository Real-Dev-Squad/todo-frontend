import { apiClient } from '@/lib/api-client'
import { TApiMethodsRecord } from '../common/common-api.types'
import { GetTeamsDto } from './teams.type'

export const TeamsApi = {
  getTeams: {
    key: ['TeamsApi.getTeams'],
    fn: async (): Promise<GetTeamsDto> => {
      const { data } = await apiClient.get<GetTeamsDto>('/v1/teams')
      return data
    },
  },
} satisfies TApiMethodsRecord
