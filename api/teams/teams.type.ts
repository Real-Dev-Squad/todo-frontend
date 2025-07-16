export type TTeam = {
  id: string
  name: string
  description: string | null
  poc_id: string
  invite_code: string
  created_by: string
  updated_by: string
  created_at: string
  updated_at: string
}

export type GetTeamsDto = {
  teams: TTeam[]
  total: number
}

export type GetTeamByIdReqDto = {
  teamId: string
  member?: boolean
}

export type GetTeamByIdResponseDto = {
  id: string
  name: string
  description: string | null
  poc_id: string
  invite_code: string
  created_by: string
  updated_by: string
  created_at: string
  updated_at: string
  users: { id: string; name: string; tasksAssignedCount?: number; addedOn?: string }[] | null
}
