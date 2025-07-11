import { Task, TASK_STATUS } from '@/app/types/tasks'
import { User } from '@/app/types/user'

export const dummyUsers: User[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@gmail.com',
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@gmail.com',
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Johnson',
    email: 'michael.johnson@gmail.com',
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Brown',
    email: 'emily.brown@gmail.com',
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@gmail.com',
  },
  {
    id: '6',
    firstName: 'Sarah',
    lastName: 'Davis',
    email: 'sarah.davis@gmail.com',
  },
  {
    id: '7',
    firstName: 'Robert',
    lastName: 'Miller',
    email: 'robert.miller@gmail.com',
  },
  {
    id: '8',
    firstName: 'Lisa',
    lastName: 'Garcia',
    email: 'lisa.garcia@gmail.com',
  },
  {
    id: '9',
    firstName: 'James',
    lastName: 'Martinez',
    email: 'james.martinez@gmail.com',
  },
  {
    id: '10',
    firstName: 'Jessica',
    lastName: 'Anderson',
    email: 'jessica.anderson@gmail.com',
  },
  {
    id: '11',
    firstName: 'Christopher',
    lastName: 'Taylor',
    email: 'christopher.taylor@gmail.com',
  },
  {
    id: '12',
    firstName: 'Ashley',
    lastName: 'Thomas',
    email: 'ashley.thomas@gmail.com',
  },
  {
    id: '13',
    firstName: 'Matthew',
    lastName: 'Jackson',
    email: 'matthew.jackson@gmail.com',
  },
  {
    id: '14',
    firstName: 'Amanda',
    lastName: 'White',
    email: 'amanda.white@gmail.com',
  },
  {
    id: '15',
    firstName: 'Daniel',
    lastName: 'Harris',
    email: 'daniel.harris@gmail.com',
  },
  {
    id: '16',
    firstName: 'Stephanie',
    lastName: 'Martin',
    email: 'stephanie.martin@gmail.com',
  },
  {
    id: '17',
    firstName: 'Kevin',
    lastName: 'Thompson',
    email: 'kevin.thompson@gmail.com',
  },
  {
    id: '18',
    firstName: 'Michelle',
    lastName: 'Garcia',
    email: 'michelle.garcia@gmail.com',
  },
  {
    id: '19',
    firstName: 'Ryan',
    lastName: 'Rodriguez',
    email: 'ryan.rodriguez@gmail.com',
  },
  {
    id: '20',
    firstName: 'Nicole',
    lastName: 'Lewis',
    email: 'nicole.lewis@gmail.com',
  },
]

export const initialData: Task = {
  id: '1',
  title: 'Sample Task',
  description: 'This is a test task description.',
  dueDate: '2024-12-31',
  assignee: {
    id: dummyUsers[0].id,
    name: `${dummyUsers[0].firstName} ${dummyUsers[0].lastName}`,
  },
  status: TASK_STATUS.TODO,
  tags: ['Urgent'],
  taskId: '#12345',
}
