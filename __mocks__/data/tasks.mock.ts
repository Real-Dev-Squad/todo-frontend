import { USER_TYPE_ENUM } from '../../api/common/common-enum'
import { TASK_PRIORITY_ENUM, TASK_STATUS_ENUM } from '../../api/tasks/tasks.enum'
import { TTask } from '../../api/tasks/tasks.types'

export type TMockTasksResponse = {
  links: {
    next: string | null
    prev: string | null
  }
  error: string | null
  tasks: TTask[]
}

const mockTasks: TTask[] = [
  {
    id: '68892236247494701cc45708',
    title: 'Implement React Query caching optimization',
    description:
      'Optimize the query invalidation logic when new mutations are triggered to improve performance and reduce unnecessary API calls.',
    priority: TASK_PRIORITY_ENUM.HIGH,
    status: TASK_STATUS_ENUM.IN_PROGRESS,
    assignee: {
      id: '68892236247494701cc45709',
      task_id: '68892236247494701cc45708',
      assignee_id: '687544d3814217e020e3d03a',
      assignee_name: 'Ankush Dharkar',
      user_type: USER_TYPE_ENUM.USER,
      is_active: true,
      created_by: '687544d3814217e020e3d03a',
      updated_by: null,
      created_at: '2025-07-29T19:34:14.048383Z',
      updated_at: null,
    },
    labels: [
      {
        id: '68717da2c91cc1af5ebd5889',
        name: 'Performance',
        color: '#f59e0b',
      },
      {
        id: '68717da2c91cc1af5ebd588a',
        name: 'Frontend',
        color: '#3b82f6',
      },
    ],
    dueAt: '2025-08-15T18:30:00Z',
    in_watchlist: true,
  },
  {
    id: '68891e9f247494701cc45700',
    title: 'Add comprehensive unit tests for API endpoints',
    description:
      'Implement thorough unit tests for all API endpoints to ensure code reliability and maintainability.',
    priority: TASK_PRIORITY_ENUM.MEDIUM,
    status: TASK_STATUS_ENUM.DONE,
    assignee: {
      id: '688a387f247494701cc45728',
      task_id: '68891e9f247494701cc45700',
      assignee_id: '687544d3814217e020e3d03a',
      assignee_name: 'Ankush Dharkar',
      user_type: USER_TYPE_ENUM.USER,
      is_active: true,
      created_by: '687544d3814217e020e3d03a',
      updated_by: '687544d3814217e020e3d03a',
      created_at: '2025-07-30T15:21:35.129278Z',
      updated_at: '2025-08-05T15:22:10.887000Z',
    },
    labels: [
      {
        id: '68717da2c91cc1af5ebd588c',
        name: 'Testing',
        color: '#06b6d4',
      },
      {
        id: '68717da2c91cc1af5ebd588a',
        name: 'Backend',
        color: '#3b82f6',
      },
    ],
    dueAt: '2025-08-19T18:30:00Z',
    in_watchlist: true,
  },
  {
    id: '6887d596d2a465fcc7d0cebd',
    title: 'Implement task deferral functionality',
    description:
      'Create a feature that allows users to defer tasks until a specific date. The task status should change to "deferred" and move to a separate deferred tasks list.',
    priority: TASK_PRIORITY_ENUM.HIGH,
    status: TASK_STATUS_ENUM.IN_PROGRESS,
    assignee: {
      id: '6887d5b9d2a465fcc7d0cec1',
      task_id: '6887d596d2a465fcc7d0cebd',
      assignee_id: '687544d3814217e020e3d03a',
      assignee_name: 'Ankush Dharkar',
      user_type: USER_TYPE_ENUM.USER,
      is_active: true,
      created_by: '687544d3814217e020e3d03a',
      updated_by: null,
      created_at: '2025-07-28T19:55:37.576128Z',
      updated_at: null,
    },
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
        id: '68717da2c91cc1af5ebd588b',
        name: 'UI/UX',
        color: '#8b5cf6',
      },
    ],
    dueAt: '2025-08-04T18:30:00Z',
    in_watchlist: null,
  },
  {
    id: '6889e945247494701cc45718',
    title: 'Optimize database query performance',
    description:
      'Analyze and optimize slow database queries to improve application performance and reduce response times.',
    priority: TASK_PRIORITY_ENUM.MEDIUM,
    status: TASK_STATUS_ENUM.DEFERRED,
    assignee: {
      id: '6889e945247494701cc45719',
      task_id: '6889e945247494701cc45718',
      assignee_id: '687544d3814217e020e3d03a',
      assignee_name: 'Ankush Dharkar',
      user_type: USER_TYPE_ENUM.USER,
      is_active: true,
      created_by: '687544d3814217e020e3d03a',
      updated_by: null,
      created_at: '2025-07-30T09:43:33.627840Z',
      updated_at: null,
    },
    labels: [
      {
        id: '68717da2c91cc1af5ebd5889',
        name: 'Performance',
        color: '#f59e0b',
      },
      {
        id: '68717da2c91cc1af5ebd588a',
        name: 'Backend',
        color: '#3b82f6',
      },
    ],
    dueAt: '2025-08-12T18:30:00Z',
    deferredDetails: {
      deferredTill: '2025-08-19T18:30:00Z',
      deferredBy: {
        id: '687544d3814217e020e3d03a',
        name: 'Ankush Dharkar',
      },
      deferredAt: '2025-08-05T21:53:47.934000Z',
    },
    in_watchlist: true,
  },
  {
    id: '6889f123247494701cc45720',
    title: 'Design system component library',
    description:
      'Create a comprehensive design system with reusable UI components to ensure consistency across the application.',
    priority: TASK_PRIORITY_ENUM.HIGH,
    status: TASK_STATUS_ENUM.TODO,
    assignee: {
      id: '6889f123247494701cc45721',
      task_id: '6889f123247494701cc45720',
      assignee_id: '687544d3814217e020e3d03a',
      assignee_name: 'Ankush Dharkar',
      user_type: USER_TYPE_ENUM.USER,
      is_active: true,
      created_by: '687544d3814217e020e3d03a',
      updated_by: null,
      created_at: '2025-07-30T10:00:00.000000Z',
      updated_at: null,
    },
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
    in_watchlist: false,
  },
  {
    id: '6889f456247494701cc45722',
    title: 'Implement real-time notifications',
    description:
      'Add WebSocket support for real-time notifications to keep users updated about task assignments and status changes.',
    priority: TASK_PRIORITY_ENUM.MEDIUM,
    status: TASK_STATUS_ENUM.TODO,
    assignee: {
      id: '6889f456247494701cc45723',
      task_id: '6889f456247494701cc45722',
      assignee_id: '687544d3814217e020e3d03a',
      assignee_name: 'Ankush Dharkar',
      user_type: USER_TYPE_ENUM.USER,
      is_active: true,
      created_by: '687544d3814217e020e3d03a',
      updated_by: null,
      created_at: '2025-07-30T11:00:00.000000Z',
      updated_at: null,
    },
    labels: [
      {
        id: '68717da2c91cc1af5ebd5887',
        name: 'Feature',
        color: '#22c55e',
      },
      {
        id: '68717da2c91cc1af5ebd588a',
        name: 'Backend',
        color: '#3b82f6',
      },
    ],
    dueAt: '2025-08-20T18:30:00Z',
    in_watchlist: false,
  },
]

