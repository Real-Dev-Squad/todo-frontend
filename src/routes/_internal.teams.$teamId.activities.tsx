import { TeamActivity } from '@/components/teams/team-activity'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_internal/teams/$teamId/activities')({
  component: TeamActivitiesPage,
})

function TeamActivitiesPage() {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Team Activities</h2>
      <TeamActivity />
    </div>
  )
}
