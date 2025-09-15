import { z } from 'zod'

const appConfigSchema = z.object({
  appName: z.string().min(1, { error: 'App name is required.' }),
  appDescription: z.string().min(1, { error: 'App description is required' }),
  backendBaseUrl: z.string().min(1, { error: 'Backend base URL is required' }),
  isDev: z.boolean(),
  isMockingEnabled: z.boolean(),
  adminEmails: z.array(z.string().email()).default([]),
})

type TAppConfig = z.infer<typeof appConfigSchema>

export const appConfig: TAppConfig = {
  appName: 'Stride',
  appDescription: 'An effective todo management systems for your teams.',
  backendBaseUrl: import.meta.env.VITE_BACKEND_API_URL || '',
  isDev: import.meta.env.DEV,
  isMockingEnabled: import.meta.env.VITE_API_MOCKING === 'true',
  adminEmails: (() => {
    const envValue = import.meta.env.VITE_ADMIN_EMAILS
    const parsed = envValue?.split(',').map((email: string) => email.trim()) || []
    return parsed
  })(),
}

export const validateAppConfig = (config: TAppConfig) => {
  const result = appConfigSchema.safeParse(config)

  if (!result.success) {
    console.error('App config error:', z.treeifyError(result.error).properties)
    throw new Error('Invalid app config')
  }

  return result.data
}
