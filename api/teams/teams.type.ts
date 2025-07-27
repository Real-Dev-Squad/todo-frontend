export type TTeam = {
  id: string
  name: string
  description: string | null
  poc_id?: string
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

export type TeamDto = Pick<
  TTeam,
  | 'id'
  | 'name'
  | 'description'
  | 'poc_id'
  | 'invite_code'
  | 'created_by'
  | 'updated_by'
  | 'created_at'
  | 'updated_at'
> & {
  users: { id: string; name: string; tasksAssignedCount?: number; addedOn?: string }[] | null
}

export type CreateTeamPayload = {
  name: string
  description?: string
  member_ids: string[]
  poc_id: string | null
}

export type TeamActivityActions =
  | 'assigned_to_team'
  | 'unassigned_from_team'
  | 'status_changed'
  | 'reassign_executor'
  | 'team_created'
  | 'member_joined_team'
  | 'member_added_to_team'

export type TeamActivity = {
  action: TeamActivityActions
  timestamp: string
  task_title?: string
  team_name?: string
  performed_by_name?: string
  spoc_name?: string
  status_from?: string
  status_to?: string
  previous_executor_name?: string
  new_executor_name?: string
}

export type TeamActivityTimeline = {
  timeline: TeamActivity[]
}
