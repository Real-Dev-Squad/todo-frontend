import { apiClient } from '../../lib/api-client'
import { TApiMethodsRecord } from '../common/common.types'
import {
  AddTaskToWatchListDto,
  CrateTaskReqDto,
  GetTaskReqDto,
  GetTasksDto,
  GetWatchListTaskDto,
  ReassignTaskReqDto,
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
    fn: async (task: CrateTaskReqDto): Promise<TTask> => {
      const { data } = await apiClient.post<TTask>(`/v1/tasks`, task)
      return data
    },
  },

  updateTask: {
    key: ['tasksApi.updateTask'],
    fn: async ({ id, ...task }: UpdateTaskDto): Promise<TTask> => {
      const { data } = await apiClient.patch<TTask>(`/v1/tasks/${id}/update`, task)
      return data
    },
  },

  getWatchListTasks: {
    key: ['TasksApi.getWatchListTasks'],
    fn: async (): Promise<GetWatchListTaskDto> => {
      const { data } = await apiClient.get<GetWatchListTaskDto>(`/v1/watchlist/tasks`)
      return data
    },
  },

  addTaskToWatchList: {
    key: ['tasksApi.addTaskToWatchList'],
    fn: async ({ taskId }: AddTaskToWatchListDto): Promise<void> => {
      await apiClient.post<TWatchListTask>(`/v1/watchlist/tasks`, { taskId })
    },
  },

  toggleTaskWatchListStatus: {
    key: ['tasksApi.toggleTaskWatchListStatus'],
    fn: async ({ taskId, isActive }: ToggleWatchListStatusDto): Promise<void> => {
      await apiClient.patch(`/v1/watchlist/tasks/${taskId}`, { isActive })
    },
  },

  reassignTask: {
    key: ['TasksApi.reassignTask'],
    fn: async ({ task_id, executor_id }: ReassignTaskReqDto): Promise<void> => {
      await apiClient.patch(`/v1/task-assignments/${task_id}`, { executor_id })
    },
  },
} satisfies TApiMethodsRecord
