'use client'
import React from 'react'
import { TaskDashboardHeader } from './TaskDashboardHeader'
import { DashboardWeeklySummary } from './DashboardWeeklySummary'
import { DashboardTasksTableTabs } from './DashboardTasksTableTabs'
import { TTask } from '@/lib/api/tasks/tasks.dto'

export const TasksDashboard = ({ tasks }: { tasks: TTask[] }) => {
  return (
    <div className="p-6">
      <TaskDashboardHeader />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="max-h-screen lg:col-span-2">
          <div className="p-4">
            <h2 className="mb-2 text-2xl font-semibold">All Tasks</h2>
            <DashboardTasksTableTabs tasks={tasks} />
          </div>
        </div>
        <DashboardWeeklySummary />
      </div>
    </div>
  )
}
