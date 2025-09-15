import { appConfig } from '@/config/app-config'

export async function enableMocking() {
  if (!appConfig.isDev || !appConfig.isMockingEnabled) {
    if (appConfig.isDev) {
      console.log(
        `[MSW] Mocking disabled → Environment: Development, Mocking Enabled: ${appConfig.isMockingEnabled}`,
      )
    }
    return
  }
  try {
    const { worker } = await import('./browser')

    await worker.start()
  } catch (error) {
    console.log('Failed to start MSW server: ', error)
  }
}
