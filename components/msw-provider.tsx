import { enableMocking } from '@/__mocks__/init'
import { PropsWithChildren, useEffect, useState } from 'react'

export function MockServiceWorkerProvider({ children }: PropsWithChildren) {
  const [isMswReady, setIsMswReady] = useState(false)

  useEffect(() => {
    enableMocking().then(() => {
      setIsMswReady(true)
    })
  }, [])

  if (process.env.NODE_ENV !== 'development') return children

  if (!isMswReady) {
    return 'loading msw worker...'
  }

  return <>{children}</>
}
