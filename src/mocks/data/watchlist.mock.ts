import { TASK_PRIORITY_ENUM, TASK_STATUS_ENUM } from '../../api/tasks/tasks.enum'
import { TWatchListTask } from '../../api/tasks/tasks.types'
import { sleep } from '../utils/common'

export type TMockWatchlistResponse = {
  links: {
    next: string | null
    prev: string | null
  }
  error: string | null
  tasks: TWatchListTask[]
}

export const mockWatchlistTasks: TWatchListTask[] = [
  {
    taskId: '687a055e5d69510ea7c97f1d',
    displayId: '#136',
    title: 'Implement user authentication system',
    description:
      'Create a comprehensive authentication system with JWT tokens, password hashing, and role-based access control.',
    priority: TASK_PRIORITY_ENUM.HIGH,
    status: TASK_STATUS_ENUM.TODO,
    isAcknowledged: false,
    isDeleted: false,
    labels: [
      {
        id: '68717da2c91cc1af5ebd5887',
        name: 'Feature',
        color: '#22c55e',
      },
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
    ],
    dueAt: '2025-07-22T18:30:00Z',
    createdAt: '2025-07-18T08:27:10.653750Z',
    watchlistId: '687a09b65d69510ea7c97f22',
    userId: '687544d3814217e020e3d03a',
  },
  {
    taskId: '68891e9f247494701cc45700',
    displayId: '#251',
    title: 'Add comprehensive unit tests for API endpoints',
    description:
      'Implement thorough unit tests for all API endpoints to ensure code reliability and maintainability.',
    priority: TASK_PRIORITY_ENUM.MEDIUM,
    status: TASK_STATUS_ENUM.DONE,
    isAcknowledged: false,
    isDeleted: false,
    labels: [
      {
        id: '68717da2c91cc1af5ebd588c',
        name: 'Testing',
        color: '#06b6d4',
      },
      {
        id: '68717da2c91cc1af5ebd588a',
        name: 'API',
        color: '#3b82f6',
      },
    ],
    dueAt: '2025-08-19T18:30:00Z',
    createdAt: '2025-07-29T19:18:55.179799Z',
    watchlistId: '68891eb8247494701cc45703',
    userId: '68702893e331b8aa7a58ffe7',
  },
  {
    taskId: '6890fb7f087c62e482073c2d',
    displayId: '#277',
    title: 'Optimize database query performance',
    description:
      'Analyze and optimize slow database queries to improve application performance and reduce response times.',
    priority: TASK_PRIORITY_ENUM.HIGH,
    status: TASK_STATUS_ENUM.DEFERRED,
    isAcknowledged: false,
    isDeleted: false,
    labels: [
      {
        id: '68717da2c91cc1af5ebd5889',
        name: 'Refactoring/Optimization',
        color: '#f59e0b',
      },
      {
        id: '68717da2c91cc1af5ebd588a',
        name: 'API',
        color: '#3b82f6',
      },
    ],
    dueAt: '2025-08-29T18:30:00Z',
    createdAt: '2025-08-04T18:27:11.888243Z',
    watchlistId: '68910ec2087c62e482073c3e',
    userId: '6870289de331b8aa7a58ffe8',
  },
  {
    taskId: '6889e945247494701cc45718',
    displayId: '#257',
    title: 'Implement real-time notifications',
    description:
      'Add WebSocket support for real-time notifications to keep users updated about task assignments and status changes.',
    priority: TASK_PRIORITY_ENUM.MEDIUM,
    status: TASK_STATUS_ENUM.DEFERRED,
    isAcknowledged: false,
    isDeleted: false,
    labels: [
      {
        id: '68717da2c91cc1af5ebd5887',
        name: 'Feature',
        color: '#22c55e',
      },
      {
        id: '68717da2c91cc1af5ebd588a',
        name: 'API',
        color: '#3b82f6',
      },
    ],
    dueAt: '2025-08-12T18:30:00Z',
    createdAt: '2025-07-30T09:43:33.622526Z',
    watchlistId: '6893741be25784697eb0f64a',
    userId: '68704332e331b8aa7a58ffff',
  },
  {
    taskId: '68892236247494701cc45708',
    displayId: '#253',
    title: 'Implement React Query caching optimization',
    description:
      'Optimize the query invalidation logic when new mutations are triggered to improve performance and reduce unnecessary API calls.',
    priority: TASK_PRIORITY_ENUM.HIGH,
    status: TASK_STATUS_ENUM.IN_PROGRESS,
    isAcknowledged: false,
    isDeleted: false,
    labels: [
      {
        id: '68717da2c91cc1af5ebd5889',
        name: 'Refactoring/Optimization',
        color: '#f59e0b',
      },
      {
        id: '68717da2c91cc1af5ebd588b',
        name: 'UI/UX',
        color: '#8b5cf6',
      },
    ],
    dueAt: '2025-07-31T18:30:00Z',
    createdAt: '2025-07-29T19:34:14.042878Z',
    watchlistId: '6898597b5cc229c665988778',
    userId: '68763311d460e707c18727f4',
  },
  {
    taskId: '6889f123247494701cc45720',
    displayId: '#258',
    title: 'Design system component library',
    description:
      'Create a comprehensive design system with reusable UI components to ensure consistency across the application.',
    priority: TASK_PRIORITY_ENUM.HIGH,
    status: TASK_STATUS_ENUM.TODO,
    isAcknowledged: false,
    isDeleted: false,
    labels: [
      {
        id: '68717da2c91cc1af5ebd5887',
        name: 'Feature',
        color: '#22c55e',
      },
      {
        id: '68717da2c91cc1af5ebd588b',
        name: 'UI/UX',
        color: '#8b5cf6',
      },
    ],
    dueAt: '2025-08-25T18:30:00Z',
    createdAt: '2025-07-30T10:00:00.000000Z',
    watchlistId: '6898597b5cc229c665988779',
    userId: '6875653d814217e020e3d069',
  },
]

export const MockWatchlistAPI = {
  getWatchlistTasks: async (): Promise<TMockWatchlistResponse> => {
    await sleep()
    return {
      links: {
        next: null,
        prev: null,
      },
      error: null,
      tasks: mockWatchlistTasks,
    }
  },

  addTaskToWatchlist: async (): Promise<void> => {
    await sleep()
  },

  toggleWatchlistStatus: async (taskId: string, isActive: boolean): Promise<void> => {
    await sleep()
    const taskIndex = mockWatchlistTasks.findIndex((task) => task.taskId === taskId)
    if (taskIndex !== -1) {
      mockWatchlistTasks[taskIndex].isAcknowledged = isActive
    }
  },
}
