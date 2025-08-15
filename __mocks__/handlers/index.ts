import { labelsHandlers } from './labels.handler'
import { tasksHandlers } from './tasks.handler'
import { teamsHandlers } from './teams.handler'
import { usersHandlers } from './users.handler'

export const handlers = [...teamsHandlers, ...usersHandlers, ...labelsHandlers, ...tasksHandlers]
