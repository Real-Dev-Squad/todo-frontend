import { apiClient } from '@/lib/api-client'
import { TApiMethodsRecord } from '../common/common-api.types'
import { TaskAssignmentReqDto } from './task-assignment.type'

export const TaskAssignmentApi = {
  assignTaskToUserOrTeam: {
    key: ['TaskAssignmentApi.assignTaskToUserOrTeam'],
    fn: async (data: TaskAssignmentReqDto) => {
      const response = await apiClient.post(`/v1/task-assignments`, data)
      return response.data
    },
  },
} satisfies TApiMethodsRecord
