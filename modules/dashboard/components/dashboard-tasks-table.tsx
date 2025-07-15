import { TasksApi } from '@/api/tasks/tasks.api'
import {
  TASK_PRIORITY_ENUM,
  TASK_PRIORITY_TO_TEXT_MAP,
  TASK_STATUS_TO_TEXT_MAP,
} from '@/api/tasks/tasks.enum'
import { TTask } from '@/api/tasks/tasks.types'
import { CreateEditTaskDialog } from '@/components/create-edit-task-dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit2, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { DashboardTasksTableTabs } from '../constants'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

const TaskPriorityLabel = ({ priority }: { priority: TASK_PRIORITY_ENUM }) => {
  return (
    <span
      className={cn(
        'rounded-full px-2 py-1 text-xs font-medium',
        priority === TASK_PRIORITY_ENUM.HIGH
          ? 'bg-red-100 text-red-700'
          : priority === TASK_PRIORITY_ENUM.MEDIUM
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-green-100 text-green-700',
      )}
    >
      {TASK_PRIORITY_TO_TEXT_MAP[priority]}
    </span>
  )
}

type EditTaskButtonProps = {
  task: TTask
}

const EditTaskButton = ({ task }: EditTaskButtonProps) => {
  const queryClient = useQueryClient()

  const [showEditTaskForm, setShowEditTaskForm] = useState(false)

  const updateTaskMutation = useMutation({
    mutationFn: TasksApi.updateTask.fn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key })
      toast.success('Todo updated successfully')
      setShowEditTaskForm(false)
    },
    onError: () => {
      toast.error('Failed to update todo')
    },
  })

  return (
    <CreateEditTaskDialog
      mode="edit"
      open={showEditTaskForm}
      onOpenChange={setShowEditTaskForm}
      isMutationPending={updateTaskMutation.isPending}
      defaultData={{
        title: task.title,
        description: task.description || '',
        dueDate: task.dueAt || '',
        priority: task.priority,
      }}
      onSubmit={(value) =>
        updateTaskMutation.mutate({
          id: task.id,
          title: value.title,
          dueAt: value.dueDate,
          priority: value.priority,
          description: value.description,
        })
      }
    >
      <Edit2 className="h-4 w-4" />
    </CreateEditTaskDialog>
  )
}

type WatchListButtonProps = {
  taskId: string
  isInWatchlist?: boolean | null
}

const WatchListButton = ({ taskId, isInWatchlist }: WatchListButtonProps) => {
  const queryClient = useQueryClient()

  const addTaskToWatchlistMutation = useMutation({
    mutationFn: TasksApi.addTaskToWatchList.fn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key })
      toast.success('Task added to watchlist!')
    },
    onError: () => {
      toast.error('Failed to add task in watchlist!')
    },
  })

  const toggleWatchListStatusMutation = useMutation({
    mutationFn: TasksApi.toggleTaskWatchListStatus.fn,
    onSuccess: (_, variables) => {
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key })
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
  type: DashboardTasksTableTabs
  tasks: TTask[]
}

export const DashboardTasksTable = ({ type, tasks }: DashboardTasksTableProps) => {
  const filteredTasks = tasks.filter(
    (task) => type === DashboardTasksTableTabs.All || task.in_watchlist,
  )

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
            {filteredTasks.map((task) => (
              <TableRow key={task.id} className="transition-colors hover:bg-gray-50">
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell>
                  <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-700">
                    {Array.isArray(task.labels)
                      ? typeof task.labels[0] === 'object' && task.labels[0] !== null
                        ? (task.labels[0] as { name?: string }).name || '-'
                        : task.labels[0] || '-'
                      : '-'}
                  </span>
                </TableCell>

                <TableCell>
                  <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-700">
                    {TASK_STATUS_TO_TEXT_MAP[task.status]}
                  </span>
                </TableCell>

                <TableCell>
                  {task.priority && <TaskPriorityLabel priority={task.priority} />}
                </TableCell>

                <TableCell className="text-red-500">
                  {task.dueAt ? new Date(task.dueAt).toLocaleDateString() : task.dueAt || '-'}
                </TableCell>

                <TableCell className="flex items-center gap-3">
                  <EditTaskButton task={task} />
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
