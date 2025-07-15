import { apiClient } from '@/lib/api-client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GetTeamsDto, TeamCreatePayload } from './teams.type'

const teamsApiMethods = {
  getTeams: async (): Promise<GetTeamsDto> => {
    const { data } = await apiClient.get<GetTeamsDto>('/v1/teams')
    return data
  },

  createTeam: async (teamData: TeamCreatePayload) => {
    const { data } = await apiClient.post(`/v1/teams`, teamData)
    return data
  },
}

export const teamsKeys = {
  all: ['teams'] as const,
  lists: () => [...teamsKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...teamsKeys.lists(), { filters }] as const,
}

export const useGetTeams = () => {
  return useQuery({
    queryKey: teamsKeys.lists(),
    queryFn: teamsApiMethods.getTeams,
    staleTime: 5 * 60 * 1000,
  })
}

export const useCreateTeam = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: teamsApiMethods.createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamsKeys.lists() })
    },
  })
}
