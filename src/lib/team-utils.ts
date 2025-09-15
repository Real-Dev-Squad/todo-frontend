import { TeamActivity, TeamActivityActions } from '@/api/teams/teams.type'
import { TASK_STATUS_TO_TEXT_MAP } from '@/components/todos/todo-status-table'
import {
  LucideIcon,
  Minus,
  Plus,
  RefreshCcw,
  UserMinus,
  UserPlus,
  Users,
  UsersRound,
} from 'lucide-react'
import { DateFormats, DateUtil } from './date-util'

type ActivityUIData = {
  icon: LucideIcon
  title: string
  description: string
  date: string
}

export function getActivityUIData(activity: TeamActivity): ActivityUIData | undefined {
  const date = new DateUtil(activity.timestamp).format(DateFormats.D_MMM_YYYY_HH_mm)
  switch (activity.action) {
    case TeamActivityActions.TEAM_CREATED:
      return {
        icon: Users,
        title: 'Team created',
        description: `${activity.performed_by_name} created the team ${activity.team_name}`,
        date,
      }
    case TeamActivityActions.ASSIGNED_TO_TEAM:
      return {
        icon: Plus,
        title: 'Task assigned to team',
        description: `${activity.performed_by_name} assigned task ${activity.task_title} to ${activity.team_name}`,
        date,
      }
    case TeamActivityActions.UNASSIGNED_FROM_TEAM:
      return {
        icon: Minus,
        title: 'Task unassigned from team',
        description: `${activity.performed_by_name} unassigned task ${activity.task_title} from ${activity.team_name}`,
        date,
      }
    case TeamActivityActions.STATUS_CHANGED:
      return {
        icon: RefreshCcw,
        title: 'Task status changed',
        description: `${activity.performed_by_name} changed status of ${activity.task_title} from ${TASK_STATUS_TO_TEXT_MAP[activity.status_from as keyof typeof TASK_STATUS_TO_TEXT_MAP]} to ${TASK_STATUS_TO_TEXT_MAP[activity.status_to as keyof typeof TASK_STATUS_TO_TEXT_MAP]}`,
        date,
      }
    case TeamActivityActions.REASSIGN_EXECUTOR:
      return {
        icon: UsersRound,
        title: 'Executor reassigned',
        description: `${activity.spoc_name} changed executor of ${activity.task_title} ${
          activity.previous_executor_name
            ? `from ${activity.previous_executor_name} to ${activity.new_executor_name}`
            : `to ${activity.new_executor_name}`
        }`,
        date,
      }
    case TeamActivityActions.MEMBER_ADDED_TO_TEAM:
      return {
        icon: UserPlus,
        title: 'Member added to team',
        description: `${activity.performed_by_name} added a member to team ${activity.team_name}`,
        date,
      }
    case TeamActivityActions.MEMBER_JOINED_TEAM:
      return {
        icon: UserPlus,
        title: 'Member joined team',
        description: `${activity.performed_by_name} joined team ${activity.team_name}`,
        date,
      }
    case TeamActivityActions.MEMBER_LEFT_TEAM:
      return {
        icon: UserMinus,
        title: 'Member left team',
        description: `${activity.performed_by_name} left the team ${activity.team_name}`,
        date,
      }
    case TeamActivityActions.TASKS_REASSIGNED_TO_TEAM:
      return {
        icon: Plus,
        title: 'Tasks reassigned to team',
        description: `${activity.task_count} tasks assigned to team ${activity.team_name}`,
        date,
      }
    default:
      return undefined
  }
}
