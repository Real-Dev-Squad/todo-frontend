import { TASK_PRIORITY, TASK_STATUS } from './tasks.enum'

export type TTask = {
  id: string
  title: string
  description?: string
  labels?: { name: string }[]
  status: TASK_STATUS
  priority?: TASK_PRIORITY
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
