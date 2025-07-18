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
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key() })
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
