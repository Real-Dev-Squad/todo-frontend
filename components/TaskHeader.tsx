import Image from "next/image";

interface TaskSectionProps {
  className?: string;
  icon?: string;
  title: string;
  onCreateTask?: () => void;
}

export const TaskHeader = ({
  className,
  icon,
  title,
  onCreateTask,
}: TaskSectionProps) => {
  return (
    <div
      data-testid={`header-${title.toLowerCase().replace(" ", "-")}`}
      className={`flex justify-between items-center px-6 py-3 bg-[#F5F5FF] mt-6 mb-2 mx-4 rounded-lg ${className}`}
    >
      <div className="flex items-center">
        <Image
          src={icon || "/assets/ToDoEllipse.svg"}
          alt="header-icon"
          width={20}
          height={20}
        />
        <h2 className="text-[#4541C6] text-base sm:text-lg ml-2 font-medium">
          {title}
        </h2>
      </div>

      <button onClick={onCreateTask} className="cursor-pointer">
        <Image src="/assets/plus.svg" alt="plusIcon" width={20} height={20} />
      </button>
    </div>
  );
};
