import { PageContainer } from '@/components/page-container'
import { TeamTabsNavigation } from '@/components/teams/TeamsNavigation'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default async function Layout({
  params,
  children,
}: {
  params: Promise<{ teamId: string }>
  children: ReactNode
}) {
  const { teamId } = await params

  return (
    <PageContainer>
      <div className="flex items-center justify-between py-6">
        <h1 className="text-xl font-bold">Team: {teamId}</h1>
        <Button asChild>
          <Link href="/teams/create">
            <PlusIcon />
            Create a Team
          </Link>
        </Button>
      </div>
      <TeamTabsNavigation teamId={teamId} />
      <div className="my-5">{children}</div>
    </PageContainer>
  )
}
