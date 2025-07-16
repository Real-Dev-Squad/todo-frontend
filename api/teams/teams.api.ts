import { apiClient } from '@/lib/api-client'
import { TApiMethodsRecord } from '../common/common-api.types'
import { CreateTeamPayload, GetTeamsDto, TTeam } from './teams.type'

export const TeamsApi = {
  getTeams: {
    key: ['TeamsApi.getTeams'],
    fn: async (): Promise<GetTeamsDto> => {
      const { data } = await apiClient.get<GetTeamsDto>('/v1/teams')
      return data
    },
  },

  createTeam: {
    key: ['TeamsApi.createTeam'],
    fn: async (teamData: CreateTeamPayload): Promise<TTeam> => {
      const { data } = await apiClient.post<TTeam>(`/v1/teams`, teamData)
      return data
    },
  },
} satisfies TApiMethodsRecord
