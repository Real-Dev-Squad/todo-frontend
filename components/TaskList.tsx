import { Task } from "@/app/types/task";
import TaskCard from "./TaskCard";

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  if (tasks.length === 0) {
    return (
      <div className="text-gray-500 text-center py-8">
        No tasks available in this section
      </div>
    );
  }
  return (
    <div>
      {tasks.map((task, idx) => (
        <TaskCard
          key={idx}
          task={task}
          className="transition-transform hover:scale-[1.01]"
        />
      ))}
    </div>
  );
};

export default TaskList;
