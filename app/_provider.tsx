"use client";
import {
    QueryClientProvider,
    QueryClient,
  } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
 const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};


