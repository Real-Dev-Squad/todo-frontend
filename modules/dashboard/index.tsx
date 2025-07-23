'use client'

import { TasksApi } from '@/api/tasks/tasks.api'
import { GetTaskReqDto } from '@/api/tasks/tasks.types'
import { CommonPageError } from '@/components/common-page-error'
import { PageContainer } from '@/components/page-container'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { DashboardHeader } from './components/dashboard-header'
import { DashboardShimmer } from './components/dashboard-shimmer'
import { DashboardTabs } from './components/dashboard-tabs'
import { DashboardWelcomeScreen } from './components/dashboard-welcome-screen'

export const Dashboard = () => {
  const [includeDoneTasks, setIncludeDoneTasks] = useState(false)

  const queryParams: GetTaskReqDto | undefined = includeDoneTasks ? { status: 'DONE' } : undefined

  const { data, isLoading, isError } = useQuery({
    queryKey: TasksApi.getTasks.key(queryParams),
    queryFn: () => TasksApi.getTasks.fn(queryParams),
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
        <DashboardTabs
          tasks={data.tasks}
          includeDone={includeDoneTasks}
          onIncludeDoneChange={setIncludeDoneTasks}
        />
      </div>
    </PageContainer>
  )
}
