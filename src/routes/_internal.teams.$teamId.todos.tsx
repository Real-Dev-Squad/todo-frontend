import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_internal/teams/$teamId/todos')({
  component: TeamTodosPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      status: search.status as string | undefined,
      search: search.search as string | undefined,
    }
  },
})

function TeamTodosPage() {
  const { teamId } = Route.useParams()

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Team Todos</h2>
      <p>Team {teamId} todos will be displayed here.</p>
    </div>
  )
}
