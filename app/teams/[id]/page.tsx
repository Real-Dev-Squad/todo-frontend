'use client'
import { TeamActivity } from '@/components/teams/TeamActivity'
import { TeamMembers } from '@/components/teams/TeamMember'
import TeamSearch from '@/components/teams/TeamSearch'
import TeamTask from '@/components/teams/TeamTask'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'

const tabs = [
  {
    name: 'Tasks',
    value: 'tasks',
    content: <TeamTask />,
  },
  {
    name: 'Activities',
    value: 'activities',
    content: <TeamActivity />,
  },
  {
    name: 'Members',
    value: 'members',
    content: <TeamMembers />,
  },
]
export default function TabsUnderlinedDemo() {
  const [activeTab, setActiveTab] = useState(tabs[0].value)

  return (
    <div className="flex pr-12">
      <Tabs
        defaultValue={tabs[0].value}
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full px-12"
      >
        <TabsList className="bg-background w-full justify-start">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="bg-background data-[state=active]:border-primary mr-6 h-full rounded-none border-b-2 border-transparent px-0 data-[state=active]:shadow-none"
            >
              <p className="text-left text-lg">{tab.name}</p>
            </TabsTrigger>
          ))}
        </TabsList>
        <TeamSearch activeTab={activeTab} />

        {tabs.map((tab) => (
          <TabsContent key={tab.value} value={tab.value} className="mt-4">
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
