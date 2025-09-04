import { Admin } from '@/modules/admin'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_internal/admin')({
  component: AdminPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: search.page as string | undefined,
      limit: search.limit as string | undefined,
      tab: search.tab as string | undefined,
    }
  },
})

function AdminPage() {
  return <Admin />
}
