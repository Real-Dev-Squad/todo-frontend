import { TTask, UpdateTaskDto } from '@/api/tasks/tasks.types'
import { TTodoFormData } from '@/components/create-edit-todo-form'

export class TodoUtil {
  static getUpdateTodoDetails = (
    todoFormData: TTodoFormData,
    initialTodo: TTask,
  ): Partial<Omit<UpdateTaskDto, 'id'>> => {
    const sortedTodoFormDataLabelIds = todoFormData.labels?.sort()
    const sortedInitialLabelIds = initialTodo.labels?.map((l) => l.id).sort()

    const updateDetails: Partial<Omit<UpdateTaskDto, 'id'>> = {}

    if (todoFormData.title !== initialTodo.title) {
      updateDetails.title = todoFormData.title
    }

    if (todoFormData.description !== initialTodo.description) {
      updateDetails.description = todoFormData.description
    }

    if (todoFormData.dueDate !== initialTodo.dueAt) {
      updateDetails.dueAt = todoFormData.dueDate
      updateDetails.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    }

    if (todoFormData.priority !== initialTodo.priority) {
      updateDetails.priority = todoFormData.priority
    }

    if (todoFormData.status !== initialTodo.status) {
      updateDetails.status = todoFormData.status
    }

    if (sortedTodoFormDataLabelIds?.join(',') !== sortedInitialLabelIds?.join(',')) {
      updateDetails.labels = todoFormData.labels
    }

    if (todoFormData.assignee.value !== initialTodo.assignee?.assignee_id) {
      updateDetails.assignee = {
        assignee_id: todoFormData.assignee.value,
        user_type: todoFormData.assignee.type,
      }
    }

    return updateDetails
  }

  static getDefaultTodoFormData = (todo: TTask): Partial<TTodoFormData> => {
    return {
      taskId: todo.id,
      title: todo.title,
      status: todo.status,
      priority: todo.priority,
      dueDate: todo.dueAt || '',
      description: todo.description || '',
      labels: todo.labels?.map((l) => l.id) ?? [],
      assignee: todo.assignee
        ? {
            label: todo.assignee.assignee_name,
            value: todo.assignee.assignee_id,
            type: todo.assignee.user_type,
          }
        : undefined,
    }
  }
}
