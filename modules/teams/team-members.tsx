'use client'

import { TasksApi } from '@/api/tasks/tasks.api'
import { TeamsApi } from '@/api/teams/teams.api'
import { TeamRoles } from '@/api/teams/teams.type'
import { AddMembersButton } from '@/components/add-members-button'
import { Searchbar } from '@/components/searchbar'
import { Shimmer } from '@/components/Shimmer'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useAuth } from '@/hooks/useAuth'
import { DateFormats, DateUtil } from '@/lib/date-util'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { MoreVertical } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'
import { LeaveTeamDialog } from './components/leave-team-dialog'

const QUERY_PARAMS_KEYS = {
  search: 'search',
}

const PocLabel = () => {
  return (
    <div className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
      POC
    </div>
  )
}

const CreatorLabel = () => {
  return (
    <div className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
      Creator
    </div>
  )
}

type TeamMembersProps = {
  teamId: string
}

export const TeamMembers = ({ teamId }: TeamMembersProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const { user } = useAuth()
  const [activeDialogMemberId, setActiveDialogMemberId] = useState<string | null>(null)
  const { data, isLoading } = useQuery({
    queryKey: TeamsApi.getTeamById.key({ teamId, member: true }),
    queryFn: () => TeamsApi.getTeamById.fn({ teamId, member: true }),
  })
  const userId = user?.id
  const { data: userRole, isLoading: isUserRoleLoading } = useQuery({
    queryKey: TeamsApi.getUserRoles.key({ teamId, userId: userId }),
    queryFn: () => {
      return TeamsApi.getUserRoles.fn({ teamId, userId })
    },
    enabled: !!userId,
  })
  const isAdmin = userRole?.roles.find((role) => role.role_name == TeamRoles.ADMIN)
  const search = searchParams.get(QUERY_PARAMS_KEYS.search) ?? ''
  const filteredMembers = useMemo(() => {
    if (!search) {
      return data?.users
    }

    return data?.users?.filter((member) => {
      return (
        member.name.toLowerCase().includes(search.toLowerCase()) ||
        member.tasksAssignedCount?.toString().includes(search)
      )
    })
  }, [data?.users, search])

  const handleSearch = (search: string) => {
    const params = new URLSearchParams(searchParams)

    if (!search) {
      params.delete(QUERY_PARAMS_KEYS.search)
    } else {
      params.set(QUERY_PARAMS_KEYS.search, search)
    }

    router.push(`${pathname}?${params.toString()}`)
  }

  const removeMemberMutation = useMutation({
    mutationFn: TeamsApi.removeFromTeam.fn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TeamsApi.getTeamById.key({ teamId, member: true }),
      })
      queryClient.invalidateQueries({
        queryKey: TeamsApi.getTeams.key,
      })
      queryClient.invalidateQueries({
        queryKey: TasksApi.getTasks.key(),
      })
      toast.success('User removed Successfully')
    },
    onError: () => {
      toast.error('Failed to remove member')
    },
  })
  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <Searchbar
          defaultValue={search}
          containerClassName="w-full lg:max-w-xs"
          placeholder="Search by name, role or tasks count"
          onChange={(e) => handleSearch(e.target.value)}
        />

        <AddMembersButton teamId={teamId} variant="secondary" />
      </div>

      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-black">Name</TableHead>
              <TableHead className="text-black">Role</TableHead>
              <TableHead className="text-black">Joined on</TableHead>
              <TableHead className="text-black">Tasks Assigned</TableHead>
              {isAdmin && <TableHead className="text-black">Action</TableHead>}
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading || isUserRoleLoading
              ? new Array(5).fill(0).map((_, index) => (
                  <TableRow key={index}>
                    <TableCell colSpan={5}>
                      <Shimmer className="h-8 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              : filteredMembers?.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="font-medium">{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <span>{member.name}</span>
                        {member.id === data?.created_by && <CreatorLabel />}
                        {member.id === data?.poc_id && <PocLabel />}
                      </div>
                    </TableCell>

                    <TableCell>--</TableCell>

                    <TableCell>
                      {member.addedOn
                        ? new DateUtil(member.addedOn).format(DateFormats.D_MMM_YYYY)
                        : '--'}
                    </TableCell>

                    <TableCell>{member.tasksAssignedCount ?? '--'}</TableCell>

                    {isAdmin && (
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="rounded-full p-2 hover:bg-gray-100">
                              <MoreVertical className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>Change Role</DropdownMenuItem>
                            {member.id !== data?.created_by && member.id !== data?.poc_id ? (
                              <LeaveTeamDialog
                                mode="remove"
                                open={activeDialogMemberId === member.id}
                                onOpenChange={(open) => {
                                  if (open) {
                                    setActiveDialogMemberId(member.id)
                                  } else {
                                    setActiveDialogMemberId(null)
                                  }
                                }}
                                onSubmit={() => {
                                  removeMemberMutation.mutate({
                                    teamId,
                                    memberId: member.id,
                                  })
                                }}
                              >
                                <DropdownMenuItem
                                  onSelect={(e) => {
                                    e.preventDefault()
                                    setActiveDialogMemberId(member.id)
                                  }}
                                >
                                  Remove from team
                                </DropdownMenuItem>
                              </LeaveTeamDialog>
                            ) : (
                              <></>
                            )}
                            <DropdownMenuItem>View Assigned tasks</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
