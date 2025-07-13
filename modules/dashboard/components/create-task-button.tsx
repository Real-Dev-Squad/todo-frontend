import { TasksApi } from '@/api/tasks/tasks.api'
import { CreateEditTodoForm } from '@/components/create-edit-todo-form'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export const CreateTaskButton = () => {
  const queryClient = useQueryClient()
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false)

  const createTaskMutation = useMutation({
    mutationFn: TasksApi.createTask.fn,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: TasksApi.getTasks.key })
      toast.success('Task created successfully')
      setShowCreateTaskForm(false)
    },
    onError: () => {
      toast.error('Failed to create task')
    },
  })

  return (
    <AlertDialog open={showCreateTaskForm} onOpenChange={setShowCreateTaskForm}>
      <AlertDialogTrigger asChild>
        <Button size="sm">
          <PlusIcon className="mr-1 h-4 w-4" />
          Create Task
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader className="">
          <div className="flex flex-row justify-between pb-4">
            <AlertDialogTitle className="h-max text-xl">Create Task</AlertDialogTitle>

            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6"
              onClick={() => setShowCreateTaskForm(false)}
            >
              <XIcon className="h-5 w-5" />
            </Button>
          </div>
        </AlertDialogHeader>

        <CreateEditTodoForm
          onSubmit={(value) =>
            createTaskMutation.mutate({
              title: value.title,
              description: value.description,
              priority: value.priority,
              dueAt: value.dueDate,
            })
          }
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
