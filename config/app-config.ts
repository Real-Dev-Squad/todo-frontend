import { z } from 'zod'

const appConfigSchema = z.object({
  appName: z.string().min(1, { error: 'App name is required.' }),
  appDescription: z.string().min(1, { error: 'App description is required' }),
  backendBaseUrl: z.string().min(1, { error: 'Backend base URL is required' }),
  isDev: z.boolean(),
  isMockingEnabled: z.boolean(),
})

type TAppConfig = z.infer<typeof appConfigSchema>

export const appConfig: TAppConfig = {
  appName: 'Stride',
  appDescription: 'An effective todo management systems for your teams.',
  backendBaseUrl: process.env.NEXT_PUBLIC_BACKEND_API_URL || '',
  isDev: process.env.NODE_ENV === 'development',
  isMockingEnabled: process.env.NEXT_PUBLIC_API_MOCKING === 'true',
}

export const ADMIN_USER_IDS = ['68964bc12f800de2f533f8f1']

export const validateAppConfig = (config: TAppConfig) => {
  const result = appConfigSchema.safeParse(config)

  if (!result.success) {
    console.error('App config error:', z.treeifyError(result.error).properties)
    throw new Error('Invalid app config')
  }

  return result.data
}
