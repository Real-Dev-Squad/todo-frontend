'use client'

import { TasksApi } from '@/api/tasks/tasks.api'
import { CommonPageError } from '@/components/common-page-error'
import { TodoListTable } from '@/components/todo-list-table'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { DashboardTasksTableTabs as TabsConstants } from '../constants'

export const DashboardWatchlistTable = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const status = searchParams.get('status')
  const isInvalidCombination = tab === TabsConstants.WatchList && status === 'Done'

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

  if (isError || isInvalidCombination) {
    return <CommonPageError />
  }

  return <TodoListTable showActions isLoading={isLoading} tasks={data} />
}
