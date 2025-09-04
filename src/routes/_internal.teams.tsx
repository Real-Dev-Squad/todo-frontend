import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_internal/teams')({
  component: Teams,
})

function Teams() {
  return (
    <div>
      <Outlet />
    </div>
  )
}
