import { PageContainer } from '@/components/page-container'
import { Button } from '@/components/ui/button'
import { Link } from '@tanstack/react-router'
import { PlusIcon, UserRoundPlusIcon } from 'lucide-react'

export const TeamsPage = () => {
  return (
    <PageContainer className="flex-1 py-12 md:py-20 xl:py-28">
      <div className="mx-auto flex w-full max-w-sm flex-1 flex-col items-center justify-center text-center md:max-w-lg">
        <div className="pb-8">
          <h1 className="pb-2 text-2xl font-bold xl:pb-4 xl:text-3xl">Your Team space awaits!</h1>
          <p className="pb-1 text-sm text-gray-700 xl:text-base">
            Collaborate better by joining or creating a team.
          </p>

          <p className="text-sm text-gray-700 xl:text-base">
            Work together, assign tasks, and track progress as a unit
          </p>
        </div>

        <div className="flex w-64 flex-col gap-2">
          <Button asChild>
            <Link to="/teams/create">
              <PlusIcon />
              Create a Team
            </Link>
          </Button>

          <Button asChild variant="outline">
            <Link to="/teams/join">
              <UserRoundPlusIcon />
              Join an Existing Team
            </Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  )
}
