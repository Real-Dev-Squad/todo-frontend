type TaskDashboardHeaderProps = {
  userName: string;
};

export const TaskDashboardHeader = ({ userName }: TaskDashboardHeaderProps) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mb-6 flex flex-col justify-center items-center">
      <p className="text-gray-600">{currentDate}</p>
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome Back, {userName}
      </h1>
    </div>
  );
};
