import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isPastDate(date: Date) {
  const today = new Date()
  return date.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const debounce = <T extends (...args: any[]) => void>(fn: T, delay: number = 250) => {
  let timeout: NodeJS.Timeout

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), delay)
  }
}

export function hexToRgba(hex: string, alpha: number) {
  let c = hex.replace('#', '')
  if (c.length === 3) {
    c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2]
  }
  const num = parseInt(c, 16)
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255
  return `rgba(${r},${g},${b},${alpha})`
}

export const isDateValidForDefer = (date: Date, dueDate?: string): boolean => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (date <= today) return false

  if (dueDate) {
    const taskDueDate = new Date(dueDate)
    taskDueDate.setHours(0, 0, 0, 0)
    if (date >= taskDueDate) return false
  }

  return true
}

export const hasValidDeferDates = (dueDate?: string): boolean => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (!dueDate) {
    return true
  }

  const taskDueDate = new Date(dueDate)
  taskDueDate.setHours(0, 0, 0, 0)

  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow < taskDueDate
}
