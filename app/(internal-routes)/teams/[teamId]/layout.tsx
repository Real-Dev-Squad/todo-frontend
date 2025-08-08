import { PageContainer } from '@/components/page-container'
import { TeamTabNavigation } from '@/modules/teams/components/team-tab-navigation'
import { TeamsLayoutHeader } from '@/modules/teams/components/teams-layout-header'
import { ReactNode } from 'react'

type LayoutProps = {
  params: Promise<{ teamId: string }>
  children: ReactNode
}

export default async function Layout({ children, params }: LayoutProps) {
  const { teamId } = await params

  return (
    <PageContainer>
      <TeamsLayoutHeader teamId={teamId} />
      <TeamTabNavigation />

      <div className="py-5">{children}</div>
    </PageContainer>
  )
}
