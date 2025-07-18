import { TasksApi } from '@/api/tasks/tasks.api'
import { NUM_TASK_PRIORITY_TO_TASK_ENUM } from '@/api/tasks/tasks.enum'
import { CommonPageError } from '@/components/common-page-error'
import { TodoListTable } from '@/components/todo-list-table'
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
        priority: NUM_TASK_PRIORITY_TO_TASK_ENUM[task.priority ?? 1],
        labels: task.labels,
      })),
  })

  if (isError) {
    return <CommonPageError />
  }

  return <TodoListTable showActions isLoading={isLoading} tasks={data} />
}
