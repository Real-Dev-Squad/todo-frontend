'use client'

// import { UnderConstruction } from '../UnderConstruction'
import { TeamsApi } from '@/api/teams/teams.api'
import { getActivityUIData } from '@/lib/team-utils'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { TeamActivityCard } from './TeamActivityCard'

function Activity() {
  const { teamId } = useParams<{ teamId: string }>()
  const { data } = useQuery({
    queryKey: TeamsApi.getTeamActivities.key({ teamId }),
    queryFn: () => TeamsApi.getTeamActivities.fn({ teamId }),
  })
  return (
    <div className="grid grid-cols-1 gap-4">
      {data?.timeline.map((activity, index) => {
        const uiData = getActivityUIData(activity)
        if (!uiData) {
          return null
        }
        return (
          <TeamActivityCard
            Icon={uiData.icon}
            key={`${activity.action}-${index}`}
            title={uiData.title}
            description={uiData.description}
            date={uiData.date}
          />
        )
      })}
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
