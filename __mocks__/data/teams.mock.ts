import { GetTeamsDto, TeamDto, TTeam } from '../../api/teams/teams.type'
import { sleep } from '../utils/common'

export type TMockTeamsResponse = GetTeamsDto

export const mockTeams: TTeam[] = [
  {
    id: '687b4aa1aaffdd8afd042c61',
    name: 'Real Dev Squad Team',
    description: 'RDS Main team - Core development and innovation hub',
    poc_id: '687544d3814217e020e3d03a',
    invite_code: 'RDS_MAIN_2024',
    created_by: '687544d3814217e020e3d03a',
    updated_by: '687544d3814217e020e3d03a',
    created_at: '2025-07-19T07:34:57.898349Z',
    updated_at: '2025-07-19T07:34:57.898374Z',
  },
  {
    id: '687a1d551103a3d1573071d7',
    name: 'Backend Infra Team',
    description: 'Handles server architecture, database design, and API development',
    poc_id: '68704332e331b8aa7a58ffff',
    invite_code: 'BACKEND_INFRA_2024',
    created_by: '68702893e331b8aa7a58ffe7',
    updated_by: '68702893e331b8aa7a58ffe7',
    created_at: '2025-07-18T10:09:25.578030Z',
    updated_at: '2025-07-18T10:09:25.578057Z',
  },
  {
    id: '687aafead8c31c0fc8ffe2db',
    name: 'DevOps Team',
    description: 'Manages CI/CD pipelines, cloud infrastructure, and system monitoring',
    poc_id: '68702ff8e331b8aa7a58fff3',
    invite_code: 'DEVOPS_2024',
    created_by: '68702ff8e331b8aa7a58fff3',
    updated_by: '68702ff8e331b8aa7a58fff3',
    created_at: '2025-07-18T20:34:50.267377Z',
    updated_at: '2025-07-18T20:34:50.267401Z',
  },
  {
    id: '687ab02fd8c31c0fc8ffe2e1',
    name: 'QA Team',
    description: 'Ensures code quality through testing, code reviews, and performance optimization',
    poc_id: '68703630e331b8aa7a58fff9',
    invite_code: 'QA_2024',
    created_by: '687035f3e331b8aa7a58fff8',
    updated_by: '687035f3e331b8aa7a58fff8',
    created_at: '2025-07-18T20:35:59.194828Z',
    updated_at: '2025-07-18T20:35:59.194855Z',
  },
  {
    id: '687ab1bbd8c31c0fc8ffe301',
    name: 'Product Management Team',
    description: 'Drives product strategy, feature planning, and user experience design',
    poc_id: '68702ff8e331b8aa7a58fff3',
    invite_code: 'PRODUCT_2024',
    created_by: '68702ff8e331b8aa7a58fff3',
    updated_by: '68702ff8e331b8aa7a58fff3',
    created_at: '2025-07-18T20:42:35.591620Z',
    updated_at: '2025-07-18T20:42:35.591644Z',
  },
]

