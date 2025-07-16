'use client'

import { TeamsApi } from '@/api/teams/teams.api'
import { Shimmer } from '@/components/Shimmer'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex items-center justify-between py-6">{children}</div>
}

type TeamsLayoutHeaderProps = {
  teamId: string
}

export const TeamsLayoutHeader = ({ teamId }: TeamsLayoutHeaderProps) => {
  const { data: team, isLoading } = useQuery({
    queryKey: TeamsApi.getTeamById.key(teamId),
    queryFn: () => TeamsApi.getTeamById.fn(teamId),
  })

  if (isLoading) {
    return (
      <Container>
        <Shimmer className="h-8 w-56" />
        <Shimmer className="h-8 w-24" />
      </Container>
    )
  }

  return (
    <div className="flex items-center justify-between py-6">
      <h2 className="text-2xl font-bold">{team?.name}</h2>

      <Button asChild size="sm">
        <Link href="/teams/create" className="ml-auto">
          <PlusIcon />
          Create a Team
        </Link>
      </Button>
    </div>
  )
}
