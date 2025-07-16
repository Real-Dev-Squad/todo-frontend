import { TTask } from '@/api/tasks/tasks.types'
import { DateFormats, DateUtil } from '@/lib/date-util'
import Image from 'next/image'

interface TaskCardProps {
  task: TTask
  className?: string
  setActiveTask: (task: TTask) => void
}

const getStatusImagePath = (status: string): string => {
  switch (status.toLowerCase()) {
    case 'in-progress':
      return '/assets/InProgressEllipse.svg'
    case 'todo':
    default:
      return '/assets/ToDoEllipse.svg'
  }
}

export const TaskCard = ({ task, className, setActiveTask }: TaskCardProps) => {
  const statusImagePath = getStatusImagePath(task?.status ?? '')
  const formattedDueAt = new DateUtil(task.dueAt ?? '').format(DateFormats.D_MMM_YYYY)

  const handleClick = (task: TTask) => {
    setActiveTask(task)
  }

  return (
    <div
      className={`mx-4 mt-1 flex items-center justify-between rounded-lg border border-[#D0D5DD] px-6 py-3 ${className}`}
      data-testid={`task-${task.id}`}
      onClick={() => handleClick(task)}
    >
      <div className="flex items-center justify-between">
        <h3 className="mr-2 text-sm font-medium text-[#74777B] sm:text-base">#{task.id}</h3>
        <Image src={statusImagePath} alt="task-status-icon" width={20} height={20} />
        <h2 className="ml-2 text-sm font-medium sm:text-base">{task.title}</h2>
      </div>

      <div className="flex items-center">
        <div className="flex items-center justify-center space-x-2 text-[#74787E]">
          <div className="hidden rounded-full border border-[#4541C6] bg-[#F5F5FF] px-2 py-[2px] text-xs md:flex">
            {task.assignee?.name}
          </div>
          <div className="rounded-full border border-[#4541C6] bg-[#F5F5FF] px-2 py-[2px] text-xs">
            {formattedDueAt}
          </div>
        </div>

        <div className="md:hidden">
          <Image src={'/assets/user.png'} alt="assignee-profile" width={20} height={20} />
        </div>
      </div>
    </div>
  )
}
