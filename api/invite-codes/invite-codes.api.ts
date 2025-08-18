import { apiClient } from '@/lib/api-client'
import { TApiMethodsRecord } from '../common/common.types'
import {
  TGenerateInviteCodeRequest,
  TGenerateInviteCodeResponse,
  TGetInviteCodesParams,
  TGetInviteCodesResponse,
} from './invite-codes.types'

export const InviteCodesApi = {
  generateInviteCode: {
    key: ['InviteCodesApi.generateInviteCode'],
    fn: async (data: TGenerateInviteCodeRequest): Promise<TGenerateInviteCodeResponse> => {
      const { data: response } = await apiClient.post<TGenerateInviteCodeResponse>(
        '/v1/team-invite-codes/generate',
        data,
      )
      return response
    },
  },
  getInviteCodes: {
    key: (params?: TGetInviteCodesParams) => [
      'InviteCodesApi.getInviteCodes',
      params?.page,
      params?.limit,
    ],
    fn: async (params?: TGetInviteCodesParams): Promise<TGetInviteCodesResponse> => {
      const { data } = await apiClient.get<TGetInviteCodesResponse>('/v1/team-invite-codes', {
        params,
      })
      return data
    },
  },
} satisfies TApiMethodsRecord
