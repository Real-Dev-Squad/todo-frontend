'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { Link } from '@tanstack/react-router'

export const DashboardWelcomeScreen = () => {
  const { user } = useAuth()
  return (
    <div className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center text-center">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <img
            src="/dashboard-welcome.png"
            alt="Dashboard Welcome"
            className="mx-auto h-64 w-auto"
          />
        </div>
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Welcome back, {user?.name || 'User'}! 👋
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          Ready to tackle your tasks? Create your first todo and start organizing your work.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <Link to="/dashboard" search={{ status: undefined, tab: undefined, search: undefined }}>
              <span>Create Your First Todo</span>
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/teams" search={{}}>
              <span>Join a Team</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
