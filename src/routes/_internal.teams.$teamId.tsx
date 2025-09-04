import { TeamTabNavigation } from '@/modules/teams/components/team-tab-navigation'
import { TeamsLayoutHeader } from '@/modules/teams/components/teams-layout-header'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_internal/teams/$teamId')({
  component: TeamLayout,
})

function TeamLayout() {
  const { teamId } = Route.useParams()

  return (
    <div className="container mx-auto p-4">
      <TeamsLayoutHeader teamId={teamId} />
      <TeamTabNavigation />
      <div className="mt-6">
        <Outlet />
      </div>
    </div>
  )
}
