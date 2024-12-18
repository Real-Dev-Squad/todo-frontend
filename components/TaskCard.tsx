import { Task } from "@/app/types/task";
import Image from "next/image";

interface TaskCardProps {
  task: Task;
  className?: string;
}

const getStatusImagePath = (status: string): string => {
  switch (status.toLowerCase()) {
    case "in-progress":
      return "/assets/InProgressEllipse.svg";
    case "todo":
    default:
      return "/assets/ToDoEllipse.svg";
  }
};

const TaskCard: React.FC<TaskCardProps> = ({ task, className }) => {
  const statusImagePath = getStatusImagePath(task.status);
  return (
    <div
      className={`flex justify-between items-center px-6 py-3 mt-1 mx-4 border border-[#D0D5DD] rounded-lg ${className}`}
    >
      <div className="flex items-center justify-center">
        <h3 className="text-sm sm:text-base font-medium text-[#74777B] mr-2">
          #{task.id}
        </h3>
        <Image
          src={statusImagePath}
          alt="task-status-icon"
          width={20}
          height={20}
        />
        <h2 className="text-sm sm:text-base ml-2 font-medium">{task.title}</h2>
      </div>

      <div className="md:hidden">
        <Image
          src={task.profile || "/assets/user.png"}
          alt="assignee"
          width={20}
          height={20}
        />
      </div>

      <div className="hidden md:flex text-[#74787E] items-center justify-center space-x-2">
        <div className="px-2 py-[2px] rounded-full border border-[#4541C6] bg-[#F5F5FF] text-xs">
          {task.assignee}
        </div>
        <div className="px-2 py-[2px] rounded-full border border-[#4541C6] bg-[#F5F5FF] text-xs">
          {task.dueDate}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
