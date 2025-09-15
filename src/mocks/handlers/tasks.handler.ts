import {
  CrateTaskReqDto,
  DeferTaskReqDto,
  ToggleWatchListStatusDto,
  TTask,
} from '@/api/tasks/tasks.types'
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
      return HttpResponse.json({ message: 'Failed to fetch tasks', error: error }, { status: 500 })
    }
  }),

  http.post(getApiUrl('/tasks'), async ({ request }) => {
    try {
      const body = (await request.json()) as CrateTaskReqDto
      const newTask = await MockTasksAPI.createTask(body)
      return HttpResponse.json({ data: newTask })
    } catch (error) {
      return HttpResponse.json({ message: 'Failed to create task', error: error }, { status: 500 })
    }
  }),

  http.patch(getApiUrl('/tasks/:id/update'), async ({ params, request }) => {
    try {
      const { id } = params
      const body = (await request.json()) as Partial<TTask>

      const updatedTask = await MockTasksAPI.updateTask(id as string, body)
      return HttpResponse.json(updatedTask)
    } catch (error) {
      return HttpResponse.json({ message: 'Failed to update task', error: error }, { status: 500 })
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

      const body = (await request.json()) as DeferTaskReqDto
      const deferredTask = await MockTasksAPI.deferTask(taskId as string, body.deferredTill)
      return HttpResponse.json(deferredTask)
    } catch (error) {
      return HttpResponse.json({ message: 'Failed to defer task', error: error }, { status: 500 })
    }
  }),

  http.patch(getApiUrl('/task-assignments/:task_id'), async () => {
    try {
      return new HttpResponse(null, { status: 200 })
    } catch (error) {
      return HttpResponse.json(
        { message: 'Failed to reassign task', error: error },
        { status: 500 },
      )
    }
  }),

  http.get(getApiUrl('/watchlist/tasks'), async () => {
    try {
      const watchlistTasks = await MockWatchlistAPI.getWatchlistTasks()
      return HttpResponse.json(watchlistTasks)
    } catch (error) {
      return HttpResponse.json(
        { message: 'Failed to fetch watchlist tasks', error: error },
        { status: 500 },
      )
    }
  }),

  http.post(getApiUrl('/watchlist/tasks'), async () => {
    try {
      await MockWatchlistAPI.addTaskToWatchlist()
      return new HttpResponse(null, { status: 201 })
    } catch (error) {
      return HttpResponse.json(
        { message: 'Failed to add task to watchlist', error: error },
        { status: 500 },
      )
    }
  }),

  http.patch(getApiUrl('/watchlist/tasks/:taskId'), async ({ params, request }) => {
    try {
      const { taskId } = params
      const body = (await request.json()) as ToggleWatchListStatusDto

      await MockWatchlistAPI.toggleWatchlistStatus(taskId as string, body.isActive)
      return new HttpResponse(null, { status: 200 })
    } catch (error) {
      return HttpResponse.json(
        { message: 'Failed to toggle watchlist status', error: error },
        { status: 500 },
      )
    }
  }),
]
