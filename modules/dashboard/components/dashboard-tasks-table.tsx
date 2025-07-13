import { TasksApi } from '@/api/tasks/tasks.api'
import { TASK_STATUS } from '@/api/tasks/tasks.enum'
import { TTask } from '@/api/tasks/tasks.types'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FORM_MODE, TASK_PRIORITY } from '@/config/task'
import { cn } from '@/lib/utils'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { TaskFormData, TodoForm } from '../../../components/TodoForm'
import { DashboardTasksTableTabs } from '../constants'

type DashboardTasksTableProps = {
  type: DashboardTasksTableTabs
  tasks: TTask[]
}

export const DashboardTasksTable = ({ type, tasks }: DashboardTasksTableProps) => {
  const [showEditTaskForm, setShowEditTaskForm] = useState(false)
  const [selectedTask, setSelectedTask] = useState<TTask | null>(null)
  const queryClient = useQueryClient()

  const updateTaskMutation = useMutation({
    mutationFn: (task: TTask) => TasksApi.updateTask.fn(task),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key })
      toast.success('Task updated successfully')
      setShowEditTaskForm(false)
    },
    onError: () => {
      toast.error('Failed to update task')
    },
  })

  const handleEditTask = (task: TaskFormData) => {
    updateTaskMutation.mutate(task as TTask)
  }

  const handleTaskClick = (task: TTask) => {
    setSelectedTask(task)
    setShowEditTaskForm(true)
  }
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
                    {task.status !== undefined
                      ? TASK_STATUS[task.status.toUpperCase() as keyof typeof TASK_STATUS] ||
                        task.status
                      : '-'}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={cn(
                      'rounded-full px-2 py-1 text-xs font-medium',
                      task.priority === TASK_PRIORITY.HIGH
                        ? 'bg-red-100 text-red-700'
                        : task.priority === TASK_PRIORITY.MEDIUM
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-green-100 text-green-700',
                    )}
                  >
                    {task.priority !== undefined
                      ? TASK_PRIORITY[task.priority.toUpperCase() as keyof typeof TASK_PRIORITY] ||
                        task.priority
                      : '-'}
                  </span>
                </TableCell>
                <TableCell className="text-red-500">
                  {task.dueAt ? new Date(task.dueAt).toLocaleDateString() : task.dueAt || '-'}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleTaskClick(task)
                    }}
                    className="h-8 w-8 p-0 hover:bg-gray-200"
                  >
                    <Edit2 className="h-4 w-4 text-gray-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit Task Form */}
      <TodoForm
        key={selectedTask?.id || 'edit-form'}
        open={showEditTaskForm}
        onClose={() => {
          setShowEditTaskForm(false)
          setSelectedTask(null)
        }}
        onSubmit={handleEditTask as (data: TaskFormData) => void}
        mode={FORM_MODE.EDIT}
        initialData={
          selectedTask
            ? {
                id: selectedTask.id,
                title: selectedTask.title,
                description: selectedTask.description || '',
                dueAt: selectedTask.dueAt || '',
                tags: selectedTask.tags || [],
                status: selectedTask.status,
                priority: selectedTask.priority,
              }
            : undefined
        }
      />
    </div>
  )
}
