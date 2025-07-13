'use client'
import { dummyTeams } from '@/__mocks__/Team'
import { SearchComponent } from '@/components/SearchComponent'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'

function TeamsTable() {
  const [filteredTeams, setFilteredTeams] = useState(dummyTeams)

  return (
    <div className="my-24 flex items-center justify-center">
      <div className="mx-12 h-full min-h-[70vh] w-full max-w-screen-2xl rounded-xl bg-[#DBDBDB] p-5">
        <div className="flex justify-between">
          <h1 className="text-2xl font-semibold">Browse Teams</h1>
          <X />
        </div>
        <SearchComponent
          className="my-5 hidden w-40 rounded-none sm:block sm:w-60 md:w-80 [&_input]:rounded-xl [&_input]:bg-[#BCB7BF] [&_input]:text-black"
          placeholder="Search teams"
          onResultSelect={(result) => {
            if (result.type == 'team') {
              setFilteredTeams([result.data])
            }
          }}
        />
        <Table className="my-5">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-lg text-black">Team Name</TableHead>
              <TableHead className="text-lg text-black">Members</TableHead>
              <TableHead className="text-lg text-black">Admin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeams.map((team) => (
              <TableRow key={team.id} className="hover:bg-transparent">
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <p className="rounded-full bg-[#ECD0FF] p-1 text-[#4A2BC2]">
                      {(team.name[0] + team.name[team.name.length - 1]).toUpperCase()}
                    </p>
                    <p className="ml-1">{team.name}</p>
                  </div>
                </TableCell>
                <TableCell className="flex items-center">
                  <div className="flex -space-x-2">
                    {team.members.slice(0, 4).map((member) => (
                      <Image
                        key={member}
                        src="/user.png"
                        width={32}
                        height={32}
                        alt="User Profile"
                        className="h-7 w-7 rounded-full border-2 border-gray-300 object-cover md:h-8 md:w-8"
                      />
                    ))}
                  </div>
                  {team.members.length - 4 > 0 ? (
                    <p className="text-lg">+{team.members.length - 4}</p>
                  ) : (
                    <></>
                  )}
                </TableCell>
                <TableCell>
                  <Image
                    src="/user.png"
                    width={32}
                    height={32}
                    alt="User Profile"
                    className="mx-3 h-7 w-7 rounded-full border-2 border-gray-300 object-cover md:h-8 md:w-8"
                  />
                </TableCell>
                <TableCell className="pr-10 text-right">
                  <Button className="cursor-pointer rounded-lg">Request to join</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default TeamsTable
