type TApiFunction<T> = {
  key: string[] | ((...args: any[]) => string[])
  fn: (...args: any[]) => Promise<T>
}

export type TApiMethodsRecord = Record<string, TApiFunction<any>>

export type TApiResponse<T> = {
  data: T
  message: string
}
