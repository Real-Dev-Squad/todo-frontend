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
    }

    if (todoFormData.priority !== initialTodo.priority) {
      updateDetails.priority = todoFormData.priority
    }

    if (sortedTodoFormDataLabelIds?.join(',') !== sortedInitialLabelIds?.join(',')) {
      updateDetails.labels = todoFormData.labels
    }

    return updateDetails
  }

  static getDefaultTodoFormData = (todo: TTask): Partial<TTodoFormData> => {
    return {
      title: todo.title,
      priority: todo.priority,
      dueDate: todo.dueAt || '',
      description: todo.description || '',
      assigneeId: todo.assignee?.id ?? '',
      labels: todo.labels?.map((l) => l.id) ?? [],
    }
  }
}
