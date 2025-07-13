import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'

export default async function Page({ params }: { params: Promise<{ teamId: string }> }) {
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
    </PageContainer>
  )
}
