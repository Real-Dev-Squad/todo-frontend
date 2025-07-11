// @vitest-environment jsdom
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuth } from '../../app/hooks/useAuth'
import React from 'react'
import { describe, it, expect, vi, afterEach } from 'vitest'

const queryClient = new QueryClient()
function Wrapper({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

describe('useAuth', () => {
  afterEach(() => {
    vi.resetAllMocks()
  })

  it('returns user and isAuthenticated=true when authenticated', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ data: { name: 'Test User' } }),
    })
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper })
    await waitFor(() => expect(result.current.isAuthenticated).toBe(true))
    expect(result.current.user).toEqual({ data: { name: 'Test User' } })
  })

  it('returns isAuthenticated=false when not authenticated', async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false })
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper })
    await waitFor(() => expect(result.current.isAuthenticated).toBe(false))
    expect(result.current.user).toBeUndefined()
  })

  it('returns isError=true on fetch error', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'))
    const { result } = renderHook(() => useAuth(), { wrapper: Wrapper })
    await waitFor(() => expect(result.current.isError).toBe(true))
  })
})
