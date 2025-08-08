import { USER_TYPE_ENUM } from '@/api/common/common-enum'
import { TasksApi } from '@/api/tasks/tasks.api'
import { CreateEditTodoDialog } from '@/components/create-edit-todo-dialog'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const CreateTodoButton = () => {
  const queryClient = useQueryClient()
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false)

  const createTaskMutation = useMutation({
    mutationFn: TasksApi.createTask.fn,
    onSuccess: (res) => {
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key() })

      if (res.assignee?.user_type === USER_TYPE_ENUM.TEAM) {
        void queryClient.invalidateQueries({
          queryKey: TasksApi.getTasks.key({ teamId: res.assignee.assignee_id }),
        })
      }

      toast.success('Todo created successfully')
      setShowCreateTaskForm(false)
    },
    onError: () => {
      toast.error('Failed to create todo')
    },
  })

  return (
    <CreateEditTodoDialog
      mode="create"
      open={showCreateTaskForm}
      onOpenChange={setShowCreateTaskForm}
      isMutationPending={createTaskMutation.isPending}
      onSubmit={(value) =>
        createTaskMutation.mutate({
          title: value.title,
          description: value.description,
          priority: value.priority,
          status: value.status,
          dueAt: value.dueDate,
          labels: value.labels,
          assignee_id: value.assignee.value,
          user_type: value.assignee.type,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        })
      }
    >
      <Button size="sm">
        <PlusIcon className="mr-1 h-4 w-4" />
        Create Todo
      </Button>
    </CreateEditTodoDialog>
  )
}
