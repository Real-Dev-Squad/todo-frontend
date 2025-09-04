import { JoinTeam } from '@/modules/teams/join-team'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_internal/teams/join')({
  component: JoinTeamPage,
})

function JoinTeamPage() {
  return <JoinTeam />
}
