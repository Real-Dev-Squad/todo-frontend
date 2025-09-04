import { Dashboard } from '@/modules/dashboard'
import { createFileRoute } from '@tanstack/react-router'

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
