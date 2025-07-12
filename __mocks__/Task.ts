import { TASK_STATUS } from '@/api/tasks/tasks.enum'
import { TTask } from '@/api/tasks/tasks.types'
import { TUser } from '@/api/users/users.types'

export const dummyUsers: TUser[] = [
  {
    user_id: '1',
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    auth_type: 'email',
    google_id: '',
  },
  {
    user_id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@gmail.com',
    auth_type: 'email',
    google_id: '',
  },
  {
    user_id: '3',
    name: 'Michael Johnson',
    email: 'michael.johnson@gmail.com',
    auth_type: 'email',
    google_id: '',
  },
  {
    user_id: '4',
    name: 'Emily Brown',
    email: 'emily.brown@gmail.com',
    auth_type: 'email',
    google_id: '',
  },
  {
    user_id: '5',
    name: 'David Wilson',
    email: 'david.wilson@gmail.com',
    auth_type: 'email',
    google_id: '',
  },
  {
    user_id: '6',
    name: 'Sarah Davis',
    email: 'sarah.davis@gmail.com',
    auth_type: 'email',
    google_id: '',
  },
  {
    user_id: '7',
    name: 'Robert Miller',
    email: 'robert.miller@gmail.com',
    auth_type: 'email',
    google_id: '',
  },
  {
    user_id: '8',
    name: 'Lisa Garcia',
    email: 'lisa.garcia@gmail.com',
    auth_type: 'email',
    google_id: '',
  },
  {
    user_id: '9',
    name: 'James Martinez',
    email: 'james.martinez@gmail.com',
    auth_type: 'email',
    google_id: '',
  },
  {
    user_id: '10',
    name: 'Jessica Anderson',
    email: 'jessica.anderson@gmail.com',
    auth_type: 'email',
    google_id: '',
  },
  {
    user_id: '11',
    name: 'Christopher Taylor',
    email: 'christopher.taylor@gmail.com',
    auth_type: 'email',
    google_id: '',
  },
  {
    user_id: '12',
    name: 'Ashley Thomas',
    email: 'ashley.thomas@gmail.com',
    auth_type: 'email',
    google_id: '',
  },
  {
    user_id: '13',
    name: 'Matthew Jackson',
    email: 'matthew.jackson@gmail.com',
    auth_type: 'email',
    google_id: '',
  },
  {
    user_id: '14',
    name: 'Amanda White',
    email: 'amanda.white@gmail.com',
    auth_type: 'email',
    google_id: '',
  },
  {
    user_id: '15',
    name: 'Daniel Harris',
    email: 'daniel.harris@gmail.com',
    auth_type: 'email',
    google_id: '',
  },
]

export const initialData: TTask = {
  id: '1',
  title: 'Sample Task',
  description: 'This is a test task description.',
  dueAt: '2024-12-31',
  assignee: {
    id: dummyUsers[0].user_id,
    name: dummyUsers[0].name,
  },
  status: TASK_STATUS.TODO,
  tags: ['Urgent'],
}
