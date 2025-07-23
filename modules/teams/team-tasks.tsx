'use client'

import { USER_TYPE_ENUM } from '@/api/common/common-enum'
import { TasksApi } from '@/api/tasks/tasks.api'
import { TTask } from '@/api/tasks/tasks.types'
import { TeamsApi } from '@/api/teams/teams.api'
import { TTeam } from '@/api/teams/teams.type'
import { EditTodoButton } from '@/components/edit-task-button'
import { ReassignUser } from '@/components/reassign-user'
import { Searchbar } from '@/components/searchbar'
import { TaskPriorityLabel } from '@/components/task-priority-label'
import { TodoLabelsList } from '@/components/todo-labels-list'
import { TodoListTableHeader, TodoListTableRowShimmer } from '@/components/todo-list-table'
import { TodoStatusTable } from '@/components/todo-status-table'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { useAuth } from '@/hooks/useAuth'
import { DateFormats, DateUtil } from '@/lib/date-util'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const QUERY_PARAMS_KEYS = {
  search: 'search',
}

type TodoListTableRowProps = {
  todo: TTask
  team?: TTeam
}

const TodoListTableRow = ({ todo, team }: TodoListTableRowProps) => {
  const { user } = useAuth()
  const isRessignTodoCtaVisible =
    todo.assignee?.user_type === USER_TYPE_ENUM.TEAM && team?.poc_id === user.id
  const isEditTodoVisible = todo.assignee?.assignee_id === user.id

  const isActionsVisible = isRessignTodoCtaVisible || isEditTodoVisible

  return (
    <TableRow>
      <TableCell className="whitespace-nowrap">{todo.title}</TableCell>

      <TableCell className="whitespace-nowrap">
        <TodoStatusTable status={todo.status} />
      </TableCell>

      <TableCell className="whitespace-nowrap">
        <TodoLabelsList labels={todo.labels ?? []} />
      </TableCell>

      <TableCell className="whitespace-nowrap">
        {todo.priority ? <TaskPriorityLabel priority={todo.priority} /> : '--'}
      </TableCell>

      <TableCell className="whitespace-nowrap">{todo.assignee?.assignee_name ?? '--'}</TableCell>

      <TableCell className="whitespace-nowrap">
        {todo.dueAt ? new DateUtil(todo.dueAt).format(DateFormats.D_MMM_YYYY) : '--'}
      </TableCell>

      <TableCell>
        {isActionsVisible ? (
          <div className="flex items-center gap-0.5">
            {isRessignTodoCtaVisible && <ReassignUser taskId={todo.id} teamId={team.id} />}
            {isEditTodoVisible && <EditTodoButton todo={todo} />}
          </div>
        ) : (
          <div className="px-2">--</div>
        )}
      </TableCell>
    </TableRow>
  )
}

type TodoListTableBodyProps = {
  team?: TTeam
  tasks?: TTask[]
  isLoading?: boolean
  showActions?: boolean
}

const TodoListTableBody = ({ team, tasks, isLoading, showActions }: TodoListTableBodyProps) => {
  if (isLoading) {
    return (
      <TableBody>
        {new Array(5).fill(0).map((_, index) => (
          <TodoListTableRowShimmer key={index} showActions={showActions} />
        ))}
      </TableBody>
    )
  }

  if (!tasks?.length) {
    return (
      <TableBody>
        <TableRow className="h-32">
          <TableCell colSpan={showActions ? 7 : 6}>
            <div className="text-center text-sm text-gray-500">No tasks found</div>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  return (
    <TableBody>
      {tasks?.map((task) => (
        <TodoListTableRow key={task.id} todo={task} team={team} />
      ))}
    </TableBody>
  )
}

type TeamTasksProps = {
  teamId: string
}

export const TeamTasks = ({ teamId }: TeamTasksProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const { data: team, isLoading: isLoadingTeam } = useQuery({
    queryKey: TeamsApi.getTeamById.key({ teamId }),
    queryFn: () => TeamsApi.getTeamById.fn({ teamId }),
  })

  const { data: tasks, isLoading: isLoadingTasks } = useQuery({
    queryKey: TasksApi.getTasks.key({ teamId }),
    queryFn: () => TasksApi.getTasks.fn({ teamId }),
    select: (data) => data.tasks,
  })

  const search = searchParams.get(QUERY_PARAMS_KEYS.search) ?? ''

  const handleSearch = (search: string) => {
    const params = new URLSearchParams(searchParams)

    if (!search) {
      params.delete(QUERY_PARAMS_KEYS.search)
    } else {
      params.set(QUERY_PARAMS_KEYS.search, search)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div>
      <div className="pb-4">
        <Searchbar
          defaultValue={search}
          placeholder="Search tasks"
          containerClassName="w-full lg:max-w-xs"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TodoListTableHeader showActions />
          <TodoListTableBody
            showActions
            team={team}
            tasks={tasks}
            isLoading={isLoadingTeam || isLoadingTasks}
          />
        </Table>
      </div>
    </div>
  )
}
