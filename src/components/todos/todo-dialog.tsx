import { TodoForm, TTodoFormData } from '@/components/todos/todo-form'
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

type ViewModeProps = BaseProps & {
  mode: 'view'
  defaultData: Partial<TTodoFormData>
  onSubmit?: undefined
  isMutationPending?: undefined
}

export type TodoDialogProps = CreateModeProps | EditModeProps | ViewModeProps

export type DialogMode = TodoDialogProps['mode']

const TITLE_BY_MODE: Record<DialogMode, string> = {
  create: 'Create Todo',
  edit: 'Edit Todo',
  view: 'View Todo',
}

export const TodoDialog = ({
  mode,
  open,
  children,
  defaultData,
  onOpenChange,
  onSubmit,
  isMutationPending,
}: TodoDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="h-max text-xl">{TITLE_BY_MODE[mode]}</AlertDialogTitle>
        </AlertDialogHeader>

        {mode === 'view' ? (
          <TodoForm
            mode={mode}
            initialData={defaultData}
            onCancel={() => onOpenChange(false)}
            disabled={true}
          />
        ) : (
          <TodoForm
            mode={mode}
            initialData={defaultData}
            onCancel={() => onOpenChange(false)}
            disabled={false}
            onSubmit={onSubmit}
            isSubmitting={isMutationPending}
          />
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
