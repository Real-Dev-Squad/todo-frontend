export type TInviteCode = {
  id: string
  code: string
  description?: string | null
  created_by: {
    id: string
    name: string
  }
  created_at: string
  used_at?: string | null
  used_by?: {
    id: string
    name: string
  } | null
  is_used: boolean
}

export type TGenerateInviteCodeRequest = {
  description?: string
}

export type TGenerateInviteCodeResponse = {
  code: string
  description?: string | null
  message: string
}

export type TGetInviteCodesResponse = {
  codes: TInviteCode[]
  previous_url: string | null
  next_url: string | null
  message: string
}

export type TGetInviteCodesParams = {
  page?: number
  limit?: number
}
