import { apiClient } from '@/lib/api-client'
import { TApiMethodsRecord } from '../common/common-api.types'
import { GetTeamsDto, TeamCreatePayload } from './teams.type'

export const teamsApi = {
  createTeam: {
    key: ['teamsApi.createTeam'],
    fn: async (teamData: TeamCreatePayload) => {
      try {
        const { data } = await apiClient.post(`/v1/teams`, teamData)
        return data
      } catch (error) {
        console.error('Failed to create team:', error)
        throw error
      }
    },
  },
}

export const TeamsApi = {
  getTeams: {
    key: ['TeamsApi.getTeams'],
    fn: async (): Promise<GetTeamsDto> => {
      const { data } = await apiClient.get<GetTeamsDto>('/v1/teams')
      return data
    },
  },
} satisfies TApiMethodsRecord
