import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_internal/teams/$teamId/activities')({
  component: TeamActivitiesPage,
})

function TeamActivitiesPage() {
  const { teamId } = Route.useParams()

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Team Activities</h2>
      <p>Team {teamId} activities will be displayed here.</p>
    </div>
  )
}
