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

export function DashboardTasksTableTabs() {
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
          <TabsTrigger value={TabsConstants.All}>{TabsConstants.All}</TabsTrigger>
          <TabsTrigger value={TabsConstants.WatchList}>{TabsConstants.WatchList}</TabsTrigger>
        </TabsList>
        <TabsContent value={TabsConstants.All}>
            <DashboardTasksTable type={TabsConstants.All} />
        </TabsContent>
        <TabsContent value={TabsConstants.WatchList}>
            <DashboardTasksTable type={TabsConstants.WatchList} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
