import { USER_TYPE_ENUM } from '../common/common-enum'
import { TMinimalUser, TTaskAssignee } from '../common/common.types'
import { TASK_PRIORITY_ENUM, TASK_STATUS_ENUM } from './tasks.enum'

export type TLabel = {
  id: string
  name: string
  color: string
}

export type TTask = {
  id: string
  title: string
  description?: string
  labels?: TLabel[]
  status: TASK_STATUS_ENUM
  priority?: TASK_PRIORITY_ENUM
  assignee?: TTaskAssignee | null
  createdBy?: TTaskCreatedBy | null
  tags?: string[]
  dueAt?: string
  in_watchlist?: boolean | null
  deferredDetails?: TDeferredDetails
}

export type TEditTask = {
  id: string
  title: string
  description?: string
  labels?: TLabel[] | string[]
  status: TASK_STATUS_ENUM
  priority?: TASK_PRIORITY_ENUM
  assignee: TMinimalUser | null
  tags?: string[]
  dueAt?: string
  in_watchlist?: boolean | null
}

export type GetTaskReqDto = {
  teamId?: string
  status?: string
}

export type GetTasksDto = {
  links: {
    next: string
  }
  tasks: TTask[]
}

export type CrateTaskReqDto = {
  title: string
  description?: string
  priority?: TASK_PRIORITY_ENUM
  status?: TASK_STATUS_ENUM
  labels?: string[]
  dueAt?: string
  assignee_id: string
  timezone: string
  user_type: USER_TYPE_ENUM
}

export type UpdateTaskDto = {
  id: string
  title?: string
  description?: string
  priority?: TASK_PRIORITY_ENUM
  status?: TASK_STATUS_ENUM
  labels?: string[]
  dueAt?: string
  assignee?: {
    assignee_id: string
    user_type: string
  }
  user_type?: USER_TYPE_ENUM
  timezone?: string
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
  priority?: TASK_PRIORITY_ENUM
  status: TASK_STATUS_ENUM
  isAcknowledged: boolean | null
  isDeleted: boolean | null
  labels?: TLabel[]
  dueAt: string
  createdAt: string
  watchlistId: string
}

export type AssignTaskToUserReqDto = {
  task_id: string
  assignee_id: string
}

export type ReassignTaskReqDto = {
  task_id: string
  executor_id: string
}

export type TDeferredDetails = {
  deferredTill: string
  deferredBy: TMinimalUser
  deferredAt: string
}

export type DeferTaskReqDto = {
  taskId: string
  deferredTill: string
}

export type TTaskCreatedBy = {
  id: string
  name: string
}
