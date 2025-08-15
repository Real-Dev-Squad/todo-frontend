import { http, HttpResponse } from 'msw'
import { MockLabelsAPI } from '../data/labels.mock'
import { getApiUrl } from '../utils/common'

export const labelsHandlers = [
  http.get(getApiUrl('/labels'), async () => {
    try {
      const labels = await MockLabelsAPI.getAllLabels()
      return HttpResponse.json(labels)
    } catch (error) {
      console.error('Error fetching labels:', error)
      return new HttpResponse(null, { status: 500 })
    }
  }),
]
