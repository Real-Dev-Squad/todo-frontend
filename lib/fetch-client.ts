import { appConfig } from '@/config/app-config'
import { cookies } from 'next/headers'

export class FetchClient {
  private static backendUrl = appConfig.backendBaseUrl

  private static getUrl = (url: string, params?: Record<string, string | number>) => {
    const finalUrl = `${this.backendUrl}${url.startsWith('/') ? '' : '/'}${url}`
    const queryParams = this.getParams(params)

    return queryParams ? `${finalUrl}?${queryParams}` : finalUrl
  }

  private static getParams = (params?: Record<string, string | number>) => {
    if (!params) return ''

    const query = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, String(value))
      }
    })

    return query.toString() ? `?${query.toString()}` : ''
  }

  public static get = async <T>(
    url: string,
    tags: string[],
    params?: Record<string, string | number>,
  ): Promise<T> => {
    const cookieStore = await cookies()

    const response = await fetch(this.getUrl(url, params), {
      headers: { 'Content-Type': 'application/json', Cookie: cookieStore.toString() },
      credentials: 'include',
      next: { tags },
    })

    console.log('response status: ', response.status)

    return response.json()
  }
}
