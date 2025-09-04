import dayjs from 'dayjs'

export enum DateFormats {
  DD_MM_YYYY = 'DD MM YYYY',
  D_MMM_YYYY = 'D MMM YYYY',
  MM_DD_YYYY = 'MM/DD/YYYY',
  YYYY_MM_DD = 'YYYY-MM-DD',
  D_MMM_YYYY_HH_mm = 'D MMM YYYY HH:mm',
}

export class DateUtil {
  private date

  constructor(date: string | Date) {
    this.date = dayjs(date)
  }

  format(format: DateFormats): string {
    return this.date.format(format)
  }
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
  if (!dueDate) return true
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const taskDueDate = new Date(dueDate)
  taskDueDate.setHours(0, 0, 0, 0)
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow < taskDueDate
}
