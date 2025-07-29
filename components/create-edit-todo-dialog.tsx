import { CreateEditTodoForm, TTodoFormData } from '@/components/create-edit-todo-form'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { type ReactNode } from 'react'
import { DeferredTaskButton } from './deferred-task-button'

type BaseProps = {
  open: boolean
  children: ReactNode
  isMutationPending?: boolean
  onSubmit: (data: TTodoFormData) => void
  onOpenChange: (open: boolean) => void
}

type CreateModeProps = BaseProps & {
  mode: 'create'
  defaultData?: never
}

type EditModeProps = BaseProps & {
  mode: 'edit'
  defaultData: Partial<TTodoFormData>
}

type CreateEditTodoDialogProps = CreateModeProps | EditModeProps

export const CreateEditTodoDialog = ({
  mode,
  open,
  children,
  onSubmit,
  defaultData,
  onOpenChange,
  isMutationPending,
}: CreateEditTodoDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <AlertDialogTitle className="h-max text-xl">
            {mode === 'create' ? 'Create Todo' : 'Edit Todo'}
          </AlertDialogTitle>

          {mode === 'edit' && <DeferredTaskButton todo={defaultData} />}
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
