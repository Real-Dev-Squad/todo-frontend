import { appConfig } from '@/config/app-config'

export async function enableMocking() {
  if (appConfig.isDev && !appConfig.isMockingEnabled) {
    console.log(`MSW mocking disabled: ${appConfig.isDev}, ${appConfig.isMockingEnabled} `)
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
