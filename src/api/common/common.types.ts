import { USER_TYPE_ENUM } from './common-enum'

type TApiFunction<T> = {
  key: string[] | ((...args: unknown[]) => Array<string | number | boolean | undefined>)
  fn: (...args: unknown[]) => Promise<T>
}

export type TApiMethodsRecord = Record<string, TApiFunction<unknown>>

export type TApiResponse<T> = {
  data: T
  message: string
}

export type TMinimalUser = {
  id: string
  name: string
}

export type TTaskAssignee = {
  id: string
  task_id: string
  assignee_id: string
  assignee_name: string
  user_type: USER_TYPE_ENUM
  is_active: boolean
  created_by: string
  updated_by: string | null
  created_at: string
  updated_at: string | null
}
