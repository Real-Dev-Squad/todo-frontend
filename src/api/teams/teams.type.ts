import type { RolesScope, TeamRoles } from './teams.enum'

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
  users: TTeamUser[] | null
}

export type TTeamUser = {
  id: string
  name: string
  tasksAssignedCount?: number
  addedOn?: string
}

export type TTeamDto = {
  team: TTeam
  message: string
}

export type GetTeamsDto = {
  teams: TTeam[]
  total: number
}

export type GetTeamByIdReqDto = {
  teamId: string
  member?: boolean
}

export type TeamDto = TTeam

export type CreateTeamPayload = {
  name: string
  description?: string
  member_ids: string[]
  poc_id: string | null
  team_invite_code: string
}

export enum TeamActivityActions {
  ASSIGNED_TO_TEAM = 'assigned_to_team',
  UNASSIGNED_FROM_TEAM = 'unassigned_from_team',
  STATUS_CHANGED = 'status_changed',
  REASSIGN_EXECUTOR = 'reassign_executor',
  TEAM_CREATED = 'team_created',
  MEMBER_JOINED_TEAM = 'member_joined_team',
  MEMBER_ADDED_TO_TEAM = 'member_added_to_team',
  MEMBER_REMOVED_FROM_TEAM = 'member_removed_from_team',
  MEMBER_LEFT_TEAM = 'member_left_team',
}

export type BaseActivity = {
  timestamp: string
  team_name: string
}

export type TeamCreationActivity = BaseActivity & {
  action: TeamActivityActions.TEAM_CREATED
  performed_by_name: string
}

export type TaskAssignActivity = BaseActivity & {
  action: TeamActivityActions.ASSIGNED_TO_TEAM
  task_title: string
  performed_by_name: string
}

export type TaskUnassignActivity = BaseActivity & {
  action: TeamActivityActions.UNASSIGNED_FROM_TEAM
  task_title: string
  performed_by_name: string
}

export type TaskStatusChangeActivity = BaseActivity & {
  action: TeamActivityActions.STATUS_CHANGED
  task_title: string
  performed_by_name: string
  status_from: string
  status_to: string
}

export type ReassignExecutorActivity = BaseActivity & {
  action: TeamActivityActions.REASSIGN_EXECUTOR
  task_title: string
  previous_executor_name: string
  new_executor_name: string
  spoc_name: string
}

export type AddMemberActivity = BaseActivity & {
  action: TeamActivityActions.MEMBER_ADDED_TO_TEAM
  performed_by_name: string
}

export type MemberJoinActivity = BaseActivity & {
  action: TeamActivityActions.MEMBER_JOINED_TEAM
  performed_by_name: string
}

export type RemoveTeamMemberActivity = BaseActivity & {
  action: TeamActivityActions.MEMBER_REMOVED_FROM_TEAM
  performed_by_name: string
}

export type MemberLeftTeamActivity = BaseActivity & {
  action: TeamActivityActions.MEMBER_LEFT_TEAM
  performed_by_name: string
}

export type TeamActivity =
  | TeamCreationActivity
  | TaskAssignActivity
  | TaskUnassignActivity
  | TaskStatusChangeActivity
  | ReassignExecutorActivity
  | AddMemberActivity
  | MemberJoinActivity
  | RemoveTeamMemberActivity
  | MemberLeftTeamActivity

export type TeamActivityTimeline = {
  timeline: TeamActivity[]
}

export type TeamRole = {
  role_id: string
  role_name: TeamRoles
  scope: RolesScope.TEAM
  team_id: string
  assigned_at: string
}

export type UserRolesDetails = {
  team_id: string
  user_id: string
  roles: readonly TeamRole[]
}

export type TeamCreationCodeVerificationResponse = {
  message: string
}

export type RemoveFromTeamParams = {
  teamId: string
  memberId: string
}

export type GetUserRolesParams = {
  teamId: string
  userId: string
}

export type UpdateTeamPocParams = {
  teamId: string
  pocId: string
}
