import { Post } from "@prisma/client"

import { getAllScheduledPosts, getUserSchedule } from "@/lib/db/actions"
import { PageShell } from "@/components/admin/layout/page-shell"
import { PageHeader } from "@/components/admin/page-header"
import ScheduleQueue from "@/components/admin/schedule/queue"
import { Schedule } from "@/types"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { ScheduleCreateButton } from "@/components/admin/schedule/create/button"
import { ScheduleEditButton } from "@/components/admin/schedule/edit/button"

export const metadata = {
  title: "Queued",
}


export default async function DashboardPage() {
  
  const posts: Post[] = await getAllScheduledPosts()
  
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const userSchedules = await getUserSchedule()
  
  let schedules = []

  let toRender = <ScheduleQueue timezone={timezone} posts={posts} schedules={schedules}/>

  if (!userSchedules) {
    toRender = (
      <EmptyPlaceholder>
        <EmptyPlaceholder.Icon name="post" />
        <EmptyPlaceholder.Title>No schedule created</EmptyPlaceholder.Title>
        <EmptyPlaceholder.Description>
          You don&apos;t have a schedule yet. Create one now!
        </EmptyPlaceholder.Description>
        <ScheduleCreateButton variant="outline" />
      </EmptyPlaceholder>
    )
  }

  if (userSchedules) {
    const jsonValue = userSchedules["schedule"]
    schedules = JSON.parse(jsonValue as string) as Schedule[] | []
  }

  console.log(schedules)

  return (
    <PageShell>
      <PageHeader heading="Scheduled Posts" text="Create and manage scheduled posts.">
        {!userSchedules ? <ScheduleCreateButton variant="outline" /> : <ScheduleEditButton variant="outline" />}
      </PageHeader>
      <div>
        {toRender}
      </div>
      
    </PageShell>
  )
}
