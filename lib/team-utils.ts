import { TeamActivity } from '@/api/teams/teams.type'
import { TASK_STATUS_TO_TEXT_MAP } from '@/components/todo-status-table'
import { LucideIcon, Minus, Plus, RefreshCcw, UserPlus, Users, UsersRound } from 'lucide-react'

type ActivityUIData = {
  icon: LucideIcon
  title: string
  description: string
  date: string
}

export function getActivityUIData(activity: TeamActivity): ActivityUIData | undefined {
  const date = new Date(activity.timestamp).toISOString().split('T')[0]
  const actor = activity.performed_by_name || activity.spoc_name

  switch (activity.action) {
    case 'team_created':
      return {
        icon: Users,
        title: 'Team created',
        description: `${actor} created the team ${activity.team_name}`,
        date,
      }
    case 'assigned_to_team':
      return {
        icon: Plus,
        title: 'Task assigned to team',
        description: `${actor} assigned task ${activity.task_title} to ${activity.team_name}`,
        date,
      }
    case 'unassigned_from_team':
      return {
        icon: Minus,
        title: 'Task unassigned from team',
        description: `${actor} unassigned task ${activity.task_title} from ${activity.team_name}`,
        date,
      }
    case 'status_changed':
      return {
        icon: RefreshCcw,
        title: 'Task status changed',
        description: `${actor} changed status of ${activity.task_title} from ${TASK_STATUS_TO_TEXT_MAP[activity.status_from as keyof typeof TASK_STATUS_TO_TEXT_MAP]} to ${activity.status_to as keyof typeof TASK_STATUS_TO_TEXT_MAP}`,
        date,
      }
    case 'reassign_executor':
      return {
        icon: UsersRound,
        title: 'Executor reassigned',
        description: `${actor} changed executor of ${activity.task_title} ${
          activity.previous_executor_name
            ? `from ${activity.previous_executor_name} to ${activity.new_executor_name}`
            : `to ${activity.new_executor_name}`
        }`,
        date,
      }
    case 'member_added_to_team':
      return {
        icon: UserPlus,
        title: 'Member added to team',
        description: `${actor} added a member to team ${activity.team_name}`,
        date,
      }
    case 'member_joined_team':
      return {
        icon: UserPlus,
        title: 'Member joined team',
        description: `${actor} joined team ${activity.team_name}`,
        date,
      }
    default:
      return undefined
  }
}
