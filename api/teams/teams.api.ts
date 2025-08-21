import { apiClient } from '@/lib/api-client'
import { TApiMethodsRecord } from '../common/common.types'
import {
  CreateTeamPayload,
  GetTeamByIdReqDto,
  GetTeamsDto,
  TeamActivityTimeline,
  TeamDto,
  TTeam,
  UserRole,
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
    fn: async ({ teamId, ...params }: GetTeamByIdReqDto): Promise<TeamDto> => {
      const { data } = await apiClient.get<TeamDto>(`/v1/teams/${teamId}`, {
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
    }): Promise<TeamDto> => {
      const { data } = await apiClient.post<TeamDto>(`/v1/teams/${teamId}/members`, {
        member_ids,
      })
      return data
    },
  },
  joinTeamByInviteCode: {
    key: ['TeamsApi.joinTeamByInviteCode'],
    fn: async ({ inviteCode }: { inviteCode: string }): Promise<TeamDto> => {
      const { data } = await apiClient.post<TeamDto>(`/v1/teams/join-by-invite`, {
        invite_code: inviteCode,
      })

      return data
    },
  },
  getTeamActivities: {
    key: ({ teamId }: { teamId: string }) => ['TeamsApi.getTeamActivities', teamId],
    fn: async ({ teamId }: { teamId: string }): Promise<TeamActivityTimeline> => {
      const { data } = await apiClient.get<TeamActivityTimeline>(
        `/v1/teams/${teamId}/activity-timeline`,
      )

      return data
    },
  },
  removeFromTeam: {
    key: ({ teamId }: { teamId: string }) => ['TeamsApi.removeFromTeam', teamId],
    fn: async ({ teamId, memberId }: { teamId: string; memberId: string }) => {
      const { data } = await apiClient.delete(`/v1/teams/${teamId}/members/${memberId}`)
      return data
    },
  },
  getUserRoles: {
    key: ({ teamId, userId }: { teamId: string; userId: string }) => [
      'TeamsApi.getUserRoles',
      teamId,
      userId,
    ],
    fn: async ({ teamId, userId }: { teamId: string; userId: string }): Promise<UserRole> => {
      const { data } = await apiClient.get(`/v1/teams/${teamId}/users/${userId}/roles`)
      return data
    },
  },
} satisfies TApiMethodsRecord
