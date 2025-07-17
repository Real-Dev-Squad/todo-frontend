import { TASK_PRIORITY_ENUM, TASK_STATUS_ENUM } from '@/api/tasks/tasks.enum'
import { TTask } from '@/api/tasks/tasks.types'
import { TUser } from '@/api/users/users.types'

export const dummyUsers: TUser[] = [
  {
    user_id: '1',
    name: 'John Doe',
    email: 'john.doe@gmail.com',
    picture: 'https://example.com/john.jpg',
  },
  {
    user_id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@gmail.com',
    picture: 'https://example.com/john.jpg',
  },
  {
    user_id: '3',
    name: 'Michael Johnson',
    email: 'michael.johnson@gmail.com',
    picture: 'https://example.com/john.jpg',
  },
  {
    user_id: '4',
    name: 'Emily Brown',
    email: 'emily.brown@gmail.com',
    picture: 'https://example.com/john.jpg',
  },
  {
    user_id: '5',
    name: 'David Wilson',
    email: 'david.wilson@gmail.com',
    picture: 'https://example.com/john.jpg',
  },
  {
    user_id: '6',
    name: 'Sarah Davis',
    email: 'sarah.davis@gmail.com',
    picture: 'https://example.com/john.jpg',
  },
  {
    user_id: '7',
    name: 'Robert Miller',
    email: 'robert.miller@gmail.com',
    picture: 'https://example.com/john.jpg',
  },
  {
    user_id: '8',
    name: 'Lisa Garcia',
    email: 'lisa.garcia@gmail.com',
    picture: 'https://example.com/john.jpg',
  },
  {
    user_id: '9',
    name: 'James Martinez',
    email: 'james.martinez@gmail.com',
    picture: 'https://example.com/john.jpg',
  },
  {
    user_id: '10',
    name: 'Jessica Anderson',
    email: 'jessica.anderson@gmail.com',
    picture: 'https://example.com/john.jpg',
  },
  {
    user_id: '11',
    name: 'Christopher Taylor',
    email: 'christopher.taylor@gmail.com',
    picture: 'https://example.com/john.jpg',
  },
  {
    user_id: '12',
    name: 'Ashley Thomas',
    email: 'ashley.thomas@gmail.com',
    picture: 'https://example.com/john.jpg',
  },
  {
    user_id: '13',
    name: 'Matthew Jackson',
    email: 'matthew.jackson@gmail.com',
    picture: 'https://example.com/john.jpg',
  },
  {
    user_id: '14',
    name: 'Amanda White',
    email: 'amanda.white@gmail.com',
    picture: 'https://example.com/john.jpg',
  },
  {
    user_id: '15',
    name: 'Daniel Harris',
    email: 'daniel.harris@gmail.com',
    picture: 'https://example.com/john.jpg',
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
  status: TASK_STATUS_ENUM.TODO,
  priority: TASK_PRIORITY_ENUM.LOW,
  tags: ['Urgent'],
}
