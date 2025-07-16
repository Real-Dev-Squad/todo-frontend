import { apiClient } from '@/lib/api-client'
import { TApiMethodsRecord } from '../common/common-api.types'
import { GetTeamByIdResponseDto, GetTeamsDto } from './teams.type'

export const TeamsApi = {
  getTeams: {
    key: ['TeamsApi.getTeams'],
    fn: async (): Promise<GetTeamsDto> => {
      const { data } = await apiClient.get<GetTeamsDto>('/v1/teams')
      return data
    },
  },
  getTeamById: {
    key: (teamId: string) => ['TeamsApi.getTeamById', teamId],
    fn: async (teamId: string): Promise<GetTeamByIdResponseDto> => {
      const { data } = await apiClient.get<GetTeamByIdResponseDto>(`/v1/teams/${teamId}`)
      return data
    },
  },
} satisfies TApiMethodsRecord
