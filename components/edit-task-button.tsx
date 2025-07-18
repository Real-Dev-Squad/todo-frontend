import { TaskAssignmentApi } from '@/api/task-assignment/task-assignment.api'
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
      toast.error('Failed to update todo')
    },
  })

  const assignTaskToUserOrTeamMutation = useMutation({
    mutationFn: TaskAssignmentApi.assignTaskToUserOrTeam.fn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key() })
      toast.success('Todo assigned successfully')
    },
    onError: () => {
      toast.error('Failed to assign todo')
    },
  })

  const assignTaskToUserMutation = useMutation({
    mutationFn: TasksApi.assignTaskToUser.fn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key() })
      toast.success('Todo assigned successfully')
    },
    onError: () => {
      toast.error('Failed to assign todo')
    },
  })

  const isMutationPending =
    updateTaskMutation.isPending ||
    assignTaskToUserOrTeamMutation.isPending ||
    assignTaskToUserMutation.isPending

  const handleSubmission = (todoDetails: TTodoFormData) => {
    const updateDetails = TodoUtil.getUpdateTodoDetails(todoDetails, todo)

    if (Object.keys(updateDetails).length > 0) {
      updateTaskMutation.mutate({
        id: todo.id,
        ...updateDetails,
      })
    }

    /**
     * If the task has not been to any user then we call the post api to assign the task to a user or team.
     * If the task has been assigned to a user then we call the patch api to update the task assignee to a different user.
     * */
    if (!todo.assignee && todoDetails.assigneeId && todoDetails.userType) {
      assignTaskToUserOrTeamMutation.mutate({
        task_id: todo.id,
        assignee_id: todoDetails.assigneeId,
        user_type: todoDetails.userType,
      })
    } else if (todo.assignee && todoDetails.assigneeId) {
      assignTaskToUserMutation.mutate({
        task_id: todo.id,
        assignee_id: todoDetails.assigneeId,
      })
    }
  }

  return (
    <CreateEditTodoDialog
      mode="edit"
      open={showEditTaskForm}
      onSubmit={handleSubmission}
      onOpenChange={setShowEditTaskForm}
      isMutationPending={isMutationPending}
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
