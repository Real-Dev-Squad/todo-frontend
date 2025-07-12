'use client'
import { TTask } from '@/api/tasks/tasks.types'
import { TaskDashboardHeader } from '../../../components/dashboard/TaskDashboardHeader'
import { DashboardTabs } from './dashboard-tabs'
import { DashboardWeeklySummary } from './dashboard-weekly-summary'

export const TasksDashboard = ({ tasks }: { tasks: TTask[] }) => {
  return (
    <div className="p-6">
      <TaskDashboardHeader />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="max-h-screen lg:col-span-2">
          <div className="p-4">
            <h2 className="mb-2 text-2xl font-semibold">All Tasks</h2>
            <DashboardTabs tasks={tasks} />
          </div>
        </div>

        <DashboardWeeklySummary />
      </div>
    </div>
  )
}
