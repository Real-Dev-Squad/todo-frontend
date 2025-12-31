import { TodoDialogProps } from './todo-dialog'

type DialogMode = TodoDialogProps['mode']

export const TITLE_BY_MODE: Record<DialogMode, string> = {
  create: 'Create Todo',
  edit: 'Edit Todo',
  view: 'View Todo',
}
