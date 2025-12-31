import { TTask } from '@/api/tasks/tasks.types'
import { useUpdateTask } from '@/hooks/useUpdateTask'
import { TodoUtil } from '@/lib/todo-util'
import { Edit2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '../ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'
import { TodoDialog } from './todo-dialog'
import { TTodoFormData } from './todo-form'

type EditTodoButtonProps = {
  todo: TTask
  teamId?: string
}

export const EditTodoButton = ({ todo, teamId }: EditTodoButtonProps) => {
  const [showEditTaskForm, setShowEditTaskForm] = useState(false)

  const { mutation, handleSubmission } = useUpdateTask({
    todo,
    teamId,
  })

  const handleSubmit = (todoDetails: TTodoFormData) => {
    handleSubmission(todoDetails, () => {
      setShowEditTaskForm(false)
    })
  }

  return (
    <TodoDialog
      mode="edit"
      open={showEditTaskForm}
      onSubmit={handleSubmit}
      onOpenChange={setShowEditTaskForm}
      isMutationPending={mutation.isPending}
      defaultData={TodoUtil.getDefaultTodoFormData(todo)}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            className="hover:bg-gray-200 hover:text-gray-800 active:bg-gray-300 active:text-gray-900"
            onClick={() => setShowEditTaskForm(true)}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Edit Todo</TooltipContent>
      </Tooltip>
    </TodoDialog>
  )
}
