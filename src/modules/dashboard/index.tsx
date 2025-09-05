import { TasksApi } from '@/api/tasks/tasks.api'
import { TASK_STATUS_ENUM } from '@/api/tasks/tasks.enum'
import { GetTaskReqDto } from '@/api/tasks/tasks.types'
import { CommonPageError } from '@/components/common/common-page-error'
import { PageContainer } from '@/components/layout/page-container'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import { DashboardHeader } from './components/dashboard-header'
import { DashboardShimmer } from './components/dashboard-shimmer'
import { DashboardTabs } from './components/dashboard-tabs'
import { DashboardWelcomeScreen } from './components/dashboard-welcome-screen'

export const Dashboard = () => {
  const search = useSearch({ from: '/_internal/dashboard' })
  const status = search.status
  const includeDoneTasks = status === TASK_STATUS_ENUM.DONE
  const queryParams: GetTaskReqDto | undefined = includeDoneTasks
    ? { status: TASK_STATUS_ENUM.DONE }
    : undefined
  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: TasksApi.getTasks.key(queryParams),
    queryFn: () => TasksApi.getTasks.fn(queryParams),
    placeholderData: keepPreviousData,
  })

  if (isLoading) {
    return <DashboardShimmer />
  }

  if (isError) {
    return <CommonPageError />
  }

  if (!data?.tasks || data?.tasks.length === 0) {
    return <DashboardWelcomeScreen />
  }

  return (
    <PageContainer className="pb-4">
      <DashboardHeader className="py-12" />

      <div className="container mx-auto">
        <DashboardTabs tasks={data.tasks} isPlaceholderData={isPlaceholderData} />
      </div>
    </PageContainer>
  )
}
