import { useQuery } from "@tanstack/react-query";
import { TasksApiResponse } from "../types/api";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000";

export function useTasks() {
  const { data, isLoading, isError } = useQuery<TasksApiResponse>({
    queryKey: ["tasks", "profile"],
    queryFn: async () => {
      const res = await fetch(`${BACKEND_URL}/v1/tasks?profile=true`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed to fetch tasks");
      return res.json();
    },
    retry: false,
  });

  return { data, isLoading, isError };
}
