import { CreateTeam } from '@/modules/teams/create-team'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_internal/teams/create')({
  component: CreateTeamPage,
})

function CreateTeamPage() {
  return <CreateTeam />
}
