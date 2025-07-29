'use client'

import { TasksApi } from '@/api/tasks/tasks.api'
import { GetTaskReqDto } from '@/api/tasks/tasks.types'
import { CommonPageError } from '@/components/common-page-error'
import { TodoListTable } from '@/components/todo-list-table'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { DashboardTasksTableTabs as TabsConstants } from '../constants'

export const DashboardDeferredTable = () => {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')
  const status = searchParams.get('status')
  const isInvalidCombination = tab === TabsConstants.Deferred && status === 'Done'

  const queryParams: GetTaskReqDto = { status: 'DEFERRED' }

  const { data, isLoading, isError } = useQuery({
    queryKey: TasksApi.getTasks.key(queryParams),
    queryFn: () => TasksApi.getTasks.fn(queryParams),
    select: (data) => data.tasks,
  })

  if (isError || isInvalidCombination) {
    return <CommonPageError />
  }

  return <TodoListTable showActions isLoading={isLoading} tasks={data} />
}
