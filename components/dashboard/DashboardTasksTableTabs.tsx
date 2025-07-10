"use client"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { DashboardTasksTableTabs as TabsConstants } from "./constants"
import { DashboardTasksTable } from "./DashboardTasksTable"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Task } from "@/app/types/tasks"

export function DashboardTasksTableTabs({ tasks }: { tasks: Task[] }) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentTab = searchParams.get('tab') || TabsConstants.All
  
  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('tab', value)
    router.push(`${pathname}?${params.toString()}`)
  }
  
  return (
    <div className="">

      <Tabs value={currentTab} onValueChange={handleTabChange}>
        <TabsList>
          <TabsTrigger value={TabsConstants.All} className="cursor-pointer">{TabsConstants.All}</TabsTrigger>
          <TabsTrigger value={TabsConstants.WatchList} className="cursor-pointer">{TabsConstants.WatchList}</TabsTrigger>
        </TabsList>
        <TabsContent value={TabsConstants.All}>
            <DashboardTasksTable type={TabsConstants.All} tasks={tasks} />
        </TabsContent>
        <TabsContent value={TabsConstants.WatchList}>
            <DashboardTasksTable type={TabsConstants.WatchList} tasks={tasks} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
