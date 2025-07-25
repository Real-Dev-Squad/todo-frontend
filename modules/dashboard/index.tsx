'use client'

import { TasksApi } from '@/api/tasks/tasks.api'
import { GetTaskReqDto } from '@/api/tasks/tasks.types'
import { CommonPageError } from '@/components/common-page-error'
import { PageContainer } from '@/components/page-container'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { DashboardHeader } from './components/dashboard-header'
import { DashboardShimmer } from './components/dashboard-shimmer'
import { DashboardTabs } from './components/dashboard-tabs'
import { DashboardWelcomeScreen } from './components/dashboard-welcome-screen'

export const Dashboard = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const status = searchParams.get('status')
  const isFirstLoad = useRef(true)

  const [includeDoneTasks, setIncludeDoneTasks] = useState(status === 'Done')
  const handleIncludeDoneChange = (checked: boolean) => {
    setIncludeDoneTasks(checked)

    const params = new URLSearchParams(searchParams)
    if (checked) {
      params.set('status', 'Done')
    } else {
      params.delete('status')
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  const queryParams: GetTaskReqDto | undefined = includeDoneTasks ? { status: 'DONE' } : undefined
  const { data, isLoading, isError, isPlaceholderData } = useQuery({
    queryKey: TasksApi.getTasks.key(queryParams),
    queryFn: () => TasksApi.getTasks.fn(queryParams),
    placeholderData: keepPreviousData,
  })
  console.log('Is loading: ', isLoading, 'Is placeholder data:', isPlaceholderData)
  useEffect(() => {
    if (!isLoading) {
      isFirstLoad.current = false
    }
  }, [isLoading])

  if (isLoading && isFirstLoad.current) {
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
          isPlaceholderData={isPlaceholderData}
          includeDone={includeDoneTasks}
          onIncludeDoneChange={handleIncludeDoneChange}
        />
      </div>
    </PageContainer>
  )
}
