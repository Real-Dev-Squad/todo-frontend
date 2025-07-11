export type Task = {
  id: string
  title: string
  description?: string
  labels?: { name: string }[]
  status?: TASK_STATUS
  priority?: TASK_PRIORITY
  assignee: {
    id: string
    name: string
  }
  tags?: string[]
  dueAt?: string
  isInWatchlist?: boolean
}

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

export type Mode = 'create' | 'view' | 'edit'

export type FormMode = { [key: string]: Mode }
