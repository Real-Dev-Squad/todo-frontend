import { apiClient } from '../api-client'

export type TeamCreatePayload = {
  name: string
  description?: string
  member_ids: string[]
  poc_id: string | null
}

export const teamsApi = {
  createTeam: {
    key: ['teamsApi.createTeam'],
    fn: async (teamData: TeamCreatePayload) => {
      const { data } = await apiClient.post(`/v1/teams`, teamData)
      return data
    },
  },
}
