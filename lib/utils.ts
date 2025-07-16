import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isPastDate(date: Date) {
  const today = new Date()
  return date.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)
}

export const debounce = <T extends (...args: any[]) => void>(fn: T, delay: number = 250) => {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}
