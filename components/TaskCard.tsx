import { Task } from "@/app/types/tasks";
import { DateFormats, DateUtil } from "@/utils/dateUtil";
import Image from "next/image";

interface TaskCardProps {
  task: Task;
  className?: string;
  setActiveTask: (task: Task) => void
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


export const TaskCard = ({ task, className, setActiveTask }: TaskCardProps) => {
  const statusImagePath = getStatusImagePath(task.status);
  const formattedDueDate = new DateUtil(task.dueDate ?? "").format(
    DateFormats.D_MMM_YYYY
  );

  const handleClick = (task: Task) => {
    setActiveTask(task)
  }

  return (
    <div
      className={`flex justify-between items-center px-6 py-3 mt-1 mx-4 border border-[#D0D5DD] rounded-lg ${className}`}
      data-testid={`task-${task.id}`}
      onClick={() => handleClick(task)}
    >
      <div className="flex items-center justify-between">
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

      <div className="flex items-center">
        <div className="flex text-[#74787E] items-center justify-center space-x-2">
          <div className="hidden md:flex px-2 py-[2px] rounded-full border border-[#4541C6] bg-[#F5F5FF] text-xs">
            {task.assignee.name}
          </div>
          <div className="px-2 py-[2px] rounded-full border border-[#4541C6] bg-[#F5F5FF] text-xs">
            {formattedDueDate}
          </div>
        </div>

        <div className="md:hidden">
          <Image
            src={"/assets/user.png"}
            alt="assignee-profile"
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
};
