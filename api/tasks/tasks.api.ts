import { apiClient } from '../../lib/api-client'
import { TApiMethodsRecord } from '../common/common-api.types'
import {
  AddTaskToWatchListDto,
  CrateTaskDto,
  GetTaskReqDto,
  GetTasksDto,
  ToggleWatchListStatusDto,
  TTask,
  TWatchListTask,
  UpdateTaskDto,
} from './tasks.types'

export const TasksApi = {
  getTasks: {
    key: (teamId?: string) => ['TasksApi.getTasks', teamId],
    fn: async (params?: GetTaskReqDto): Promise<GetTasksDto> => {
      const { data } = await apiClient.get<GetTasksDto>(`/v1/tasks`, { params })
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

  addTaskToWatchList: {
    key: ['tasksApi.addTaskToWatchList'],
    fn: async ({ taskId }: AddTaskToWatchListDto) => {
      await apiClient.post<TWatchListTask>(`/v1/watchlist/tasks`, { taskId })
    },
  },

  toggleTaskWatchListStatus: {
    key: ['tasksApi.toggleTaskWatchListStatus'],
    fn: async ({ taskId, isActive }: ToggleWatchListStatusDto) => {
      await apiClient.patch(`/v1/watchlist/tasks/${taskId}`, { isActive })
    },
  },
} satisfies TApiMethodsRecord
