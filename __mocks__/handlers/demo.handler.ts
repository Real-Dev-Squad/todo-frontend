import { http, HttpResponse } from 'msw'

export const demoHandler = [
  http.get('https://services.realdevsquad.com/staging-todo/api/hello', () => {
    return HttpResponse.json({
      id: 1,
      message: 'msw working successfully!',
    })
  }),
]
