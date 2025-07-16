import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'
import { TeamTabsNavigation } from '@/modules/teams/components/tab-navigation'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { ReactNode } from 'react'

export default async function Layout({
  children,
}: {
  params: Promise<{ teamId: string }>
  children: ReactNode
}) {
  return (
    <PageContainer>
      <div className="flex items-center justify-between py-6">
        <Button asChild>
          <Link href="/teams/create">
            <PlusIcon />
            Create a Team
          </Link>
        </Button>
      </div>
      <TeamTabsNavigation />
      <div className="my-5">{children}</div>
    </PageContainer>
  )
}
