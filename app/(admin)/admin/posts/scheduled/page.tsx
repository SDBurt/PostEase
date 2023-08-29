
import { Post } from "@prisma/client"

import {
  getAllDraftPosts,
  getAllScheduledPosts,
} from "@/lib/db/actions"

import { getUserSchedules } from "@/lib/db/actions/schedules"
import ScheduleContainer from "@/components/admin/schedule/schedule-container"

export const metadata = {
  title: "Queued",
}

export default async function ScheduledPage() {
  const scheduledPosts: Post[] = await getAllScheduledPosts()
  const draftPosts: Post[] = await getAllDraftPosts()


  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const userSchedules = await getUserSchedules()

  console.log(timezone)

  return (
    <ScheduleContainer
      schedules={userSchedules}
      scheduledPosts={scheduledPosts}
      draftPosts={draftPosts}
      timezone={timezone}
    />
  )
}
