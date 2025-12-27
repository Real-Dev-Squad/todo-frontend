import { USER_TYPE_ENUM } from '@/api/common/common-enum'
import { TasksApi } from '@/api/tasks/tasks.api'
import { TTask } from '@/api/tasks/tasks.types'
import { TTodoFormData } from '@/components/todos/create-edit-todo-form'
import { TodoUtil } from '@/lib/todo-util'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

type UseUpdateTaskOptions = {
  todo: TTask
  teamId?: string
}

export const useUpdateTask = ({ todo, teamId }: UseUpdateTaskOptions) => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: TasksApi.updateTask.fn,
    onSuccess: (res) => {
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key() })
      void queryClient.invalidateQueries({ queryKey: TasksApi.getWatchListTasks.key })
      void queryClient.invalidateQueries({
        queryKey: TasksApi.getTasks.key({ status: 'DEFERRED' }),
      })

      if (res.assignee?.user_type === USER_TYPE_ENUM.TEAM) {
        void queryClient.invalidateQueries({
          queryKey: TasksApi.getTasks.key({ teamId: res.assignee.assignee_id }),
        })
      }

      // invalidate a task on the teams page if the task edited
      if (teamId) {
        void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key({ teamId }) })
      }

      toast.success('Todo updated successfully')
    },
    onError: () => {
      toast.error('Failed to update todo, please try again')
    },
  })

  const handleSubmission = (todoDetails: TTodoFormData, customOnSuccess?: () => void) => {
    const updateDetails = TodoUtil.getUpdateTodoDetails(todoDetails, todo)

    if (Object.keys(updateDetails).length > 0) {
      mutation.mutate(
        {
          id: todo.id,
          ...updateDetails,
        },
        {
          // This onSuccess runs after the hook's onSuccess
          onSuccess: () => {
            customOnSuccess?.()
          },
        },
      )
    }
  }

  return {
    mutation,
    handleSubmission,
  }
}
