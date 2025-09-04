'use client'

// import { UnderConstruction } from '../UnderConstruction'
import { TeamsApi } from '@/api/teams/teams.api'
import { getActivityUIData } from '@/lib/team-utils'
import { useQuery } from '@tanstack/react-query'
import { useParams } from '@tanstack/react-router'
import { CommonPageError } from '../common-page-error'
import { Shimmer } from '../Shimmer'
import { TeamActivityCard } from './TeamActivityCard'

function Activity() {
  const { teamId } = useParams({ from: '/_internal/teams/$teamId' })
  const { data, isLoading, isError } = useQuery({
    queryKey: TeamsApi.getTeamActivities.key({ teamId }),
    queryFn: () => TeamsApi.getTeamActivities.fn({ teamId }),
  })

  if (isLoading) {
    return (
      <>
        {new Array(5).fill(0).map((_, index) => (
          <Shimmer key={index} />
        ))}
      </>
    )
  }

  if (isError) {
    return <CommonPageError />
  }

  if (!data || !data.timeline || data.timeline.length === 0) {
    return <div>No activities found</div>
  }

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
