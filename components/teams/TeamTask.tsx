'use client'

import React from 'react'
import { DashboardTasksTable } from '../dashboard/DashboardTasksTable'
import { DashboardTasksTableTabs } from '../dashboard/constants/index'
import { useQuery } from '@tanstack/react-query'
import { tasksApi } from '@/lib/api/tasks/tasks.api'

function TeamTask() {
  //TODO: need to replace this with get team task api
  const { data, isLoading, isError } = useQuery({
    queryKey: tasksApi.getTasks.key,
    queryFn: tasksApi.getTasks.fn,
  })
  const tasks = data?.tasks || []

  if (isLoading) {
    return <div className="py-8 text-center text-gray-500">Loading tasks...</div>
  }
  if (isError) {
    return (
      <div className="py-8 text-center text-red-500">Error loading tasks. Please try again.</div>
    )
  }

  return (
    <div>
      <DashboardTasksTable type={DashboardTasksTableTabs.All} tasks={tasks} />
    </div>
  )
}

export default TeamTask