const mockTeamTasks: TTask[] = [
  {
    id: '689c65205cc229c665988796',
    title: 'Investigate deployment performance issues',
    description:
      'Analyze and resolve performance bottlenecks in the CI/CD pipeline and deployment process.',
    priority: TASK_PRIORITY_ENUM.HIGH,
    status: TASK_STATUS_ENUM.TODO,
    assignee: {
      id: '689c65565cc229c6659887a1',
      task_id: '689c65205cc229c665988796',
      assignee_id: '687544d3814217e020e3d03a',
      assignee_name: 'Ankush Dharkar',
      user_type: USER_TYPE_ENUM.USER,
      is_active: true,
      created_by: '687544d3814217e020e3d03a',
      updated_by: null,
      created_at: '2025-08-13T10:13:42.198441Z',
      updated_at: null,
    },
    labels: [
      {
        id: '68717da2c91cc1af5ebd588c',
        name: 'DevOps',
        color: '#06b6d4',
      },
      {
        id: '68717da2c91cc1af5ebd5889',
        name: 'Performance',
        color: '#f59e0b',
      },
    ],
    dueAt: '2025-08-13T18:30:00Z',
    in_watchlist: null,
  },
  {
    id: '689c65205cc229c665988797',
    title: 'Optimize database connection pooling',
    description:
      'Implement connection pooling to improve database performance and reduce connection overhead.',
    priority: TASK_PRIORITY_ENUM.MEDIUM,
    status: TASK_STATUS_ENUM.IN_PROGRESS,
    assignee: {
      id: '689c65565cc229c6659887a2',
      task_id: '689c65205cc229c665988797',
      assignee_id: '687544d3814217e020e3d03a',
      assignee_name: 'Ankush Dharkar',
      user_type: USER_TYPE_ENUM.USER,
      is_active: true,
      created_by: '687544d3814217e020e3d03a',
      updated_by: null,
      created_at: '2025-08-13T11:00:00.000000Z',
      updated_at: null,
    },
    labels: [
      {
        id: '68717da2c91cc1af5ebd588a',
        name: 'Backend',
        color: '#3b82f6',
      },
      {
        id: '68717da2c91cc1af5ebd5889',
        name: 'Performance',
        color: '#f59e0b',
      },
    ],
    dueAt: '2025-08-20T18:30:00Z',
    in_watchlist: false,
  },
  {
    id: '689c65205cc229c665988798',
    title: 'Implement user authentication middleware',
    description:
      'Create robust authentication middleware for API endpoints with JWT token validation.',
    priority: TASK_PRIORITY_ENUM.HIGH,
    status: TASK_STATUS_ENUM.TODO,
    assignee: {
      id: '689c65565cc229c6659887a3',
      task_id: '689c65205cc229c665988798',
      assignee_id: '687544d3814217e020e3d03a',
      assignee_name: 'Ankush Dharkar',
      user_type: USER_TYPE_ENUM.USER,
      is_active: true,
      created_by: '687544d3814217e020e3d03a',
      updated_by: null,
      created_at: '2025-08-13T12:00:00.000000Z',
      updated_at: null,
    },
    labels: [
      {
        id: '68717da2c91cc1af5ebd588a',
        name: 'Backend',
        color: '#3b82f6',
      },
      {
        id: '68717da2c91cc1af5ebd5887',
        name: 'Security',
        color: '#ef4444',
      },
    ],
    dueAt: '2025-08-25T18:30:00Z',
    in_watchlist: false,
  },
  {
    id: '689c65205cc229c665988799',
    title: 'Create API documentation with Swagger',
    description:
      'Generate comprehensive API documentation using Swagger/OpenAPI for better developer experience.',
    priority: TASK_PRIORITY_ENUM.MEDIUM,
    status: TASK_STATUS_ENUM.TODO,
    assignee: {
      id: '689c65565cc229c6659887a4',
      task_id: '689c65205cc229c665988799',
      assignee_id: '687544d3814217e020e3d03a',
      assignee_name: 'Ankush Dharkar',
      user_type: USER_TYPE_ENUM.USER,
      is_active: true,
      created_by: '687544d3814217e020e3d03a',
      updated_by: null,
      created_at: '2025-08-13T13:00:00.000000Z',
      updated_at: null,
    },
    labels: [
      {
        id: '68717da2c91cc1af5ebd588a',
        name: 'Backend',
        color: '#3b82f6',
      },
      {
        id: '68717da2c91cc1af5ebd5887',
        name: 'Documentation',
        color: '#10b981',
      },
    ],
    dueAt: '2025-08-30T18:30:00Z',
    in_watchlist: false,
  },
  {
    id: '689c65205cc229c665988800',
    title: 'Set up Redis caching layer',
    description:
      'Implement Redis caching for frequently accessed data to improve application performance.',
    priority: TASK_PRIORITY_ENUM.HIGH,
    status: TASK_STATUS_ENUM.IN_PROGRESS,
    assignee: {
      id: '689c65565cc229c6659887a5',
      task_id: '689c65205cc229c665988800',
      assignee_id: '687544d3814217e020e3d03a',
      assignee_name: 'Ankush Dharkar',
      user_type: USER_TYPE_ENUM.USER,
      is_active: true,
      created_by: '687544d3814217e020e3d03a',
      updated_by: null,
      created_at: '2025-08-13T14:00:00.000000Z',
      updated_at: null,
    },
    labels: [
      {
        id: '68717da2c91cc1af5ebd588a',
        name: 'Backend',
        color: '#3b82f6',
      },
      {
        id: '68717da2c91cc1af5ebd5889',
        name: 'Performance',
        color: '#f59e0b',
      },
    ],
    dueAt: '2025-08-22T18:30:00Z',
    in_watchlist: false,
  },
  {
    id: '689c65205cc229c665988801',
    title: 'Configure Kubernetes deployment',
    description:
      'Set up Kubernetes deployment configuration for containerized application deployment.',
    priority: TASK_PRIORITY_ENUM.HIGH,
    status: TASK_STATUS_ENUM.TODO,
    assignee: {
      id: '689c65565cc229c6659887a6',
      task_id: '689c65205cc229c665988801',
      assignee_id: '687544d3814217e020e3d03a',
      assignee_name: 'Ankush Dharkar',
      user_type: USER_TYPE_ENUM.USER,
      is_active: true,
      created_by: '687544d3814217e020e3d03a',
      updated_by: null,
      created_at: '2025-08-13T15:00:00.000000Z',
      updated_at: null,
    },
    labels: [
      {
        id: '68717da2c91cc1af5ebd588c',
        name: 'DevOps',
        color: '#06b6d4',
      },
      {
        id: '68717da2c91cc1af5ebd5887',
        name: 'Infrastructure',
        color: '#8b5cf6',
      },
    ],
    dueAt: '2025-08-28T18:30:00Z',
    in_watchlist: false,
  },
  {
    id: '689c65205cc229c665988802',
    title: 'Create automated test suite',
    description:
      'Develop comprehensive automated test suite covering unit, integration, and end-to-end tests.',
    priority: TASK_PRIORITY_ENUM.MEDIUM,
    status: TASK_STATUS_ENUM.IN_PROGRESS,
    assignee: {
      id: '689c65565cc229c6659887a7',
      task_id: '689c65205cc229c665988802',
      assignee_id: '687544d3814217e020e3d03a',
      assignee_name: 'Ankush Dharkar',
      user_type: USER_TYPE_ENUM.USER,
      is_active: true,
      created_by: '687544d3814217e020e3d03a',
      updated_by: null,
      created_at: '2025-08-13T16:00:00.000000Z',
      updated_at: null,
    },
    labels: [
      {
        id: '68717da2c91cc1af5ebd588c',
        name: 'Testing',
        color: '#06b6d4',
      },
      {
        id: '68717da2c91cc1af5ebd5887',
        name: 'Automation',
        color: '#22c55e',
      },
    ],
    dueAt: '2025-08-25T18:30:00Z',
    in_watchlist: false,
  },
  {
    id: '689c65205cc229c665988803',
    title: 'Define product roadmap for Q4',
    description:
      'Create detailed product roadmap and feature prioritization for the upcoming quarter.',
    priority: TASK_PRIORITY_ENUM.HIGH,
    status: TASK_STATUS_ENUM.TODO,
    assignee: {
      id: '689c65565cc229c6659887a8',
      task_id: '689c65205cc229c665988803',
      assignee_id: '687544d3814217e020e3d03a',
      assignee_name: 'Ankush Dharkar',
      user_type: USER_TYPE_ENUM.USER,
      is_active: true,
      created_by: '687544d3814217e020e3d03a',
      updated_by: null,
      created_at: '2025-08-13T17:00:00.000000Z',
      updated_at: null,
    },
    labels: [
      {
        id: '68717da2c91cc1af5ebd5887',
        name: 'Planning',
        color: '#22c55e',
      },
      {
        id: '68717da2c91cc1af5ebd588b',
        name: 'Strategy',
        color: '#8b5cf6',
      },
    ],
    dueAt: '2025-08-31T18:30:00Z',
    in_watchlist: false,
  },
]
