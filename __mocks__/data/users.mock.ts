import { TUser, TUsersSearchResponse } from '../../api/users/users.types'
import { sleep } from '../utils/common'

export type TMockUserProfileResponse = {
  message: string
  data: TUser
}

const mockUsers: TUser[] = [
  {
    id: '687544d3814217e020e3d03a',
    email: 'ankush.dharkar@gmail.com',
    name: 'Ankush Dharkar',
    picture: '/img/user-1.jpg',
  },
  {
    id: '68702893e331b8aa7a58ffe7',
    email: 'prakash.choudhary@gmail.com',
    name: 'Prakash Choudhary',
    picture: '/img/user-2.jpg',
  },
  {
    id: '68702ff8e331b8aa7a5833',
    email: 'tejas.t@gmail.com',
    name: 'Tejas T',
    picture: '/img/user-3.jpg',
  },
  {
    id: '68704332e331b8aa7a58ffff',
    email: 'yash@gmail.com',
    name: 'Yash',
    picture: '/img/user-4.jpg',
  },
  {
    id: '6870289de331b8aa7a58ffe8',
    email: 'vinit.khandal@gmail.com',
    name: 'Vinit Khandal',
    picture: '/img/user-5.jpg',
  },
]

export const MockUsersAPI = {
  getUserProfile: async (): Promise<TMockUserProfileResponse> => {
    await sleep()
    const currentUser = mockUsers[0] // Anuj Chhikara
    return {
      message: 'Current user details fetched successfully',
      data: currentUser,
    }
  },

  searchUsers: async (params?: {
    search?: string
    page?: number
    limit?: number
  }): Promise<{ data: TUsersSearchResponse }> => {
    await sleep()

    let filteredUsers = [...mockUsers]

    if (params?.search) {
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(params.search!.toLowerCase()) ||
          user.email?.toLowerCase().includes(params.search!.toLowerCase()),
      )
    }

    const page = params?.page || 1
    const limit = params?.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    return {
      data: {
        users: paginatedUsers,
        limit,
        page,
        total_count: filteredUsers.length,
      },
    }
  },
}
