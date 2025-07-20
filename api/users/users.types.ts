import { TMinimalUser } from '../common/common.types'

export type TUser = Pick<TMinimalUser, 'id' | 'name'> & {
  email?: string
  picture?: string
}

export type TUsersSearchParams = {
  search?: string
  profile?: boolean
}

export type TUsersSearchResponse = {
  users: TUser[]
  limit: number
  page: number
  total_count: number
}
