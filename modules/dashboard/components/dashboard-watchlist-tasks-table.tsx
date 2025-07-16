import { DashboardTasksTable } from './dashboard-tasks-table'
import { CommonPageError } from '@/components/common-page-error'
import { Shimmer } from '@/components/Shimmer'
import { useQuery } from '@tanstack/react-query'
import { TasksApi } from '@/api/tasks/tasks.api'
import { TTask } from '@/api/tasks/tasks.types'
import { NUM_TASK_PRIORITY_TO_TASK_ENUM } from '@/api/tasks/tasks.enum'

export const DashboardWatchlistTasksTable = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: TasksApi.getWatchListTasks.key,
    queryFn: TasksApi.getWatchListTasks.fn,
  })
  const tasks = data?.tasks ?? null

  if (isLoading) {
    return <Shimmer className="h-48 w-full" />
  }

  if (isError) {
    return <CommonPageError />
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex h-48 w-full items-center justify-center">
        No tasks added in watchlist
      </div>
    )
  }

  const formattedTasks: TTask[] = tasks.map((task) => ({
    ...task,
    id: task.taskId,
    in_watchlist: true,
    priority: NUM_TASK_PRIORITY_TO_TASK_ENUM[task.priority ?? 1],
  }))
  return <DashboardTasksTable tasks={formattedTasks} />
}
