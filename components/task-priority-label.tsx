import { TASK_PRIORITY_ENUM } from '@/api/tasks/tasks.enum'
import { cn } from '@/lib/utils'

export const TASK_PRIORITY_TO_TEXT_MAP: Record<TASK_PRIORITY_ENUM, string> = {
  [TASK_PRIORITY_ENUM.LOW]: 'Low',
  [TASK_PRIORITY_ENUM.MEDIUM]: 'Medium',
  [TASK_PRIORITY_ENUM.HIGH]: 'High',
}

type Props = {
  priority: TASK_PRIORITY_ENUM
}

export const TaskPriorityLabel = ({ priority }: Props) => {
  return (
    <div
      className={cn(
        'w-max rounded-full px-2 py-1 text-xs font-medium',
        priority === TASK_PRIORITY_ENUM.HIGH
          ? 'bg-red-100 text-red-700'
          : priority === TASK_PRIORITY_ENUM.MEDIUM
            ? 'bg-yellow-100 text-yellow-700'
            : 'bg-green-100 text-green-700',
      )}
    >
      {TASK_PRIORITY_TO_TEXT_MAP[priority]}
    </div>
  )
}
