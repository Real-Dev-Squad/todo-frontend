'use client'

import { TasksApi } from '@/api/tasks/tasks.api'
import { CommonPageError } from '@/components/common-page-error'
import { Shimmer } from '@/components/Shimmer'
import { useAuth } from '@/hooks/useAuth'
import { TasksDashboard } from '@/modules/dashboard/components/tasks-dashboard'
import { useQuery } from '@tanstack/react-query'
import { DashboardWelcomeScreen } from './components/dashboard-welcome-screen'

export const Dashboard = () => {
  const { user } = useAuth()

  const { data, isLoading, isError } = useQuery({
    queryKey: TasksApi.getTasks.key,
    queryFn: TasksApi.getTasks.fn,
  })

  if (isLoading) {
    return (
      <div>
        <Shimmer />
      </div>
    )
  }

  if (isError) {
    return <CommonPageError />
  }

  if (!data?.tasks || data?.tasks.length === 0) {
    return <DashboardWelcomeScreen />
  }

  return (
    <div>
      <TasksDashboard tasks={data.tasks} />
    </div>
  )
}
