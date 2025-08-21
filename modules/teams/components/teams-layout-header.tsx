'use client'

import { USER_TYPE_ENUM } from '@/api/common/common-enum'
import { TeamsApi } from '@/api/teams/teams.api'
import { TeamRoles } from '@/api/teams/teams.type'
import { Shimmer } from '@/components/Shimmer'
import { CreateTodoButton } from '@/components/create-todo-button'
import { LeaveTeamButton } from '@/components/leave-team-button'
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
  const { user } = useAuth()
  const userId = user?.id
  const { data: userRole, isLoading: isUserRoleLoading } = useQuery({
    queryKey: TeamsApi.getUserRoles.key({ teamId, userId: userId ?? ' ' }),
    queryFn: () => TeamsApi.getUserRoles.fn({ teamId, userId: userId ?? ' ' }),
  })
  const isOwner = userRole?.roles.find((role) => role.role_name == TeamRoles.OWNER)
  if (isLoading || isUserRoleLoading) {
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
        {!isOwner ? <LeaveTeamButton teamId={teamId} /> : null}
      </div>
    </div>
  )
}
