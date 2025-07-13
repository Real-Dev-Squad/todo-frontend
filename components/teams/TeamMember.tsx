import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { MoreVertical } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

// TODO: This should be fetch from backend

const members = [
  {
    name: 'Prakash',
    role: 'Admin',
    joinedOn: '1 May 2025',
    tasksAssigned: 4,
  },
  {
    name: 'Tejas',
    role: 'Admin',
    joinedOn: '1 May 2025',
    tasksAssigned: 5,
  },
  {
    name: 'Anuj',
    role: 'Member',
    joinedOn: '1 May 2025',
    tasksAssigned: 6,
  },
  {
    name: 'Mayank',
    role: 'Member',
    joinedOn: '1 May 2025',
    tasksAssigned: 3,
  },
]

export function TeamMembers() {
  const isAdmin = true
  return (
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
        {members.map((member) => (
          <TableRow key={member.name}>
            <TableCell>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>{member.name[0]}</AvatarFallback>
                </Avatar>
                <span>{member.name}</span>
              </div>
            </TableCell>
            <TableCell>{member.role}</TableCell>
            <TableCell>{member.joinedOn}</TableCell>
            <TableCell>{member.tasksAssigned}</TableCell>
            {isAdmin && (
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-full p-2 hover:bg-gray-100">
                      <MoreVertical className="h-5 w-5" />
                    </button>
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
  )
}
