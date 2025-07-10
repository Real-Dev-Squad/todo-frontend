import { useQuery } from "@tanstack/react-query";

const backendUrl =
  process.env.NEXT_PUBLIC_BACKEND_API_URL || "http://localhost:8000";

export function useAuth() {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["users", "profile"],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/v1/users?profile=true`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated");
      return res.json();
    },
    retry: false,
  });

  const isAuthenticated = !isError && !isLoading && !!user;
  const userData = isAuthenticated ? user : undefined;

  return { isAuthenticated, user: userData, isLoading, isError };
}
