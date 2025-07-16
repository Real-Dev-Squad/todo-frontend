import { TeamMembers } from '@/modules/teams/components/team-members'

const TeamMembersPage = async ({ params }: { params: Promise<{ teamId: string }> }) => {
  const { teamId } = await params

  return <TeamMembers teamId={teamId} />
}

export default TeamMembersPage
