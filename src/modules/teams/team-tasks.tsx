import { USER_TYPE_ENUM } from '@/api/common/common-enum'
import { TasksApi } from '@/api/tasks/tasks.api'
import { TASK_STATUS_ENUM } from '@/api/tasks/tasks.enum'
import { GetTaskReqDto, TTask } from '@/api/tasks/tasks.types'
import { TeamsApi } from '@/api/teams/teams.api'
import { TTeam } from '@/api/teams/teams.type'
import { Searchbar } from '@/components/common/searchbar'
import { EditTodoButton } from '@/components/todos/edit-task-button'
import { IncludeDoneSwitch } from '@/components/todos/include-done-switch'
import { TaskPriorityLabel } from '@/components/todos/task-priority-label'
import { TodoLabelsList } from '@/components/todos/todo-labels-list'
import { TodoListTableHeader, TodoListTableRowShimmer } from '@/components/todos/todo-list-table'
import { TodoStatusTable } from '@/components/todos/todo-status-table'
import { WatchListButton } from '@/components/todos/watchlist-button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { ReassignUser } from '@/components/users/reassign-user'
import { useAuth } from '@/hooks/useAuth'
import { DateFormats, DateUtil } from '@/lib/date-util'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useSearch } from '@tanstack/react-router'

type TodoListTableRowProps = {
  todo: TTask
  team?: TTeam
}

const TodoListTableRow = ({ todo, team }: TodoListTableRowProps) => {
  const { user } = useAuth()
  const isRessignTodoCtaVisible =
    todo.assignee?.user_type === USER_TYPE_ENUM.TEAM && team?.poc_id === user.id
  const isEditTodoVisible = todo.assignee?.assignee_id === user.id

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

      <TableCell className="flex items-center gap-0.5">
        {isRessignTodoCtaVisible && <ReassignUser taskId={todo.id} teamId={team.id} />}
        {isEditTodoVisible && <EditTodoButton todo={todo} teamId={team?.id} />}
        {!isRessignTodoCtaVisible && (
          <WatchListButton teamId={team?.id} taskId={todo.id} isInWatchlist={todo.in_watchlist} />
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
  const navigate = useNavigate()
  const searchParams = useSearch({ from: '/_internal/teams/$teamId/todos' })
  const status = searchParams.status?.toUpperCase()
  const includeDoneTasks = status === TASK_STATUS_ENUM.DONE
  const queryParams: GetTaskReqDto = {
    teamId,
    ...(includeDoneTasks && { status: TASK_STATUS_ENUM.DONE }),
  }

  const { data: team, isLoading: isLoadingTeam } = useQuery({
    queryKey: TeamsApi.getTeamById.key({ teamId }),
    queryFn: () => TeamsApi.getTeamById.fn({ teamId }),
  })

  const { data: tasks, isLoading: isLoadingTasks } = useQuery({
    queryKey: TasksApi.getTasks.key(queryParams),
    queryFn: () => TasksApi.getTasks.fn(queryParams),
    select: (data) => data.tasks,
  })

  const search = searchParams.search ?? ''

  const handleSearch = (searchValue: string) => {
    navigate({
      to: '/teams/$teamId/todos',
      params: { teamId },
      search: (prev) => ({
        status: prev.status || undefined,
        search: searchValue || undefined,
      }),
    })
  }

  const handleIncludeDoneChange = (includeDone: boolean) => {
    navigate({
      to: '/teams/$teamId/todos',
      params: { teamId },
      search: (prev) => ({
        status: includeDone ? TASK_STATUS_ENUM.DONE : undefined,
        search: prev.search || undefined,
      }),
    })
  }

  return (
    <div>
      <div className="flex items-center pb-4">
        <Searchbar
          defaultValue={search}
          placeholder="Search tasks"
          containerClassName="w-full lg:max-w-xs"
          onChange={(e) => handleSearch(e.target.value)}
        />
        <IncludeDoneSwitch
          onStatusChange={handleIncludeDoneChange}
          initialChecked={includeDoneTasks}
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
