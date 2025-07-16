'use client'

import { TeamsApi } from '@/api/teams/teams.api'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
import { Button } from '../../../components/ui/button'

// TODO: This should be fetch from backend

const members = [
  {
    id: 1,
    name: 'Prakash',
    role: 'Admin',
    joinedOn: '1 May 2025',
    tasksAssigned: 4,
  },
  {
    id: 2,
    name: 'Tejas',
    role: 'Admin',
    joinedOn: '1 May 2025',
    tasksAssigned: 5,
  },
  {
    id: 3,
    name: 'Anuj',
    role: 'Member',
    joinedOn: '1 May 2025',
    tasksAssigned: 6,
  },
  {
    id: 4,
    name: 'Mayank',
    role: 'Member',
    joinedOn: '1 May 2025',
    tasksAssigned: 3,
  },
]

type TeamMembersProps = {
  teamId: string
}

export const TeamMembers = ({ teamId }: TeamMembersProps) => {
  const { data, isLoading } = useQuery({
    queryKey: TeamsApi.getTeamById.key({ teamId, member: true }),
    queryFn: () => TeamsApi.getTeamById.fn({ teamId, member: true }),
  })

  const isAdmin = true

  return (
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
          {data?.users?.map((member) => (
            <TableRow key={member.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="font-medium">{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{member.name}</span>
                </div>
              </TableCell>

              <TableCell>--</TableCell>

              <TableCell>
                {member.addedOn
                  ? new DateUtil(member.addedOn).format(DateFormats.DD_MM_YYYY)
                  : '--'}
              </TableCell>

              <TableCell>{member.tasksAssigned ?? '--'}</TableCell>

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
  )
}
