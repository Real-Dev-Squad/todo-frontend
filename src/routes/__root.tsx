import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

export const Route = createRootRoute({
  component: () => (
    <>
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
})
