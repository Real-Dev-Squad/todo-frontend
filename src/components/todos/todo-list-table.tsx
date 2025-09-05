import { USER_TYPE_ENUM } from '@/api/common/common-enum'
import { TTask } from '@/api/tasks/tasks.types'
import { useAuth } from '@/hooks/useAuth'
import { DateFormats, DateUtil } from '@/lib/date-util'
import {
  DashboardTasksTableTabs,
  DashboardTasksTableTabs as TabsConstants,
} from '@/modules/dashboard/constants'
import { useNavigate, useSearch } from '@tanstack/react-router'
import { Searchbar } from '../common/searchbar'

import { Shimmer } from '../common/shimmer'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { EditTodoButton } from './edit-task-button'
import { IncludeDoneSwitch } from './include-done-switch'
import { TaskPriorityLabel } from './task-priority-label'
import { TodoLabelsList } from './todo-labels-list'
import { TodoStatusTable } from './todo-status-table'
import { WatchListButton } from './watchlist-button'

type TodoListTableHeaderProps = {
  showActions?: boolean
  showDeferredColumn?: boolean
}

export const TodoListTableHeader = ({
  showActions,
  showDeferredColumn,
}: TodoListTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="text-black">Name</TableHead>
        <TableHead className="text-black">Status</TableHead>
        <TableHead className="text-black">Label</TableHead>
        <TableHead className="text-black">Priority</TableHead>
        <TableHead className="text-black">Assignee</TableHead>
        <TableHead className="text-black">Created By</TableHead>
        <TableHead className="text-black">Due Date</TableHead>
        {showDeferredColumn && <TableHead className="text-black">Deferred Until</TableHead>}
        {showActions && <TableHead className="text-black">Actions</TableHead>}
      </TableRow>
    </TableHeader>
  )
}

type TodoListTableRowProps = {
  todo: TTask
  showActions?: boolean
  showDeferredColumn?: boolean
  userId?: string
}

const TodoListTableRow = ({
  todo,
  showActions,
  showDeferredColumn,
  userId,
}: TodoListTableRowProps) => {
  const isEditTodoVisible = todo.assignee?.assignee_id === userId

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

      <TableCell className="whitespace-nowrap">{todo.createdBy?.name ?? '--'}</TableCell>

      <TableCell className="whitespace-nowrap">
        {todo.dueAt ? new DateUtil(todo.dueAt).format(DateFormats.D_MMM_YYYY) : '--'}
      </TableCell>

      {showDeferredColumn && (
        <TableCell className="whitespace-nowrap">
          {todo.deferredDetails?.deferredTill
            ? new DateUtil(todo.deferredDetails.deferredTill).format(DateFormats.D_MMM_YYYY)
            : '--'}
        </TableCell>
      )}

      <TableCell>
        {showActions ? (
          <div className="flex items-center gap-0.5">
            {isEditTodoVisible && <EditTodoButton todo={todo} />}
            <WatchListButton taskId={todo.id} isInWatchlist={todo.in_watchlist} />
          </div>
        ) : (
          <div className="px-2">--</div>
        )}
      </TableCell>
    </TableRow>
  )
}

type TodoListTableBodyProps = {
  tasks?: TTask[]
  isLoading?: boolean
  isPlaceholderData?: boolean
  showActions?: boolean
  showDeferredColumn?: boolean
}

const TodoListTableBody = ({
  tasks,
  isLoading,
  isPlaceholderData,
  showActions,
  showDeferredColumn,
}: TodoListTableBodyProps) => {
  const { user } = useAuth()

  if (isLoading || isPlaceholderData) {
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
        <TodoListTableRow
          key={task.id}
          todo={task}
          showActions={showActions && task.assignee?.user_type !== USER_TYPE_ENUM.TEAM}
          showDeferredColumn={showDeferredColumn}
          userId={user.id}
        />
      ))}
    </TableBody>
  )
}

export const TodoListTableRowShimmer = ({ showActions = true }: { showActions?: boolean }) => {
  return (
    <TableRow>
      <TableCell colSpan={showActions ? 7 : 6}>
        <Shimmer className="h-8 w-full" />
      </TableCell>
    </TableRow>
  )
}

type TodoListTableProps = {
  tasks?: TTask[]
  isLoading?: boolean
  isPlaceholderData?: boolean
  showActions?: boolean
}

export const TodoListTable = ({
  tasks,
  isLoading,
  isPlaceholderData,
  showActions,
}: TodoListTableProps) => {
  const router = useNavigate()
  const search = useSearch({ from: '/_internal/dashboard' })
  const currentTab = search.tab
  const showIncludeDoneTasksToggle = currentTab === DashboardTasksTableTabs.All || !currentTab
  const showDeferredColumn =
    currentTab === DashboardTasksTableTabs.Deferred ||
    currentTab === DashboardTasksTableTabs.WatchList

  const filteredTasks = !search.search
    ? tasks
    : tasks?.filter(
        (task) =>
          task.title.toLowerCase().includes(search.search?.toLowerCase() ?? '') ||
          task.labels
            ?.join(', ')
            .toLowerCase()
            .includes(search.search?.toLowerCase() ?? '') ||
          task.assignee?.assignee_name.toLowerCase().includes(search.search?.toLowerCase() ?? '') ||
          task.status.toLowerCase().includes(search.search?.toLowerCase() ?? '') ||
          task.priority?.toLowerCase().includes(search.search?.toLowerCase() ?? ''),
      )

  const handleSearch = (searchValue: string) => {
    router({
      to: '/dashboard',
      search: (prev) => ({
        status: prev.status || undefined,
        tab: prev.tab || TabsConstants.All,
        search: searchValue || undefined,
      }),
    })
  }

  return (
    <div>
      <div className="flex items-center pb-4">
        <Searchbar
          defaultValue={search.search}
          placeholder="Search tasks"
          containerClassName="w-full lg:max-w-xs"
          onChange={(e) => handleSearch(e.target.value)}
        />
        {showIncludeDoneTasksToggle && <IncludeDoneSwitch />}
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TodoListTableHeader showActions={showActions} showDeferredColumn={showDeferredColumn} />
          <TodoListTableBody
            tasks={filteredTasks}
            isLoading={isLoading}
            isPlaceholderData={isPlaceholderData}
            showActions={showActions}
            showDeferredColumn={showDeferredColumn}
          />
        </Table>
      </div>
    </div>
  )
}
