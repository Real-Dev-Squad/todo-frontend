import { apiClient } from '../../lib/api-client'
import { TApiMethodsRecord } from '../common/common-api.types'
import { CrateTaskDto, GetTasksDto, TTask } from './tasks.types'

export const TasksApi = {
  getTasks: {
    key: ['TasksApi.getTasks'],
    fn: async (): Promise<GetTasksDto> => {
      const { data } = await apiClient.get<GetTasksDto>(`/v1/tasks`)
      return data
    },
  },

  createTask: {
    key: ['tasksApi.createTask'],
    fn: async (task: CrateTaskDto): Promise<TTask> => {
      const { data } = await apiClient.post<TTask>(`/v1/tasks`, task)
      return data
    },
  },

  updateTask: {
    key: ['tasksApi.updateTask'],
    fn: async (task: TTask): Promise<TTask> => {
      console.log('task', task)
      const { data } = await apiClient.patch<TTask>(`/v1/tasks/${task.id}`, task)
      return data
    },
  },
} satisfies TApiMethodsRecord
