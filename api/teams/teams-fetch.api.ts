import { FetchClient } from '@/lib/fetch-client'
import { type TApiMethodsRecord } from '../common/common.types'
import { type GetTeamsDto } from './teams.type'

export const TeamsFetchApi = {
  getTeams: {
    key: ['TeamsFetchApi.getTeams'],
    fn: () => FetchClient.get<GetTeamsDto>('/v1/teams', ['TeamsFetchApi.getTeams']),
  },
} satisfies TApiMethodsRecord
