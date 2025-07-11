import { useAuth } from "@/app/hooks/useAuth";



export const TaskDashboardHeader = () => {
  const { user } = useAuth();
  const username = user?.data?.name ? user?.data?.name : "Guest";
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mb-6 flex flex-col justify-center items-center">
      <p className="text-gray-600">{currentDate}</p>
      <h1 className="text-2xl font-bold text-gray-900">
        Welcome Back, {username}
      </h1>
    </div>
  );
};
