import { useQuery } from '@tanstack/react-query';

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:8000';

export function useAuth() {
  const { data: user, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await fetch(`${backendUrl}/v1/user`, { credentials: 'include' });
      if (!res.ok) throw new Error('Not authenticated');
      return res.json();
    },
    retry: false,
  });

  const isAuthenticated = !!user && !isError;

  return { isAuthenticated, user, isLoading, isError };
} 