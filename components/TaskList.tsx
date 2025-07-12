import { TTask } from '@/api/tasks/tasks.types'
import { TaskCard } from './TaskCard'

interface TaskListProps {
  tasks: TTask[]
  setActiveTask: (task: TTask) => void
}

export const TaskList = ({ tasks, setActiveTask }: TaskListProps) => {
  if (tasks.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500" data-testid="empty-task-list">
        No tasks available in this section
      </div>
    )
  }
  return (
    <div data-testid={`task-list`}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          className="transition-transform hover:scale-[1.01]"
          setActiveTask={setActiveTask}
        />
      ))}
    </div>
  )
}
