export type TUser = {
  id: string
  email?: string
  name: string
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
