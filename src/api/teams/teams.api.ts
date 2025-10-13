import { apiClient } from '@/lib/api-client'
import {
  CreateTeamPayload,
  GetTeamByIdReqDto,
  GetTeamsDto,
  GetUserRolesParams,
  RemoveFromTeamParams,
  TeamActivityTimeline,
  TeamCreationCodeVerificationResponse,
  TeamDto,
  TTeamDto,
  UpdateTeamParams,
  UserRolesDetails,
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
    fn: async (teamData: CreateTeamPayload): Promise<TTeamDto> => {
      const { data } = await apiClient.post<TTeamDto>(`/v1/teams`, teamData)
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
    key: ({ teamId, memberId }: RemoveFromTeamParams) => [
      'TeamsApi.removeFromTeam',
      teamId,
      memberId,
    ],
    fn: async ({ teamId, memberId }: RemoveFromTeamParams): Promise<void> => {
      await apiClient.delete(`/v1/teams/${teamId}/members/${memberId}`)
    },
  },
  getUserRoles: {
    key: ({ teamId, userId }: GetUserRolesParams) => ['TeamsApi.getUserRoles', teamId, userId],
    fn: async ({ teamId, userId }: GetUserRolesParams): Promise<UserRolesDetails> => {
      const { data } = await apiClient.get<UserRolesDetails>(
        `/v1/teams/${teamId}/users/${userId}/roles`,
      )
      return data
    },
  },

  verifyTeamCreationCode: {
    key: ['TeamsApi.verifyTeamCreationCode'],
    fn: async ({ code }: { code: string }): Promise<TeamCreationCodeVerificationResponse> => {
      const { data } = await apiClient.post<TeamCreationCodeVerificationResponse>(
        '/v1/team-invite-codes/verify',
        { code },
      )
      return data
    },
  },

  updateTeam: {
    key: ({ teamId }: UpdateTeamParams) => ['TeamsApi.updateTeam', teamId],
    fn: async ({ teamId, pocId, ...data }: UpdateTeamParams): Promise<TeamDto> => {
      const { data: updatedData } = await apiClient.patch<TeamDto>(`/v1/teams/${teamId}`, {
        ...data,
        ...(pocId && { poc_id: pocId }),
      })
      return updatedData
    },
  },
}
