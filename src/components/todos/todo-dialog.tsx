import { CreateEditTodoForm, TTodoFormData } from '@/components/todos/create-edit-todo-form'
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
  onOpenChange: (open: boolean) => void
}

type CreateModeProps = BaseProps & {
  mode: 'create'
  defaultData?: Partial<TTodoFormData>
  onSubmit: (data: TTodoFormData) => void
  isMutationPending?: boolean
}

type EditModeProps = BaseProps & {
  mode: 'edit'
  defaultData: Partial<TTodoFormData>
  onSubmit: (data: TTodoFormData) => void
  isMutationPending?: boolean
}

type DialogMode = 'create' | 'edit' | 'view'

type ViewModeProps = BaseProps & {
  mode: 'view'
  defaultData: Partial<TTodoFormData>
}

type TodoDialogProps = CreateModeProps | EditModeProps | ViewModeProps

export const TodoDialog = (props: TodoDialogProps) => {
  const { mode, open, children, defaultData, onOpenChange } = props
  const TITLE_BY_MODE: Record<DialogMode, string> = {
    create: 'Create Todo',
    edit: 'Edit Todo',
    view: 'View Todo',
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="h-max text-xl">{TITLE_BY_MODE[mode]}</AlertDialogTitle>
        </AlertDialogHeader>

        {mode === 'view' ? (
          <CreateEditTodoForm
            mode={mode}
            initialData={defaultData}
            onCancel={() => onOpenChange(false)}
            disabled={true}
          />
        ) : (
          <CreateEditTodoForm
            mode={mode}
            initialData={defaultData}
            onCancel={() => onOpenChange(false)}
            disabled={false}
            onSubmit={props.onSubmit}
            isSubmitting={props.isMutationPending}
          />
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
