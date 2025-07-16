import { TeamsApi } from '@/api/teams/teams.api'
import { PageContainer } from '@/components/page-container'
import { TeamTabsNavigation } from '@/modules/teams/components/tab-navigation'
import { TeamsLayoutHeader } from '@/modules/teams/components/teams-layout-header'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { ReactNode } from 'react'

type LayoutProps = {
  params: Promise<{ teamId: string }>
  children: ReactNode
}

export default async function Layout({ children, params }: LayoutProps) {
  const queryClient = new QueryClient()

  const { teamId } = await params

  await queryClient.prefetchQuery({
    queryKey: TeamsApi.getTeamById.key(teamId),
    queryFn: () => TeamsApi.getTeamById.fn(teamId),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageContainer>
        <TeamsLayoutHeader teamId={teamId} />

        <TeamTabsNavigation />
        <div className="py-5">{children}</div>
      </PageContainer>
    </HydrationBoundary>
  )
}
