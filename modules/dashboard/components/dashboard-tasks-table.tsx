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
import { Edit2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { DashboardTasksTableTabs } from '../constants'

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

type DashboardTasksTableProps = {
  type: DashboardTasksTableTabs
  tasks: TTask[]
}

export const DashboardTasksTable = ({ type, tasks }: DashboardTasksTableProps) => {
  const filteredTasks = tasks.filter(
    (task) => type === DashboardTasksTableTabs.All || task.isInWatchlist,
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

                <TableCell>
                  <EditTaskButton task={task} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
