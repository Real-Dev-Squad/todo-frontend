'use client'
import { TTask } from '@/api/tasks/tasks.types'
import { Suspense } from 'react'
import { DashboardHeader } from './dashboard-header'
import { DashboardTabs } from './dashboard-tabs'
import { DashboardWeeklySummary } from './dashboard-weekly-summary'

export const TasksDashboard = ({ tasks }: { tasks: TTask[] }) => {
  return (
    <div className="px-4">
      <DashboardHeader className="py-12" />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
        <Suspense>
          <DashboardTabs tasks={tasks} className="xl:col-span-8 2xl:col-span-9" />
        </Suspense>

        <DashboardWeeklySummary className="xl:col-span-4 2xl:col-span-3" />
      </div>
    </div>
  )
}
