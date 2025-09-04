'use client'

import { TasksApi } from '@/api/tasks/tasks.api'
import { TodoListTable } from '@/components/todo-list-table'
import { useQuery } from '@tanstack/react-query'

export const DashboardWatchlistTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: TasksApi.getWatchListTasks.key,
    queryFn: () => TasksApi.getWatchListTasks.fn(),
  })

  if (isLoading) {
    return <div>Loading watchlist tasks...</div>
  }

  // Convert TWatchListTask to TTask format for compatibility
  const convertedTasks =
    data?.tasks?.map((task) => ({
      ...task,
      id: task.taskId, // Map taskId to id
    })) || []

  return <TodoListTable tasks={convertedTasks} isPlaceholderData={false} />
}
