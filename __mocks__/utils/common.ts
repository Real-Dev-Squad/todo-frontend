export const sleep = (ms: number = 100): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const getApiUrl = (path: string): string => {
  const sanitizedPath = path.replace(/\.\./g, '').replace(/^\/+/, '')
  return `*/v1/${sanitizedPath}`
}
