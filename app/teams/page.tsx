'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const TeamsPage = () => {
  const router = useRouter()

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-1 items-center justify-center px-4 md:px-6 lg:px-8">
      <div className="w-full max-w-sm text-center md:max-w-lg">
        <h1 className="mb-3 px-2 text-xl font-bold md:mb-4 md:text-2xl lg:text-3xl">
          Your Team space awaits!
        </h1>
        <h2 className="mb-6 px-2 text-sm font-semibold text-gray-500 md:mb-4 md:text-base lg:text-lg">
          Collaborate better by joining or creating a team. Work together,
          <br className="hidden sm:inline" />
          assign tasks, and track progress as a unit
        </h2>

        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 px-4 md:mt-12 md:gap-4">
          <Button
            className="h-12 w-full max-w-xs cursor-pointer text-base md:h-auto md:text-sm"
            onClick={() => router.push('/teams/create')}
          >
            Create a Team
          </Button>
          <Button
            className="h-12 w-full max-w-xs cursor-pointer border border-black bg-white text-base font-bold text-black hover:bg-gray-50 md:h-auto md:text-sm"
            onClick={() => router.push('/teams/join')}
          >
            Join an Existing Team
          </Button>
        </div>
      </div>
    </main>
  )
}

export default TeamsPage
