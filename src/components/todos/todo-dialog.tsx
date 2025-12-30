import { CreateEditTodoForm, TTodoFormData } from '@/components/todos/create-edit-todo-form'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useEffect, type ReactNode } from 'react'
import { ViewTodoModal } from './view-todo-modal'

type BaseProps = {
  open: boolean
  children: ReactNode
  isMutationPending?: boolean
  onSubmit: (data: TTodoFormData) => void
  onOpenChange: (open: boolean) => void
}

type CreateModeProps = BaseProps & {
  mode: 'create'
  defaultData?: Partial<TTodoFormData>
}

type EditModeProps = BaseProps & {
  mode: 'edit'
  defaultData: Partial<TTodoFormData>
}

type DialogMode = 'create' | 'edit' | 'view'

type ViewModeProps = BaseProps & {
  mode: 'view'
  defaultData: Partial<TTodoFormData>
  currentMode: DialogMode
  onCurrentModeChange: (mode: DialogMode) => void
}

type TodoDialogProps = CreateModeProps | EditModeProps | ViewModeProps

export const TodoDialog = (props: TodoDialogProps) => {
  const { mode, open, children, onSubmit, defaultData, onOpenChange, isMutationPending } = props

  const activeMode: DialogMode = mode === 'view' ? props.currentMode : mode

  const TITLE_BY_MODE: Record<typeof activeMode, string> = {
    create: 'Create Todo',
    edit: 'Edit Todo',
    view: 'View Todo',
  }

  useEffect(() => {
    if (!open && mode === 'view') {
      props.onCurrentModeChange(mode)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, mode])

  const handleEdit = () => {
    if (mode === 'view') {
      props.onCurrentModeChange('edit')
    }
  }

  const handleCancel = () => {
    if (mode === 'view' && activeMode === 'edit') {
      props.onCurrentModeChange('view')
    } else {
      onOpenChange(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="h-max text-xl">{TITLE_BY_MODE[activeMode]}</AlertDialogTitle>
        </AlertDialogHeader>
        {activeMode === 'view' ? (
          <ViewTodoModal
            data={defaultData ?? {}}
            onClose={() => onOpenChange(false)}
            onEdit={handleEdit}
          />
        ) : (
          <CreateEditTodoForm
            mode={activeMode}
            onSubmit={onSubmit}
            initialData={defaultData}
            isSubmitting={isMutationPending}
            onCancel={handleCancel}
          />
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}
