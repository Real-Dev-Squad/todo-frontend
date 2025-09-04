import { LucideIcon } from 'lucide-react'

type TeamActivityCardProps = {
  Icon: LucideIcon
  date: string
  title: string
  description: string
}

export function TeamActivityCard({ Icon, date, title, description }: TeamActivityCardProps) {
  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
          <Icon className="h-5 w-5 text-gray-500" />
        </span>
        <div>
          <div className="font-medium text-gray-900">
            <span className="mr-1 text-lg font-semibold">{title}</span>
          </div>
          <div className="text-xs text-gray-500">{description}</div>
        </div>
      </div>
      <div className="ml-4 flex justify-end pt-2 text-xs whitespace-nowrap text-gray-400 sm:pt-0">
        {date}
      </div>
    </div>
  )
}
