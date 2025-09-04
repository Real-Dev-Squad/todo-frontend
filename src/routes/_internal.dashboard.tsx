import { createFileRoute } from '@tanstack/react-router'
import { lazy } from 'react'

const Dashboard = lazy(() => import('@/modules/dashboard').then((m) => ({ default: m.Dashboard })))

export const Route = createFileRoute('/_internal/dashboard')({
  component: DashboardPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      status: search.status as string | undefined,
      tab: search.tab as string | undefined,
      search: search.search as string | undefined,
    }
  },
})

function DashboardPage() {
  return <Dashboard />
}
