import { USER_TYPE_ENUM } from '@/api/common/common-enum'
import { TasksApi } from '@/api/tasks/tasks.api'
import { TASK_STATUS_ENUM } from '@/api/tasks/tasks.enum'
import { TTask } from '@/api/tasks/tasks.types'
import { TTodoFormData } from '@/components/todos/todo-form'
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
      const wasTaskDeferred = todo.status === TASK_STATUS_ENUM.DEFERRED
      const isTaskDeferred = res.status === TASK_STATUS_ENUM.DEFERRED
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key() })
      void queryClient.invalidateQueries({ queryKey: TasksApi.getWatchListTasks.key })
      if (wasTaskDeferred || isTaskDeferred) {
        void queryClient.invalidateQueries({
          queryKey: TasksApi.getTasks.key({ status: TASK_STATUS_ENUM.DEFERRED }),
        })
      }

      if (res.assignee?.user_type === USER_TYPE_ENUM.TEAM) {
        void queryClient.invalidateQueries({
          queryKey: TasksApi.getTasks.key({ teamId: res.assignee.assignee_id }),
        })
      }

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
