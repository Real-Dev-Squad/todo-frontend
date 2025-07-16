import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { appConfig } from '@/config/app-config'
import {
  Calendar,
  CheckCircle,
  ChevronDown,
  Circle,
  Clock,
  Filter,
  Home,
  Inbox,
  MoreHorizontal,
  Plus,
  Search,
  Target,
  TrendingUp,
  Zap,
} from 'lucide-react'

export function DashboardPreview() {
  const projects = [
    { name: 'Website Redesign', tasks: 12, completed: 8, color: 'bg-blue-500' },
    { name: 'Mobile App', tasks: 8, completed: 3, color: 'bg-green-500' },
    { name: 'Marketing Campaign', tasks: 6, completed: 6, color: 'bg-purple-500' },
  ]

  const todayTasks = [
    {
      id: 1,
      title: 'Review design mockups',
      project: 'Website Redesign',
      priority: 'high',
      completed: true,
      assignee: 'SC',
      time: '2h ago',
    },
    {
      id: 2,
      title: 'Update API documentation',
      project: 'Mobile App',
      priority: 'medium',
      completed: true,
      assignee: 'MR',
      time: '4h ago',
    },
    {
      id: 3,
      title: 'Prepare client presentation',
      project: 'Website Redesign',
      priority: 'high',
      completed: false,
      assignee: 'You',
      dueTime: 'Due in 2h',
    },
    {
      id: 4,
      title: 'Code review for authentication',
      project: 'Mobile App',
      priority: 'medium',
      completed: false,
      assignee: 'EK',
      dueTime: 'Due today',
    },
    {
      id: 5,
      title: 'Weekly team sync preparation',
      project: null,
      priority: 'low',
      completed: false,
      assignee: 'You',
      dueTime: 'Tomorrow',
    },
  ]

  const upcomingTasks = [
    { title: 'User testing session', date: 'Tomorrow', project: 'Website Redesign' },
    { title: 'Deploy to staging', date: 'Thu', project: 'Mobile App' },
    { title: 'Content review', date: 'Fri', project: 'Marketing Campaign' },
  ]

  return (
    <div className="flex h-[600px] w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-gray-50">
        <div className="p-4">
          <div className="mb-6 flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-black">
              <Zap className="h-4 w-4 text-white" />
            </div>
            <span className="font-medium text-black">{appConfig.appName}</span>
          </div>

          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center space-x-3 rounded-md bg-white px-3 py-2 text-sm font-medium text-black shadow-sm"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-white hover:text-black"
            >
              <Inbox className="h-4 w-4" />
              <span>Inbox</span>
              <span className="ml-auto rounded-full bg-gray-200 px-2 py-0.5 text-xs">3</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-white hover:text-black"
            >
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-white hover:text-black"
            >
              <Target className="h-4 w-4" />
              <span>Goals</span>
            </a>
          </nav>

          <div className="mt-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-medium tracking-wide text-gray-500 uppercase">
                Projects
              </h3>
              <Button size="sm" variant="ghost" className="h-5 w-5 p-0">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="space-y-1">
              {projects.map((project, index) => (
                <a
                  key={index}
                  href="#"
                  className="group flex items-center space-x-3 rounded-md px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-white hover:text-black"
                >
                  <div className={`h-2 w-2 rounded-full ${project.color}`}></div>
                  <span className="flex-1 truncate">{project.name}</span>
                  <span className="text-xs text-gray-400 group-hover:text-gray-600">
                    {project.completed}/{project.tasks}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-medium text-black">Good morning, John</h1>
              <p className="text-sm text-gray-600">You have 3 tasks due today</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="w-64 rounded-md border border-gray-200 bg-gray-50 py-2 pr-4 pl-10 text-sm transition-colors focus:border-gray-300 focus:bg-white focus:outline-none"
                />
              </div>
              <Button size="sm" variant="ghost">
                <Filter className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-3 gap-6 p-6">
            {/* Today's Tasks */}
            <div className="col-span-2">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-black">Today</h2>
                <Button size="sm" variant="ghost">
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {todayTasks.map((task) => (
                  <div
                    key={task.id}
                    className="group flex items-center space-x-3 rounded-md border border-gray-200 bg-white p-3 transition-colors hover:border-gray-300"
                  >
                    <button className="flex-shrink-0">
                      {task.completed ? (
                        <CheckCircle className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-300 transition-colors hover:text-gray-400" />
                      )}
                    </button>

                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-medium ${task.completed ? 'text-gray-500 line-through' : 'text-black'}`}
                      >
                        {task.title}
                      </p>
                      {task.project && <p className="text-xs text-gray-500">{task.project}</p>}
                    </div>

                    <div className="flex items-center space-x-2">
                      {task.priority === 'high' && (
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          <span className="text-xs text-red-600">High</span>
                        </div>
                      )}
                      {task.priority === 'medium' && (
                        <div className="flex items-center space-x-1">
                          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                          <span className="text-xs text-yellow-600">Medium</span>
                        </div>
                      )}

                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        {task.completed ? (
                          <span>{task.time}</span>
                        ) : (
                          <>
                            <Clock className="h-3 w-3" />
                            <span>{task.dueTime}</span>
                          </>
                        )}
                      </div>

                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="bg-gray-100 text-xs">
                          {task.assignee === 'You' ? 'JD' : task.assignee}
                        </AvatarFallback>
                      </Avatar>

                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}

                <button className="flex w-full items-center space-x-2 rounded-md border border-dashed border-gray-300 p-3 text-sm text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-600">
                  <Plus className="h-4 w-4" />
                  <span>Add task</span>
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="mb-3 text-sm font-medium text-black">Today's Progress</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Completed</span>
                    <span className="font-medium text-black">2/5</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                    <div className="h-full w-2/5 rounded-full bg-black"></div>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <TrendingUp className="h-3 w-3" />
                    <span>40% completion rate</span>
                  </div>
                </div>
              </div>

              {/* Upcoming */}
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="mb-3 text-sm font-medium text-black">Upcoming</h3>
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="mt-1 h-2 w-2 rounded-full bg-gray-300"></div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm text-black">{task.title}</p>
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <span>{task.date}</span>
                          {task.project && (
                            <>
                              <span>•</span>
                              <span>{task.project}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Activity */}
              <div className="rounded-lg border border-gray-200 bg-white p-4">
                <h3 className="mb-3 text-sm font-medium text-black">Team Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-gray-100 text-xs">SC</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-600">
                        <span className="font-medium text-black">Sarah</span> completed{' '}
                        <span className="font-medium">Review design mockups</span>
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Avatar className="h-6 w-6">
                      <AvatarFallback className="bg-gray-100 text-xs">MR</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-gray-600">
                        <span className="font-medium text-black">Marcus</span> added{' '}
                        <span className="font-medium">3 new tasks</span> to Mobile App
                      </p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
