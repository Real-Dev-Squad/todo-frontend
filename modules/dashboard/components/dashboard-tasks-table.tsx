import { TasksApi } from '@/api/tasks/tasks.api'
import { TTask } from '@/api/tasks/tasks.types'
import { EditTodoButton } from '@/components/edit-task-button'
import { TaskPriorityLabel } from '@/components/task-priority-label'
import { TodoLabelsList } from '@/components/todo-labels-list'
import { TodoStatusTable } from '@/components/todo-status-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

type WatchListButtonProps = {
  taskId: string
  isInWatchlist?: boolean | null
}

const WatchListButton = ({ taskId, isInWatchlist }: WatchListButtonProps) => {
  const queryClient = useQueryClient()

  const addTaskToWatchlistMutation = useMutation({
    mutationFn: TasksApi.addTaskToWatchList.fn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key() })
      toast.success('Task added to watchlist!')
    },
    onError: () => {
      toast.error('Failed to add task in watchlist!')
    },
  })

  const toggleWatchListStatusMutation = useMutation({
    mutationFn: TasksApi.toggleTaskWatchListStatus.fn,
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key() })
      void queryClient.invalidateQueries({ queryKey: TasksApi.getWatchListTasks.key })
      toast.success(
        variables.isActive ? 'Task added to watchlist!' : 'Task removed from watchlist!',
      )
    },
    onError: () => {
      toast.error('Failed to update watchlist status!')
    },
  })

  const handleAddTaskToWatchlist = () => {
    if (isInWatchlist == null) {
      addTaskToWatchlistMutation.mutate({ taskId })
    } else {
      toggleWatchListStatusMutation.mutate({ taskId, isActive: true })
    }
  }

  return isInWatchlist ? (
    <EyeOff
      className="h-5 w-5"
      onClick={() => toggleWatchListStatusMutation.mutate({ taskId, isActive: false })}
    />
  ) : (
    <Eye className="h-5 w-5" onClick={handleAddTaskToWatchlist} />
  )
}

type DashboardTasksTableProps = {
  tasks: TTask[]
}

export const DashboardTasksTable = ({ tasks }: DashboardTasksTableProps) => {
  return (
    <div className="rounded-md border border-gray-200 p-4">
      <div className="max-h-[500px] w-full overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Label</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead className="w-[50px]">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id} className="transition-colors hover:bg-gray-50">
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>
                  <TodoLabelsList labels={task.labels ?? []} />
                </TableCell>

                <TableCell>
                  <TodoStatusTable status={task.status} />
                </TableCell>

                <TableCell>
                  {task.priority && <TaskPriorityLabel priority={task.priority} />}
                </TableCell>

                <TableCell className="text-red-500">
                  {task.dueAt ? new Date(task.dueAt).toLocaleDateString() : task.dueAt || '-'}
                </TableCell>

                <TableCell className="flex items-center gap-3">
                  <EditTodoButton todo={task} />
                  <Tooltip>
                    <TooltipTrigger>
                      <WatchListButton taskId={task.id} isInWatchlist={task.in_watchlist} />
                    </TooltipTrigger>
                    <TooltipContent>
                      {task?.in_watchlist ? 'Remove task from watchlist' : 'Add task to watchlist'}
                    </TooltipContent>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
