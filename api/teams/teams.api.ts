import { apiClient } from '@/lib/api-client'
import { TApiMethodsRecord } from '../common/common-api.types'
import { GetTeamByIdReqDto, GetTeamByIdResponseDto, GetTeamsDto } from './teams.type'

export const TeamsApi = {
  getTeams: {
    key: ['TeamsApi.getTeams'],
    fn: async (): Promise<GetTeamsDto> => {
      const { data } = await apiClient.get<GetTeamsDto>('/v1/teams')
      return data
    },
  },
  getTeamById: {
    key: ({ teamId, member: members }: GetTeamByIdReqDto) => [
      'TeamsApi.getTeamById',
      teamId,
      members,
    ],
    fn: async ({ teamId, ...params }: GetTeamByIdReqDto): Promise<GetTeamByIdResponseDto> => {
      const { data } = await apiClient.get<GetTeamByIdResponseDto>(`/v1/teams/${teamId}`, {
        params,
      })

      return data
    },
  },
} satisfies TApiMethodsRecord
