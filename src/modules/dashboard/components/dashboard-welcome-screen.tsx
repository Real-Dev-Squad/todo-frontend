import { CreateTodoButton } from '@/components/todos/create-todo-button'
import { useAuth } from '@/hooks/useAuth'
import { Link } from '@tanstack/react-router'

export const DashboardWelcomeScreen = () => {
  const { user } = useAuth()
  const name = user?.name || 'Guest'
  return (
    <div className="flex min-h-[60vh] flex-col p-4 md:p-6">
      <div className="mb-6 text-center md:mb-8">
        <h1 className="mb-2 text-2xl font-bold text-gray-900 md:text-3xl">Welcome, {name}</h1>
        <p className="text-base text-gray-600 md:text-lg">Let&apos;s setup your workspace</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center justify-center rounded-lg border-2 border-gray-300 bg-gray-50">
            <img
              src="/dashboard-welcome.png"
              alt="Welcome"
              width={300}
              height={300}
              className="h-48 w-48 md:h-72 md:w-72 lg:h-80 lg:w-80"
            />
          </div>
        </div>

        <div className="flex gap-3 sm:flex-row md:gap-4">
          <CreateTodoButton />

          <Link
            to="/teams/create"
            className="bg-primary hover:bg-primary-dark rounded-lg px-4 py-1 pt-1 text-center text-sm font-medium text-white transition-colors duration-200"
          >
            + Create Team
          </Link>
        </div>
      </div>
    </div>
  )
}
