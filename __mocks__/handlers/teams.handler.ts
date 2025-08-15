import { http, HttpResponse } from 'msw'
import { MockTeamsAPI } from '../data/teams.mock'
import { getApiUrl } from '../utils/common'

export const teamsHandlers = [
  http.get(getApiUrl('/teams'), async () => {
    try {
      const teams = await MockTeamsAPI.getAllTeams()
      return HttpResponse.json(teams)
    } catch (error) {
      console.error('Error fetching teams:', error)
      return new HttpResponse(null, { status: 500 })
    }
  }),

  http.get(getApiUrl('/teams/:teamId'), async ({ params, request }) => {
    try {
      const { teamId } = params
      const url = new URL(request.url)
      const includeMembers = url.searchParams.get('member') === 'true'

      const team = await MockTeamsAPI.getTeamById(teamId as string, includeMembers)

      if (!team) {
        return new HttpResponse(null, { status: 404 })
      }

      return HttpResponse.json(team)
    } catch (error) {
      console.error('Error fetching team by ID:', error)
      return new HttpResponse(null, { status: 500 })
    }
  }),

  http.post(getApiUrl('/teams'), async ({ request }) => {
    try {
      const body = (await request.json()) as {
        name: string
        description?: string
        member_ids: string[]
        poc_id: string | null
      }
      const newTeam = await MockTeamsAPI.createTeam(body)
      return HttpResponse.json(newTeam)
    } catch (error) {
      console.error('Error creating team:', error)
      return new HttpResponse(null, { status: 500 })
    }
  }),

  http.post(getApiUrl('/teams/:teamId/members'), async ({ params, request }) => {
    try {
      const { teamId } = params
      const body = await request.json()
      return HttpResponse.json({ success: true })
    } catch (error) {
      console.error('Error adding members to team:', error)
      return new HttpResponse(null, { status: 500 })
    }
  }),

  http.post(getApiUrl('/teams/join-by-invite'), async ({ request }) => {
    try {
      const body = await request.json()
      return HttpResponse.json({ success: true })
    } catch (error) {
      console.error('Error joining team by invite:', error)
      return new HttpResponse(null, { status: 500 })
    }
  }),

  http.get(getApiUrl('/teams/:teamId/activity-timeline'), async ({ params }) => {
    try {
      const { teamId } = params

      const activities = {
        timeline: [
          {
            timestamp: '2025-08-13T10:00:00Z',
            team_name: 'Real Dev Squad Team',
            action: 'team_created',
            performed_by_name: 'Ankush Dharkar',
          },
          {
            timestamp: '2025-08-13T10:30:00Z',
            team_name: 'Real Dev Squad Team',
            action: 'assigned_to_team',
            task_title: 'Figure out performance issues in deployments',
            performed_by_name: 'Ankush Dharkar',
          },
        ],
      }

      return HttpResponse.json(activities)
    } catch (error) {
      console.error('Error fetching team activities:', error)
      return new HttpResponse(null, { status: 500 })
    }
  }),
]
