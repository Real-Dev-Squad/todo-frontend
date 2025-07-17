export type TUser = {
  userId: string
  email: string
  name: string
  picture?: string
}

export type TUsersSearchParams = {
  search?: string
  profile?: boolean
}
