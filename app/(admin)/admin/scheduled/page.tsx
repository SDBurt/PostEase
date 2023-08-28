import { ScheduleType } from "@/types"
import { Post } from "@prisma/client"

import {
  getAllDraftPosts,
  getAllScheduledPosts,
  getUserSchedule,
} from "@/lib/db/actions"
import { Skeleton } from "@/components/ui/skeleton"
import { PageShell } from "@/components/admin/layout/page-shell"
import { PageHeader } from "@/components/admin/page-header"
import { ScheduleCreateButton } from "@/components/admin/schedule/create/button"
import { ScheduleEditButton } from "@/components/admin/schedule/edit/button"
import ScheduleQueue from "@/components/admin/schedule/queue"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export const metadata = {
  title: "Queued",
}

export default async function ScheduledPage() {
  const scheduledPosts: Post[] = await getAllScheduledPosts()
  const draftPosts: Post[] = await getAllDraftPosts()

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone

  const userSchedules = await getUserSchedule()

  let toRender = <Skeleton className="h-[38px] w-[90px]" />

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
  } else {
    const schedules = JSON.parse(userSchedules["schedule"] as string) as
      | ScheduleType[]
      | []
    toRender = (
      <ScheduleQueue
        timezone={timezone}
        scheduledPosts={scheduledPosts}
        draftPosts={draftPosts}
        schedules={schedules}
      />
    )
  }

  return (
    <PageShell>
      <PageHeader
        heading="Scheduled"
        text="manage your custom schedule"
      >
        {!userSchedules ? (
          <ScheduleCreateButton variant="outline" />
        ) : (
          <ScheduleEditButton variant="outline" schedule={userSchedules} />
        )}
      </PageHeader>
      <div>{toRender}</div>
    </PageShell>
  )
}
