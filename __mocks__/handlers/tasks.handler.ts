import { http, HttpResponse } from 'msw'
import { MockTasksAPI } from '../data/tasks.mock'
import { MockWatchlistAPI } from '../data/watchlist.mock'
import { getApiUrl } from '../utils/common'

export const tasksHandlers = [
  http.get(getApiUrl('/tasks'), async ({ request }) => {
    try {
      const url = new URL(request.url)
      const status = url.searchParams.get('status') || undefined
      const teamId = url.searchParams.get('teamId') || undefined
      const page = parseInt(url.searchParams.get('page') || '1')
      const limit = parseInt(url.searchParams.get('limit') || '20')

      const tasks = await MockTasksAPI.getAllTasks({ status, teamId, page, limit })
      return HttpResponse.json(tasks)
    } catch (error) {
      console.error('Error fetching tasks:', error)
      return new HttpResponse(null, { status: 500 })
    }
  }),

  http.post(getApiUrl('/tasks'), async ({ request }) => {
    try {
      const body = (await request.json()) as {
        title: string
        description?: string
        priority?: string
        status?: string
        labels?: string[]
        dueAt?: string
        assignee_id: string
        timezone: string
        user_type: string
      }
      const newTask = await MockTasksAPI.createTask(body)
      return HttpResponse.json({ data: newTask })
    } catch (error) {
      console.error('Error creating task:', error)
      return new HttpResponse(null, { status: 500 })
    }
  }),

  http.patch(getApiUrl('/tasks/:id/update'), async ({ params, request }) => {
    try {
      const { id } = params
      const body = (await request.json()) as Partial<any>

      const updatedTask = await MockTasksAPI.updateTask(id as string, body)
      return HttpResponse.json(updatedTask)
    } catch (error) {
      console.error('Error updating task:', error)
      return new HttpResponse(null, { status: 500 })
    }
  }),

  http.patch(getApiUrl('/tasks/:taskId'), async ({ params, request }) => {
    try {
      const { taskId } = params
      const url = new URL(request.url)
      const action = url.searchParams.get('action')

      if (action !== 'defer') {
        return new HttpResponse(null, { status: 400 })
      }

      const body = (await request.json()) as { deferredTill: string }
      const deferredTask = await MockTasksAPI.deferTask(taskId as string, body.deferredTill)
      return HttpResponse.json(deferredTask)
    } catch (error) {
      console.error('Error deferring task:', error)
      return new HttpResponse(null, { status: 500 })
    }
  }),

  http.patch(getApiUrl('/task-assignments/:task_id'), async ({ params, request }) => {
    try {
      const { task_id } = params
      const body = await request.json()
      return new HttpResponse(null, { status: 200 })
    } catch (error) {
      console.error('Error reassigning task:', error)
      return new HttpResponse(null, { status: 500 })
    }
  }),

  http.get(getApiUrl('/watchlist/tasks'), async () => {
    try {
      const watchlistTasks = await MockWatchlistAPI.getWatchlistTasks()
      return HttpResponse.json(watchlistTasks)
    } catch (error) {
      console.error('Error fetching watchlist tasks:', error)
      return new HttpResponse(null, { status: 500 })
    }
  }),

  http.post(getApiUrl('/watchlist/tasks'), async ({ request }) => {
    try {
      const body = (await request.json()) as { taskId: string }
      await MockWatchlistAPI.addTaskToWatchlist(body.taskId)
      return new HttpResponse(null, { status: 201 })
    } catch (error) {
      console.error('Error adding task to watchlist:', error)
      return new HttpResponse(null, { status: 500 })
    }
  }),

  http.patch(getApiUrl('/watchlist/tasks/:taskId'), async ({ params, request }) => {
    try {
      const { taskId } = params
      const body = (await request.json()) as { isActive: boolean }

      await MockWatchlistAPI.toggleWatchlistStatus(taskId as string, body.isActive)
      return new HttpResponse(null, { status: 200 })
    } catch (error) {
      console.error('Error toggling watchlist status:', error)
      return new HttpResponse(null, { status: 500 })
    }
  }),
]
