'use client'

import Image from 'next/image'
import { useState } from 'react'

//Import Svg for icons
import { TTask } from '@/api/tasks/tasks.types'
import calendarIcon from '@/public/assets/calendar.svg'
import TagsIcon from '@/public/assets/priceTag.svg'
import AccountIcon from '@/public/assets/profile.svg'
import StatusIcon from '@/public/assets/status.svg'

type Props = {
  onAcknowledge: () => void
  initialData: TTask
  onClose: () => void
}

const Tabs: {
  [key: string]: string
} = {
  All: 'all',
  History: 'history',
  Comments: 'comments',
}

export function TaskDetails({ onAcknowledge, initialData, onClose }: Props) {
  const [activeTab, setActiveTab] = useState(Tabs.All)

  const { dueAt, tags, title, description, assignee, status } = initialData

  const properties = [
    {
      icon: calendarIcon,
      testId: 'dueAt',
      label: 'Due Date:',
      value: new Date(dueAt || '').toLocaleDateString('en-US'),
      alt: 'Due date icon',
    },
    {
      icon: AccountIcon,
      testId: 'assignee',
      label: 'Assignee:',
      value: assignee,
      alt: 'Assignee icon',
    },
    { icon: StatusIcon, testId: 'status', label: 'Status:', value: status, alt: 'Status icon' },
    { icon: TagsIcon, testId: 'tags', label: 'Tags:', value: tags, alt: 'Tags icon' },
  ]

  return (
    <div
      data-testid="task-details-1"
      className="absolute top-0 left-0 mt-auto h-full w-full overflow-hidden rounded-none border border-gray-200 bg-white shadow-xs shadow-gray-400 md:static md:max-w-2xl md:rounded-xl"
    >
      <div className="space-y-6 p-6">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-semibold text-indigo-600">{title}</h2>
          <div className="flex flex-row gap-2">
            <button
              onClick={onAcknowledge}
              data-testid="details-acknowledge-button"
              className="flex cursor-pointer flex-row items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:outline-hidden"
            >
              <span className="text-2xl text-white">+</span>
              <p>Acknowledge</p>
            </button>
            <button
              data-testid="details-close-button"
              className="flex w-fit flex-row items-center justify-center gap-2 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 focus:outline-hidden md:hidden"
              onClick={onClose}
            >
              X
            </button>
          </div>
        </div>

        <div className="no-scrollbar mb-6 max-h-40 overflow-y-scroll text-sm whitespace-pre-wrap text-gray-600">
          {description}
        </div>

        <hr className="mb-6" />

        <div className="mb-4 space-y-6">
          <h3 className="text-sm font-medium text-gray-900">Properties</h3>

          <div className="grid grid-cols-1 gap-4">
            {properties.map(({ icon, label, value, alt, testId }) => (
              <div key={label} className="flex items-center gap-2">
                <Image src={icon} alt={alt} width={15} height={15} />
                <span className="text-sm">{label}</span>
                <span data-testid={testId} className="text-sm text-gray-500">
                  {value?.toString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-6" />

        <div className="mt-4">
          <h3 className="mb-4 text-sm font-medium text-gray-900">Activity</h3>
          <div className="">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {Object.keys(Tabs).map((tab) => (
                <button
                  data-testid={Tabs[tab]}
                  key={tab}
                  onClick={() => setActiveTab(Tabs[tab])}
                  role="tab"
                  aria-selected={activeTab === Tabs[tab]}
                  className={`${
                    activeTab === Tabs[tab]
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } border-b-2 px-1 py-4 text-sm font-medium whitespace-nowrap`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>
          <div className="mt-4">
            <div className="h-fit overflow-hidden rounded-xl bg-[#F5F5FF]">
              <textarea
                placeholder="Leave a comment..."
                className="h-full w-full border-none bg-[#F5F5FF] p-2 text-sm text-indigo-600 placeholder-gray-400 focus:outline-hidden"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
