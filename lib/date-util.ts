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
