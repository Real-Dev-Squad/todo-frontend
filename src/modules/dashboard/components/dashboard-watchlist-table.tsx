import { TasksApi } from '@/api/tasks/tasks.api'
import { CommonPageError } from '@/components/common/common-page-error'
import { TodoListTable } from '@/components/todos/todo-list-table'
import { useQuery } from '@tanstack/react-query'

export const DashboardWatchlistTable = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: TasksApi.getWatchListTasks.key,
    queryFn: TasksApi.getWatchListTasks.fn,
    select: (data) =>
      data.tasks?.map((task) => ({
        ...task,
        id: task.taskId,
        in_watchlist: true,
        labels: task.labels,
        priority: task.priority,
      })),
  })

  if (isError) {
    return <CommonPageError />
  }

  return <TodoListTable showActions isLoading={isLoading} tasks={data} />
}