export const mockTeamMembers = {
  '687b4aa1aaffdd8afd042c61': [
    {
      id: '68704332e331b8aa7a58ffff',
      name: 'Yash',
      tasksAssignedCount: 12,
      addedOn: '2025-07-19T07:34:57.903392Z',
    },
    {
      id: '686d8210e331b8aa7a58fafe',
      name: 'Prakash Choudhary',
      tasksAssignedCount: 8,
      addedOn: '2025-07-19T07:34:57.903392Z',
    },
    {
      id: '68702893e331b8aa7a58ffe7',
      name: 'Tejas T',
      tasksAssignedCount: 15,
      addedOn: '2025-07-19T07:34:57.903392Z',
    },
    {
      id: '6870289de331b8aa7a58ffe8',
      name: 'Vinit Khandal',
      tasksAssignedCount: 6,
      addedOn: '2025-07-19T07:34:57.903392Z',
    },
    {
      id: '687035f3e331b8aa7a58fff8',
      name: 'Hariom Vashista',
      tasksAssignedCount: 9,
      addedOn: '2025-07-19T07:34:57.903392Z',
    },
    {
      id: '687544d3814217e020e3d03a',
      name: 'Ankush Dharkar',
      tasksAssignedCount: 18,
      addedOn: '2025-07-19T07:34:57.903392Z',
    },
    {
      id: '68702ff8e331b8aa7a58fff3',
      name: 'Anuj Chhikara',
      tasksAssignedCount: 14,
      addedOn: '2025-07-19T07:35:27.912257Z',
    },
    {
      id: '6872b7b9814217e020e3cc40',
      name: 'Suvidh Kaushik',
      tasksAssignedCount: 7,
      addedOn: '2025-07-19T07:35:37.954001Z',
    },
    {
      id: '68763311d460e707c18727f4',
      name: 'Vanya Mohanka',
      tasksAssignedCount: 11,
      addedOn: '2025-07-19T07:37:38.040552Z',
    },
    {
      id: '6875653d814217e020e3d069',
      name: 'Mayank Bansal',
      tasksAssignedCount: 5,
      addedOn: '2025-07-20T19:07:57.852332Z',
    },
    {
      id: '68702f9be331b8aa7a58fff2',
      name: 'Rishi Chaubey',
      tasksAssignedCount: 13,
      addedOn: '2025-07-20T19:08:18.953760Z',
    },
    {
      id: '68716185814217e020e3ca08',
      name: 'Achintya Chatterjee',
      tasksAssignedCount: 10,
      addedOn: '2025-07-20T20:24:59.651556Z',
    },
    {
      id: '687b62bb64a4582fc3667c9e',
      name: 'Tanu Pandey',
      tasksAssignedCount: 4,
      addedOn: '2025-07-24T10:04:51.398978Z',
    },
    {
      id: '687b1fdd64a4582fc3667c7d',
      name: 'Priya Choudhary',
      tasksAssignedCount: 6,
      addedOn: '2025-07-24T10:04:51.398978Z',
    },
    {
      id: '687b748664a4582fc3667cb4',
      name: 'Kamal Gandhi',
      tasksAssignedCount: 8,
      addedOn: '2025-07-24T10:04:51.398978Z',
    },
    {
      id: '68715e0ae331b8aa7a59025e',
      name: 'Lakshay Manchanda',
      tasksAssignedCount: 3,
      addedOn: '2025-07-26T20:44:13.456559Z',
    },
    {
      id: '687b737264a4582fc3667cb3',
      name: 'Archana Gupta',
      tasksAssignedCount: 7,
      addedOn: '2025-07-30T12:37:17.887201Z',
    },
    {
      id: '68715248e331b8aa7a59022d',
      name: 'Shobhan Sundar Goutam',
      tasksAssignedCount: 5,
      addedOn: '2025-07-31T10:41:04.070422Z',
    },
  ],
  '687a1d551103a3d1573071d7': [
    {
      id: '68702893e331b8aa7a58ffe7',
      name: 'Tejas',
      tasksAssignedCount: 15,
      addedOn: '2025-07-18T10:09:25.578030Z',
    },
    {
      id: '6870289de331b8aa7a58ffe8',
      name: 'Vinit Khandal',
      tasksAssignedCount: 6,
      addedOn: '2025-07-18T10:09:25.578030Z',
    },
    {
      id: '68716185814217e020e3ca08',
      name: 'Achintya Chatterjee',
      tasksAssignedCount: 10,
      addedOn: '2025-07-18T10:09:25.578030Z',
    },
  ],
  '687aafead8c31c0fc8ffe2db': [
    {
      id: '68702ff8e331b8aa7a58fff3',
      name: 'Prakash Choudhary',
      tasksAssignedCount: 14,
      addedOn: '2025-07-18T20:34:50.267377Z',
    },
  ],
  '687ab02fd8c31c0fc8ffe2e1': [
    {
      id: '687035f3e331b8aa7a58fff8',
      name: 'Hariom Vashista',
      tasksAssignedCount: 9,
      addedOn: '2025-07-18T20:35:59.194828Z',
    },
  ],
  '687ab1bbd8c31c0fc8ffe301': [
    {
      id: '687544d3814217e020e3d03a',
      name: 'Ankush Dharkar',
      tasksAssignedCount: 18,
      addedOn: '2025-07-18T20:42:35.591620Z',
    },
    {
      id: '68763311d460e707c18727f4',
      name: 'Vanya Mohanka',
      tasksAssignedCount: 11,
      addedOn: '2025-07-18T20:42:35.591620Z',
    },
  ],
}

export const MockTeamsAPI = {
  getAllTeams: async (): Promise<TMockTeamsResponse> => {
    await sleep()
    return {
      teams: mockTeams,
      total: mockTeams.length,
    }
  },

  getTeamById: async (teamId: string, includeMembers: boolean = false): Promise<TeamDto | null> => {
    await sleep()
    const team = mockTeams.find((t) => t.id === teamId)

    if (!team) {
      return null
    }
    if (!includeMembers) {
      return {
        ...team,
        users: null,
      }
    }

    return {
      ...team,
      poc_id: team.poc_id === null ? undefined : team.poc_id,
      users: mockTeamMembers[teamId as keyof typeof mockTeamMembers] || null,
    }
  },

  createTeam: async (teamData: {
    name: string
    description?: string
    member_ids: string[]
    poc_id: string | null
  }): Promise<TTeam> => {
    await sleep()
    const newTeam: TTeam = {
      id: `team_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: teamData.name,
      description: teamData.description || null,
      poc_id: teamData.poc_id ?? undefined,
      invite_code: `${teamData.name.toUpperCase().replace(/\s+/g, '_')}_${Date.now()}`,
      created_by: '68702ff8e331b8aa7a58fff3', // Current user
      updated_by: '68702ff8e331b8aa7a58fff3',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    mockTeams.push(newTeam)
    return newTeam
  },
}
