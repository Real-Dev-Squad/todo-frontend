'use client'

import { useEffect } from 'react'

export function MockServiceWorkerProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    import('@/__mocks__/init').then(({ enableMocking }) => {
      enableMocking()
    })
  }, [])

  return <>{children}</>
}
