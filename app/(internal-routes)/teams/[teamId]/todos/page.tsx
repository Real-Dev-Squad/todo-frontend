import { TeamTasks } from '@/modules/teams/team-tasks'

const TeamTasksPage = async ({ params }: { params: Promise<{ teamId: string }> }) => {
  const { teamId } = await params

  return <TeamTasks teamId={teamId} />
}

export default TeamTasksPage
