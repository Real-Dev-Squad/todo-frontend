import { apiClient } from '../../lib/api-client'
import { TApiMethodsRecord } from '../common/common-api.types'
import { CrateTaskDto, GetTasksDto, TTask, UpdateTaskDto } from './tasks.types'

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
    fn: async ({ id, ...task }: UpdateTaskDto): Promise<void> => {
      await apiClient.patch<TTask>(`/v1/tasks/${id}`, task)
    },
  },
} satisfies TApiMethodsRecord
