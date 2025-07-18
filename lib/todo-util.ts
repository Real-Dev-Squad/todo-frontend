import { TTask, UpdateTaskDto } from '@/api/tasks/tasks.types'
import { TTodoFormData } from '@/components/create-edit-todo-form'

export class TodoUtil {
  static getUpdateTodoDetails = (
    todoFormData: TTodoFormData,
    initialTodo: TTask,
  ): Partial<Omit<UpdateTaskDto, 'id'>> => {
    const sortedTodoFormDataLabels = todoFormData.labels?.sort()
    const sortedTodoLabels = initialTodo.labels?.sort()

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

    if (sortedTodoFormDataLabels?.join(',') !== sortedTodoLabels?.join(',')) {
      updateDetails.labels = todoFormData.labels
    }

    return updateDetails
  }

  static getDefaultTodoFormData = (todo: TTask): TTodoFormData => {
    return {
      title: todo.title,
      labels: todo.labels,
      priority: todo.priority,
      dueDate: todo.dueAt || '',
      description: todo.description || '',
    }
  }
}
