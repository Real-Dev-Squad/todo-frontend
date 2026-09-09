import { appConfig } from '@/config/app-config'
import axios from 'axios'

const backendUrl = appConfig.backendBaseUrl

export const apiClient = axios.create({
  baseURL: backendUrl,
  timeout: 30000,
  withCredentials: true,
  paramsSerializer: {
    serialize: (params) => {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => searchParams.append(key, v))
        } else if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      return searchParams.toString()
    },
  },
})

apiClient.interceptors.request.use(
  async (config) => {
    config.headers.set('Content-Type', 'application/json')
    return config
  },
  (error) => {
    return Promise.reject(error instanceof Error ? error : new Error(String(error)))
  },
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const pathname = window.location.pathname

    if (error.response && error.response.status === 401 && pathname !== '/') {
      window.location.href = '/'
    }

    return Promise.reject(error instanceof Error ? error : new Error(String(error)))
  },
)
