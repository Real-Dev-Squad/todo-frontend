'use client'

import { TTask } from '@/api/tasks/tasks.types'
import { DateFormats, DateUtil } from '@/lib/date-util'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { EditTodoButton } from './edit-task-button'
import { ReassignUser } from './reassign-user'
import { Searchbar } from './searchbar'
import { Shimmer } from './Shimmer'
import { TaskPriorityLabel } from './task-priority-label'
import { TodoLabelsList } from './todo-labels-list'
import { TodoStatusTable } from './todo-status-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { WatchListButton } from './watchlist-button'

const QUERY_PARAMS_KEYS = {
  search: 'search',
}

type TodoListTableHeaderProps = {
  showActions?: boolean
}

export const TodoListTableHeader = ({ showActions }: TodoListTableHeaderProps) => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="text-black">Name</TableHead>
        <TableHead className="text-black">Status</TableHead>
        <TableHead className="text-black">Label</TableHead>
        <TableHead className="text-black">Priority</TableHead>
        <TableHead className="text-black">Assignee</TableHead>
        <TableHead className="text-black">Due date</TableHead>
        {showActions && <TableHead className="text-black">Actions</TableHead>}
      </TableRow>
    </TableHeader>
  )
}

type TodoListTableRowProps = {
  todo: TTask
  showActions?: boolean
}

const TodoListTableRow = ({ todo, showActions }: TodoListTableRowProps) => {
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

      {showActions && (
        <TableCell>
          <div className="flex items-center gap-0.5">
            <EditTodoButton todo={todo} />
            <WatchListButton taskId={todo.id} isInWatchlist={todo.in_watchlist} />
            <ReassignUser />
          </div>
        </TableCell>
      )}
    </TableRow>
  )
}

type TodoListTableBodyProps = {
  tasks?: TTask[]
  isLoading?: boolean
  showActions?: boolean
}

const TodoListTableBody = ({ tasks, isLoading, showActions }: TodoListTableBodyProps) => {
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
        <TodoListTableRow key={task.id} todo={task} showActions={showActions} />
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
  showActions?: boolean
}

export const TodoListTable = ({ tasks, isLoading, showActions }: TodoListTableProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const search = searchParams.get(QUERY_PARAMS_KEYS.search) ?? ''

  const filteredTasks = !search
    ? tasks
    : tasks?.filter(
        (task) =>
          task.title.toLowerCase().includes(search.toLowerCase()) ||
          task.labels?.join(', ').toLowerCase().includes(search.toLowerCase()) ||
          task.assignee?.assignee_name.toLowerCase().includes(search.toLowerCase()) ||
          task.status.toLowerCase().includes(search.toLowerCase()) ||
          task.priority?.toLowerCase().includes(search.toLowerCase()),
      )

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
          <TodoListTableHeader showActions={showActions} />
          <TodoListTableBody
            tasks={filteredTasks}
            isLoading={isLoading}
            showActions={showActions}
          />
        </Table>
      </div>
    </div>
  )
}
