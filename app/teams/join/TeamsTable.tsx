"use client"
import { dummyTeams } from '@/__mocks__/Team';
import { SearchComponent } from '@/components/SearchComponent'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { X } from 'lucide-react';
import Image from 'next/image'
import React, { useState } from 'react'

function TeamsTable() {
  const [filteredTeams, setFilteredTeams] = useState(dummyTeams);

  return (
    <div className="flex items-center my-24 justify-center">
      <div className='bg-[#DBDBDB] mx-12 p-5 rounded-xl h-full w-full max-w-screen-2xl min-h-[70vh]'>
        <div className='flex justify-between'>
          <h1 className='text-2xl font-semibold'>Browse Teams</h1>
          <X />
        </div>
        <SearchComponent
          className="hidden sm:block w-40 sm:w-60 md:w-80 my-5 rounded-none [&_input]:bg-[#BCB7BF] [&_input]:text-black [&_input]:rounded-xl"
          placeholder="Search teams"
          onResultSelect={(result) => {
            if(result.type == 'team'){
              setFilteredTeams([result.data])
            }
          }}
        />
        <Table className="my-5">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="text-black text-lg">Team Name</TableHead>
              <TableHead className="text-black text-lg">Members</TableHead>
              <TableHead className="text-black text-lg">Admin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTeams.map((team) => (
              <TableRow key={team.id} className="hover:bg-transparent">
                <TableCell className="font-medium">
                  <div className='flex items-center'>
                    <p className='bg-[#ECD0FF] text-[#4A2BC2] rounded-full p-1'>{(team.name[0]+team.name[team.name.length-1]).toUpperCase()}</p>
                    <p className='ml-1'>{team.name}</p>
                  </div>
                </TableCell>
                <TableCell className='flex items-center'>
                  <div className='flex -space-x-2'>
                    {team.members.slice(0,4).map((member)=>(
                        <Image
                        key={member}
                        src="/user.png"
                        width={32}
                        height={32}
                        alt="User Profile"
                        className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover border-2 border-gray-300"
                      />
                    ))}
                    
                  </div>
                  {team.members.length - 4 > 0?<p className='text-lg'>+{team.members.length-4}</p>: <></>}
                </TableCell>
                <TableCell>
                  <Image
                    src="/user.png"
                    width={32}
                    height={32}
                    alt="User Profile"
                    className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover border-2 border-gray-300 mx-3"
                  />
                </TableCell>
                <TableCell className='text-right pr-10'>
                  <Button className='rounded-lg cursor-pointer'>Request to join</Button>
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
