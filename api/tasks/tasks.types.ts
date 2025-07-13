import { TASK_PRIORITY_ENUM, TASK_STATUS_ENUM } from './tasks.enum'

export type TTask = {
  id: string
  title: string
  description?: string
  labels?: { name: string }[]
  status: TASK_STATUS_ENUM
  priority?: TASK_PRIORITY_ENUM
  assignee: {
    id: string
    name: string
  }
  tags?: string[]
  dueAt?: string
  isInWatchlist?: boolean
}

export type GetTasksDto = {
  links: {
    next: string
  }
  tasks: TTask[]
}

export type CreateTaskDto = Omit<TTask, 'priority' | 'assignee' | 'id'>
