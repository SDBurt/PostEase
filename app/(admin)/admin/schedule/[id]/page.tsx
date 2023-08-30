import { Post, Schedule } from "@prisma/client"
import dayjs from "dayjs"

import { getAllPosts } from "@/lib/db/actions"
import { PageShell } from "@/components/admin/layout/page-shell"
import { PageHeader } from "@/components/admin/page-header"
import { PostCreateButton } from "@/components/admin/posts/create/button"
import { PostOperations } from "@/components/admin/posts/post-operations"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { getUserSchedule, getUserSchedules } from "@/lib/db/actions/schedules"
import ScheduleItem from "@/components/admin/schedule/schedule-item"
import { ScheduleOperations } from "@/components/admin/schedule/schedule-operations"
import ScheduleQueue from "@/components/admin/schedule/queue"
import * as z from "zod"
import { ScheduleForm } from "@/components/admin/schedule/form/form"
import { notFound } from "next/navigation"

export const metadata = {
  title: "Schedule",
}

const PageSchema = z.object({
  id: z.string(),
})

export default async function SchedulesPage({ params }: { params: {id:string}}) {

  const { id } = PageSchema.parse(params);

  const schedule = await getUserSchedule(id)

  if (!schedule) return notFound()

  return (
    <PageShell>
      <PageHeader heading="Schedules" text="Create and manage schedules.">
      </PageHeader>
      <ScheduleForm schedule={schedule} />
    </PageShell>
  )
}
