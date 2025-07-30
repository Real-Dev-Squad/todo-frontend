import { TASK_STATUS_ENUM } from '@/api/tasks/tasks.enum'
import { cn } from '@/lib/utils'

export const TASK_STATUS_TO_TEXT_MAP: Record<TASK_STATUS_ENUM, string> = {
  [TASK_STATUS_ENUM.TODO]: 'Todo',
  [TASK_STATUS_ENUM.IN_PROGRESS]: 'In Progress',
  [TASK_STATUS_ENUM.DONE]: 'Done',
  [TASK_STATUS_ENUM.DEFERRED]: 'Deferred',
}

type TodoStatusTableProps = {
  status: TASK_STATUS_ENUM
}

export const TodoStatusTable = ({ status }: TodoStatusTableProps) => {
  return (
    <div
      className={cn(
        'w-max rounded-full px-2 py-1 text-xs font-medium',
        status === TASK_STATUS_ENUM.TODO
          ? 'bg-gray-100 text-gray-700'
          : status === TASK_STATUS_ENUM.IN_PROGRESS
            ? 'bg-yellow-100 text-yellow-700'
            : status === TASK_STATUS_ENUM.DEFERRED
              ? 'bg-purple-100 text-purple-700'
              : 'bg-green-100 text-green-700',
      )}
    >
      {TASK_STATUS_TO_TEXT_MAP[status]}
    </div>
  )
}
