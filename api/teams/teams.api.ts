import { apiClient } from '@/lib/api-client'
import { TApiMethodsRecord } from '../common/common.types'
import {
  CreateTeamPayload,
  GetTeamByIdReqDto,
  GetTeamByIdResponseDto,
  GetTeamsDto,
  TTeam,
} from './teams.type'

export const TeamsApi = {
  getTeams: {
    key: ['TeamsApi.getTeams'],
    fn: async (): Promise<GetTeamsDto> => {
      const { data } = await apiClient.get<GetTeamsDto>('/v1/teams')
      return data
    },
  },
  getTeamById: {
    key: ({ teamId, member }: GetTeamByIdReqDto) => ['TeamsApi.getTeamById', teamId, member],
    fn: async ({ teamId, ...params }: GetTeamByIdReqDto): Promise<GetTeamByIdResponseDto> => {
      const { data } = await apiClient.get<GetTeamByIdResponseDto>(`/v1/teams/${teamId}`, {
        params,
      })
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
  addMembers: {
    key: ({ teamId }: { teamId: string }) => ['TeamsApi.addMembers', teamId],
    fn: async ({
      teamId,
      member_ids,
    }: {
      teamId: string
      member_ids: string[]
    }): Promise<GetTeamByIdResponseDto> => {
      const { data } = await apiClient.post<GetTeamByIdResponseDto>(`/v1/teams/${teamId}/members`, {
        member_ids,
      })
      return data
    },
  },
} satisfies TApiMethodsRecord
