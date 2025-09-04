'use client'

import { TasksApi } from '@/api/tasks/tasks.api'
import { TASK_STATUS_ENUM } from '@/api/tasks/tasks.enum'
import { GetTaskReqDto } from '@/api/tasks/tasks.types'
import { CommonPageError } from '@/components/common/common-page-error'
import { TodoListTable } from '@/components/todos/todo-list-table'
import { useQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { DashboardTasksTableTabs as TabsConstants } from '../constants'

export const DashboardDeferredTable = () => {
  const searchParams = useSearch({ from: '/_internal/dashboard' })
  const tab = searchParams.tab
  const status = searchParams.status
  const isInvalidCombination = tab === TabsConstants.Deferred && status === TASK_STATUS_ENUM.DONE

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
