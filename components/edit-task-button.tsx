import { TasksApi } from '@/api/tasks/tasks.api'
import { TTask } from '@/api/tasks/tasks.types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { CreateEditTaskDialog } from './create-edit-task-dialog'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

type EditTaskButtonProps = {
  task: TTask
}

export const EditTaskButton = ({ task }: EditTaskButtonProps) => {
  const queryClient = useQueryClient()

  const [showEditTaskForm, setShowEditTaskForm] = useState(false)

  const updateTaskMutation = useMutation({
    mutationFn: TasksApi.updateTask.fn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key() })
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
        labels: task.labels,
      }}
      onSubmit={(value) =>
        updateTaskMutation.mutate({
          id: task.id,
          title: value.title,
          dueAt: value.dueDate,
          priority: value.priority,
          description: value.description,
          labels: value.labels,
        })
      }
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="cursor-pointer hover:bg-gray-200 hover:text-gray-800 active:bg-gray-300 active:text-gray-900"
            onClick={() => setShowEditTaskForm(true)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit task</TooltipContent>
      </Tooltip>
    </CreateEditTaskDialog>
  )
}
