import { TASK_PRIORITY_ENUM, TASK_STATUS_ENUM } from './tasks.enum'

export type Label = {
  id: string
  name: string
  color: string
}
export type TTask = {
  id: string
  title: string
  description?: string
  labels?: Label[]
  status: TASK_STATUS_ENUM
  priority?: TASK_PRIORITY_ENUM
  assignee?: {
    id: string
    name: string
  } | null
  tags?: string[]
  dueAt?: string
  in_watchlist?: boolean | null
}

export type TEditTask = {
  id: string
  title: string
  description?: string
  labels?: Label[] | string[]
  status: TASK_STATUS_ENUM
  priority?: TASK_PRIORITY_ENUM
  assignee?: {
    id: string
    name: string
  } | null
  tags?: string[]
  dueAt?: string
  in_watchlist?: boolean | null
}

export type GetTaskReqDto = {
  teamId?: string
}

export type GetTasksDto = {
  links: {
    next: string
  }
  tasks: TTask[]
}

export type CrateTaskDto = {
  title: string
  description?: string
  priority?: TASK_PRIORITY_ENUM
  status?: TASK_STATUS_ENUM
  labels?: string[]
  dueAt?: string
}

export type UpdateTaskDto = {
  id: string
  title?: string
  description?: string
  priority?: TASK_PRIORITY_ENUM
  status?: TASK_STATUS_ENUM
  labels?: string[]
  dueAt?: string
}

export type GetWatchListTaskDto = {
  tasks: TWatchListTask[]
}

export type AddTaskToWatchListDto = {
  taskId: string
}

export type ToggleWatchListStatusDto = {
  taskId: string
  isActive: boolean
}

export type TWatchListTask = {
  taskId: string
  displayId: string
  userId: string
  title: string
  description?: string
  priority?: number
  status: TASK_STATUS_ENUM
  isAcknowledged: boolean | null
  isDeleted: boolean | null
  labels?: string[]
  dueAt: string
  createdAt: string
  createdBy: string
  watchlistId: string
}
