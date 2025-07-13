'use client'

import { TasksApi } from '@/api/tasks/tasks.api'
import { CommonPageError } from '@/components/common-page-error'
import { useQuery } from '@tanstack/react-query'
import { Suspense } from 'react'
import { DashboardHeader } from './components/dashboard-header'
import { DashboardShimmer } from './components/dashboard-shimmer'
import { DashboardTabs } from './components/dashboard-tabs'
import { DashboardWeeklySummary } from './components/dashboard-weekly-summary'
import { DashboardWelcomeScreen } from './components/dashboard-welcome-screen'

export const Dashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: TasksApi.getTasks.key,
    queryFn: TasksApi.getTasks.fn,
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
    <div className="px-4 md:px-6">
      <DashboardHeader className="py-12" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <Suspense>
          <DashboardTabs tasks={data.tasks} className="xl:col-span-8 2xl:col-span-9" />
        </Suspense>

        <DashboardWeeklySummary className="xl:col-span-4 2xl:col-span-3" />
      </div>
    </div>
  )
}
