export enum TASK_STATUS {
  TODO = 'Todo',
  IN_PROGRESS = 'In-Progress',
  COMPLETED = 'Completed',
}

export enum TASK_PRIORITY {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
}

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
