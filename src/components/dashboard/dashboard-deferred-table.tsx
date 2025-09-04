'use client'

import { TasksApi } from '@/api/tasks/tasks.api'
import { TodoListTable } from '@/components/todo-list-table'
import { useQuery } from '@tanstack/react-query'

export const DashboardDeferredTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: TasksApi.getTasks.key({ status: 'DEFERRED' }),
    queryFn: () => TasksApi.getTasks.fn({ status: 'DEFERRED' }),
  })

  if (isLoading) {
    return <div>Loading deferred tasks...</div>
  }

  return <TodoListTable tasks={data?.tasks || []} isPlaceholderData={false} />
}
