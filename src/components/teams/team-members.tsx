'use client'

import { TeamsApi } from '@/api/teams/teams.api'
import { TTeamUser } from '@/api/teams/teams.type'
import { AddMembersButton } from '@/components/teams/add-members-button'
import { Searchbar } from '@/components/common/searchbar'
import { Shimmer } from '@/components/common/shimmer'
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
import { DateFormats, DateUtil } from '@/lib/date-util'
import { useQuery } from '@tanstack/react-query'
import { MoreVertical } from 'lucide-react'
import { useMemo, useState } from 'react'

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
  const [searchQuery, setSearchQuery] = useState('')

  const { data, isLoading } = useQuery({
    queryKey: TeamsApi.getTeamById.key({ teamId, member: true }),
    queryFn: () => TeamsApi.getTeamById.fn({ teamId, member: true }),
  })

  const isAdmin = true
  const filteredMembers = useMemo(() => {
    if (!searchQuery) {
      return data?.users
    }

    return data?.users?.filter((member: TTeamUser) => {
      return (
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.tasksAssignedCount?.toString().includes(searchQuery)
      )
    })
  }, [data?.users, searchQuery])

  const handleSearch = (searchValue: string) => {
    setSearchQuery(searchValue)
  }

  return (
    <div>
      <div className="flex items-center justify-between pb-4">
        <Searchbar
          defaultValue={searchQuery}
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
            {isLoading
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
                            <DropdownMenuItem>Remove from team</DropdownMenuItem>
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
