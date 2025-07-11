import Image from 'next/image'

interface TaskSectionProps {
  className?: string
  icon?: string
  title: string
  onCreateTask?: () => void
}

export const TaskHeader = ({ className, icon, title, onCreateTask }: TaskSectionProps) => {
  return (
    <div
      data-testid={`header-${title.toLowerCase().replace(' ', '-')}`}
      className={`mx-4 mt-6 mb-2 flex items-center justify-between rounded-lg bg-[#F5F5FF] px-6 py-3 ${className}`}
    >
      <div className="flex items-center">
        <Image src={icon || '/assets/ToDoEllipse.svg'} alt="header-icon" width={20} height={20} />
        <h2 className="ml-2 text-base font-medium text-[#4541C6] sm:text-lg">{title}</h2>
      </div>

      <button onClick={onCreateTask} className="cursor-pointer">
        <Image src="/assets/plus.svg" alt="plusIcon" width={20} height={20} />
      </button>
    </div>
  )
}
