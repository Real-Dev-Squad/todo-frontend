import React from 'react'
// import { UnderConstruction } from '../UnderConstruction'
import { CheckCircle, RefreshCw, UserPlus } from 'lucide-react'
import { TeamActivityCard } from './TeamAcitvityCard'

const teamActivities = [
  {
    id: 1,
    icon: CheckCircle,
    date: '2024-07-01',
    title: 'Finished the Task',
    description: 'The team successfully completed the homepage redesign task.',
    user: 'Anuj',
  },
  {
    id: 2,
    icon: RefreshCw,
    date: '2024-07-02',
    title: 'Updated Task Status',
    description: 'The status of the API integration task was updated to "In Progress".',
    user: 'Shobhan',
  },
  {
    id: 3,
    icon: UserPlus,
    date: '2024-07-03',
    title: 'Got a Task Assigned',
    description: 'You were assigned to the bug fix task for the login page.',
    user: 'Mayank',
  },
]

function Activity() {
  return (
    <div className="grid grid-cols-1 gap-4">
      {teamActivities.map((activity) => (
        <TeamActivityCard
          key={activity.id}
          icon={activity.icon}
          title={activity.title}
          description={activity.description}
          date={activity.date}
          user={activity.user}
        />
      ))}
    </div>
  )
}

export function TeamActivity() {
  return (
    <div>
      <Activity />
      {/* <UnderConstruction /> */}
    </div>
  )
}
