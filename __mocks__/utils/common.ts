export const sleep = (ms: number = 100): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const getApiUrl = (path: string): string => {
  return `*/v1${path}`
}
