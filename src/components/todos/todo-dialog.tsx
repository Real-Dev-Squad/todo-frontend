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

type ViewModeProps = BaseProps & {
  mode: 'view'
  defaultData: Partial<TTodoFormData>
  currentMode: 'create' | 'edit' | 'view'
  onCurrentModeChange: (mode: 'create' | 'edit' | 'view') => void
}

type TodoDialogProps = CreateModeProps | EditModeProps | ViewModeProps

export const TodoDialog = (props: TodoDialogProps) => {
  const { mode, open, children, onSubmit, defaultData, onOpenChange, isMutationPending } = props

  // For view mode, use currentMode; for create/edit, use mode directly
  const currentMode: 'create' | 'edit' | 'view' = mode === 'view' ? props.currentMode : mode
  const onCurrentModeChange = mode === 'view' ? props.onCurrentModeChange : undefined

  const TITLE_BY_MODE: Record<typeof currentMode, string> = {
    create: 'Create Todo',
    edit: 'Edit Todo',
    view: 'View Todo',
  }

  useEffect(() => {
    if (!open && mode === 'view' && onCurrentModeChange) {
      onCurrentModeChange(mode)
    }
  }, [open, mode, onCurrentModeChange])

  const handleEdit = () => {
    if (onCurrentModeChange) {
      onCurrentModeChange('edit')
    }
  }

  const handleCancel = () => {
    if (mode === 'view' && currentMode === 'edit' && onCurrentModeChange) {
      onCurrentModeChange('view')
    } else {
      onOpenChange(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader className="">
          <AlertDialogTitle className="h-max text-xl">
            {TITLE_BY_MODE[currentMode]}
          </AlertDialogTitle>
        </AlertDialogHeader>
        {currentMode === 'view' ? (
          <ViewTodoModal
            data={defaultData ?? {}}
            onClose={() => onOpenChange(false)}
            onEdit={handleEdit}
          />
        ) : (
          <CreateEditTodoForm
            mode={currentMode}
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
