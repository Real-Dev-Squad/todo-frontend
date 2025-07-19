export async function enableMocking() {
  const isDev = process.env.NODE_ENV === 'development'
  const isMockingEnabled = process.env.NEXT_PUBLIC_API_MOCKING === 'true'

  if (!isDev || !isMockingEnabled) {
    console.log('MSW mocking disabled: ', { isDev, isMockingEnabled })
    return
  }
  try {
    if (typeof window === 'undefined') {
      const { server } = await import('./server')
      server.listen({
        onUnhandledRequest: (req, print) => {
          if (req.url.includes('_next')) {
            return
          }
          print.warning()
        },
      })
    } else {
      const { worker } = await import('./browser')
      await worker.start({
        onUnhandledRequest: (req, print) => {
          if (req.url.includes('_next')) {
            return
          }
          print.warning()
        },
      })
    }
  } catch (error) {
    console.log('Failed to start MSW server: ', error)
  }
}
