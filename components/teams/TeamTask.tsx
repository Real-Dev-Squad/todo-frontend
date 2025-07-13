'use client'

import React from 'react'
import { DashboardTasksTable } from '../dashboard/DashboardTasksTable'
import { DashboardTasksTableTabs } from '../dashboard/constants/index'
import { useQuery } from '@tanstack/react-query'
import { tasksApi } from '@/lib/api/tasks/tasks.api'
function TeamTask() {
  const { data } = useQuery({
    queryKey: tasksApi.getTasks.key,
    queryFn: tasksApi.getTasks.fn,
  })
  const tasks = data?.tasks || []

  return (
    <div>
      <DashboardTasksTable type={DashboardTasksTableTabs.All} tasks={tasks} />
    </div>
  )
}

export default TeamTask
