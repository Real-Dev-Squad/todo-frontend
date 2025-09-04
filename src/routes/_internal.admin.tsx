import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_internal/admin')({
  component: AdminPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: search.page as string | undefined,
      limit: search.limit as string | undefined,
    }
  },
})

function AdminPage() {
  return (
    <div className="p-4">
      <h2 className="mb-4 text-2xl font-bold">Admin Dashboard</h2>
      <p>Admin functionality will be implemented here.</p>
    </div>
  )
}
