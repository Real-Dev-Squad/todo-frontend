import { TeamMembers } from '@/components/teams/team-members'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_internal/teams/$teamId/members')({
  component: TeamMembersPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      search: search.search as string | undefined,
    }
  },
})

function TeamMembersPage() {
  const { teamId } = Route.useParams()

  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Team Members</h2>
      <TeamMembers teamId={teamId} />
    </div>
  )
}
