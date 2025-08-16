'use client'

import { enableMocking } from '@/__mocks__/init'
import type { PropsWithChildren } from 'react'
import { useEffect, useState } from 'react'

export function useMswInitialization() {
  const [isMswReady, setIsMswReady] = useState(false)
  useEffect(() => {
    enableMocking().then(() => setIsMswReady(true))
  }, [])
  return isMswReady
}

export function MockServiceWorkerProvider({ children }: PropsWithChildren) {
  const isMswReady = useMswInitialization()

  if (process.env.NODE_ENV !== 'development') return children

  if (!isMswReady) {
    return <div>loading msw worker...</div>
  }

  return <>{children}</>
}
