import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { Link } from '@tanstack/react-router'
import { PlusIcon } from 'lucide-react'

interface DashboardHeaderProps {
  className?: string
}

export const DashboardHeader = ({ className }: DashboardHeaderProps) => {
  const { user } = useAuth()
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.name || 'User'}! 👋
          </h1>
          <p className="mt-2 text-gray-600">Here's what's happening with your tasks today.</p>
        </div>

        <Button asChild>
          <Link to="/dashboard" search={{ status: undefined, tab: undefined, search: undefined }}>
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Todo
          </Link>
        </Button>
      </div>
    </div>
  )
}
