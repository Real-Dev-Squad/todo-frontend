type TApiFunction<T> = {
  key: string[] | ((...args: any[]) => Array<string | number | boolean | undefined>)
  fn: (...args: any[]) => Promise<T>
}

export type TApiMethodsRecord = Record<string, TApiFunction<any>>

export type TApiResponse<T> = {
  data: T
  message: string
}
