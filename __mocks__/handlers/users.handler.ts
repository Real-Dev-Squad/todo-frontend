import { http, HttpResponse } from 'msw'
import { MockUsersAPI } from '../data/users.mock'
import { getApiUrl } from '../utils/common'

export const usersHandlers = [
  http.get(getApiUrl('/users'), async ({ request }) => {
    try {
      const url = new URL(request.url)
      const profile = url.searchParams.get('profile')

      if (profile === 'true') {
        const userProfile = await MockUsersAPI.getUserProfile()
        return HttpResponse.json(userProfile)
      }
      const search = url.searchParams.get('search') || undefined
      const page = parseInt(url.searchParams.get('page') || '1')
      const limit = parseInt(url.searchParams.get('limit') || '10')

      const users = await MockUsersAPI.searchUsers({ search, page, limit })
      return HttpResponse.json(users)
    } catch (error) {
      console.error('Error fetching users:', error)
      return new HttpResponse(null, { status: 500 })
    }
  }),
]
