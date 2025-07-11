'use client'
import React from 'react'
import { DashboardWelcomeScreen } from './DashboardWelcomeScreen'
import { TasksDashboard } from './TasksDashboard'
import { useQuery } from '@tanstack/react-query'
import { tasksApi } from '@/lib/api/tasks/tasks.api'

export const DashboardContainer = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: tasksApi.getTasks.key,
    queryFn: tasksApi.getTasks.fn,
  })
  const tasks = data?.tasks || []

  // todo: add shimmer later
  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error loading tasks</div>

  return (
    <div className="min-h-screen w-full">
      {tasks.length > 0 ? <TasksDashboard tasks={tasks} /> : <DashboardWelcomeScreen />}
    </div>
  )
}
