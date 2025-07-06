import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { DashboardTasksTableTabs as TabsConstants } from "./constants"
import { DashboardTasksTable } from "./DashboardTasksTable"

export function DashboardTasksTableTabs() {
  return (
    <div className="">
      <Tabs defaultValue={TabsConstants.All}>
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
