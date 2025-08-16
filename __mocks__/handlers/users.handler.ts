import { http, HttpResponse } from 'msw'
import { MockUsersAPI } from '../data/users.mock'
import { getApiUrl } from '../utils/common'

export const usersHandlers = [
  http.get(getApiUrl('/users'), async ({ request }) => {
    try {
      const url = new URL(request.url)
      const profile = url.searchParams.get('profile')

      if (profile === 'true') {
        try {
          const userProfile = await MockUsersAPI.getUserProfile()
          return HttpResponse.json(userProfile)
        } catch (error) {
          return HttpResponse.json(
            { message: 'Failed to fetch user profile', error: error },
            { status: 500 },
          )
        }
      }
      const search = url.searchParams.get('search') || undefined
      const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'))
      const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') || '10')))

      const users = await MockUsersAPI.searchUsers({ search, page, limit })
      return HttpResponse.json(users)
    } catch (error) {
      return HttpResponse.json({ message: 'Failed to fetch users', error: error }, { status: 500 })
    }
  }),
]
