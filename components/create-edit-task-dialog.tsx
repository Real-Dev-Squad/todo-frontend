import { CreateEditTodoForm, TodoFormData } from '@/components/create-edit-todo-form'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { type ReactNode } from 'react'

type BaseProps = {
  open: boolean
  children: ReactNode
  isMutationPending?: boolean
  onSubmit: (data: TodoFormData) => void
  onOpenChange: (open: boolean) => void
}

type CreateModeProps = BaseProps & {
  mode: 'create'
  defaultData?: never
}

type EditModeProps = BaseProps & {
  mode: 'edit'
  defaultData: TodoFormData
}

type CreateEditTaskDialogProps = CreateModeProps | EditModeProps

export const CreateEditTaskDialog = ({
  mode,
  open,
  children,
  onSubmit,
  defaultData,
  onOpenChange,
  isMutationPending,
}: CreateEditTaskDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader className="">
          <AlertDialogTitle className="h-max text-xl">
            {mode === 'create' ? 'Create Todo' : 'Edit Todo'}
          </AlertDialogTitle>
        </AlertDialogHeader>

        <CreateEditTodoForm
          mode={mode}
          onSubmit={onSubmit}
          initialData={defaultData}
          isSubmitting={isMutationPending}
          onCancel={() => onOpenChange(false)}
        />
      </AlertDialogContent>
    </AlertDialog>
  )
}
