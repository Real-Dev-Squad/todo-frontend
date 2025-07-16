'use client'

import { TTask } from '@/api/tasks/tasks.types'
import { DateFormats, DateUtil } from '@/lib/date-util'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Searchbar } from './searchbar'
import { Shimmer } from './Shimmer'
import { TaskPriorityLabel } from './task-priority-label'
import { TodoStatusTable } from './todo-status-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table'

const QUERY_PARAMS_KEYS = {
  search: 'search',
}

const TodoListTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead className="text-black">Name</TableHead>
        <TableHead className="text-black">Status</TableHead>
        <TableHead className="text-black">Label</TableHead>
        <TableHead className="text-black">Priority</TableHead>
        <TableHead className="text-black">Assignee</TableHead>
        <TableHead className="text-black">Due date</TableHead>
      </TableRow>
    </TableHeader>
  )
}

type TodoListTableRowProps = {
  todo: TTask
}

const TodoListTableRow = ({ todo }: TodoListTableRowProps) => {
  return (
    <TableRow>
      <TableCell>{todo.title}</TableCell>
      <TableCell>
        <TodoStatusTable status={todo.status} />
      </TableCell>
      <TableCell>--</TableCell>
      <TableCell>{todo.priority ? <TaskPriorityLabel priority={todo.priority} /> : '--'}</TableCell>
      <TableCell>{todo.assignee?.name ?? '--'}</TableCell>
      <TableCell>
        {todo.dueAt ? new DateUtil(todo.dueAt).format(DateFormats.D_MMM_YYYY) : '--'}
      </TableCell>
    </TableRow>
  )
}

type TodoListTableBodyProps = {
  tasks?: TTask[]
  isLoading?: boolean
}

const TodoListTableBody = ({ tasks, isLoading }: TodoListTableBodyProps) => {
  if (isLoading) {
    return (
      <TableBody>
        {new Array(5).fill(0).map((_, index) => (
          <TodoListTableRowShimmer key={index} />
        ))}
      </TableBody>
    )
  }

  if (!tasks?.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={6}>
            <div className="text-center text-sm text-gray-500">No tasks found</div>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  return (
    <TableBody>
      {tasks?.map((task) => (
        <TodoListTableRow key={task.id} todo={task} />
      ))}
    </TableBody>
  )
}

const TodoListTableRowShimmer = () => {
  return (
    <TableRow>
      <TableCell colSpan={6}>
        <Shimmer className="h-8 w-full" />
      </TableCell>
    </TableRow>
  )
}

type TodoListTableProps = {
  tasks?: TTask[]
  isLoading?: boolean
  classNames?: {
    container?: string
  }
}

export const TodoListTable = ({ tasks, isLoading, classNames }: TodoListTableProps) => {
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
          task.assignee?.name.toLowerCase().includes(search.toLowerCase()) ||
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
    <div className={classNames?.container}>
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
          <TodoListTableHeader />
          <TodoListTableBody tasks={filteredTasks} isLoading={isLoading} />
        </Table>
      </div>
    </div>
  )
}
