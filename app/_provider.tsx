"use client";
import {
    QueryClientProvider,
    QueryClient,
  } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from 'react';

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
          queries: {
            retry: 3,              
            refetchOnMount: true,  
            staleTime: 0,
          },
        },
      }));
    
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


