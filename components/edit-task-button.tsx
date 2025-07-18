import { TasksApi } from '@/api/tasks/tasks.api'
import { TTask } from '@/api/tasks/tasks.types'
import { TodoUtil } from '@/lib/todo-util'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit2 } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { CreateEditTodoDialog } from './create-edit-todo-dialog'
import { TTodoFormData } from './create-edit-todo-form'
import { Button } from './ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'

type EditTodoButtonProps = {
  todo: TTask
}

export const EditTodoButton = ({ todo }: EditTodoButtonProps) => {
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
      toast.error('Failed to update todo, please try again')
    },
  })

  const handleSubmission = async (todoDetails: TTodoFormData) => {
    const updateDetails = TodoUtil.getUpdateTodoDetails(todoDetails, todo)

    if (Object.keys(updateDetails).length > 0) {
      updateTaskMutation.mutate({
        id: todo.id,
        ...updateDetails,
      })
    }
  }

  return (
    <CreateEditTodoDialog
      mode="edit"
      open={showEditTaskForm}
      onSubmit={handleSubmission}
      onOpenChange={setShowEditTaskForm}
      isMutationPending={updateTaskMutation.isPending}
      defaultData={TodoUtil.getDefaultTodoFormData(todo)}
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
        <TooltipContent>Edit Todo</TooltipContent>
      </Tooltip>
    </CreateEditTodoDialog>
  )
}
