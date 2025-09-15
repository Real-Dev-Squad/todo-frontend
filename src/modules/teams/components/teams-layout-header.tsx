import { USER_TYPE_ENUM } from '@/api/common/common-enum'
import { TeamsApi } from '@/api/teams/teams.api'
import { Shimmer } from '@/components/common/shimmer'
import { LeaveTeamButton } from '@/components/teams/leave-team-button'
import { CreateTodoButton } from '@/components/todos/create-todo-button'
import { useAuth } from '@/hooks/useAuth'
import { useQuery } from '@tanstack/react-query'

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center justify-between py-6">{children}</div>
}

type TeamsLayoutHeaderProps = {
  teamId: string
}

export const TeamsLayoutHeader = ({ teamId }: TeamsLayoutHeaderProps) => {
  const { data: team, isLoading } = useQuery({
    queryKey: TeamsApi.getTeamById.key({ teamId }),
    queryFn: () => TeamsApi.getTeamById.fn({ teamId }),
  })
  const { user, isLoading: isAuthLoading } = useAuth()
  const userId = user?.id
  const isOwnerOrPOC = userId === team?.created_by || userId === team?.poc_id
  if (isLoading || isAuthLoading) {
    return (
      <Container>
        <Shimmer className="h-8 w-56" />
        <Shimmer className="h-8 w-24" />
      </Container>
    )
  }

  return (
    <div className="flex items-center justify-between pt-6 pb-8">
      <h2 className="text-2xl font-bold">{team?.name}</h2>
      <div>
        <CreateTodoButton
          defaultData={{
            assignee: { label: team?.name ?? '', value: teamId, type: USER_TYPE_ENUM.TEAM },
          }}
        />
        {!isOwnerOrPOC && <LeaveTeamButton teamId={teamId} />}
      </div>
    </div>
  )
}
