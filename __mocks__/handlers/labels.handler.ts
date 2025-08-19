import { http, HttpResponse } from 'msw'
import { MockLabelsAPI } from '../data/labels.mock'
import { getApiUrl } from '../utils/common'

export const labelsHandlers = [
  http.get(getApiUrl('/labels'), async () => {
    try {
      const labels = await MockLabelsAPI.getAllLabels()
      return HttpResponse.json(labels)
    } catch (error) {
      return HttpResponse.json({ message: 'Failed to fetch labels', error: error }, { status: 500 })
    }
  }),
]
