import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

export const DashboardHeader = ({ className }: Props) => {
  const { user } = useAuth()
  const username = user?.name ?? 'Guest'
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <p className="text-gray-600">{currentDate}</p>
      <h1 className="text-2xl font-bold text-gray-900">Welcome Back, {username}</h1>
    </div>
  )
}
