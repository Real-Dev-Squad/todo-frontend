import { Task } from './tasks'

export type TasksApiResponse = {
  links: Record<string, string>
  tasks: Task[]
}
