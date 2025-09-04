import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_internal/teams/$teamId')({
  component: TeamLayout,
})

function TeamLayout() {
  return (
    <div className="container mx-auto p-4">
      <Outlet />
    </div>
  )
}
