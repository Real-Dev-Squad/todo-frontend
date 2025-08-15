import { TLabel } from '../../api/tasks/tasks.types'
import { sleep } from '../utils/common'

export type TMockLabelsResponse = {
  links: {
    next: string | null
    prev: string | null
  }
  error: string | null
  labels: TLabel[]
  total: number
  page: number
  limit: number
}

const mockLabels: TLabel[] = [
  {
    id: '68717da2c91cc1af5ebd588a',
    name: 'API',
    color: '#3b82f6',
  },
  {
    id: '68717da2c91cc1af5ebd5888',
    name: 'Bug',
    color: '#ef4444',
  },
  {
    id: '68717da2c91cc1af5ebd588d',
    name: 'Documentation',
    color: '#64748b',
  },
  {
    id: '68717da2c91cc1af5ebd5887',
    name: 'Feature',
    color: '#22c55e',
  },
  {
    id: '68717da2c91cc1af5ebd5889',
    name: 'Refactoring/Optimization',
    color: '#f59e0b',
  },
  {
    id: '68717da2c91cc1af5ebd588e',
    name: 'Review',
    color: '#ec4899',
  },
  {
    id: '68717da2c91cc1af5ebd588c',
    name: 'Testing',
    color: '#06b6d4',
  },
  {
    id: '68717da2c91cc1af5ebd588b',
    name: 'UI/UX',
    color: '#8b5cf6',
  },
]

export const MockLabelsAPI = {
  getAllLabels: async (): Promise<TMockLabelsResponse> => {
    await sleep()
    return {
      links: {
        next: null,
        prev: null,
      },
      error: null,
      labels: mockLabels,
      total: mockLabels.length,
      page: 1,
      limit: 10,
    }
  },
}
