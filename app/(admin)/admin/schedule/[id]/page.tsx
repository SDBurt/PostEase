
import { PageShell } from "@/components/admin/layout/page-shell"
import { PageHeader } from "@/components/admin/page-header"

import { getSchedule } from "@/lib/db/actions/schedules"
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

  const schedule = await getSchedule(id)

  if (!schedule) return notFound()

  return (
    <PageShell>
      <PageHeader heading="Schedules" text="Create and manage schedules.">
      </PageHeader>
      <ScheduleForm schedule={schedule} />
    </PageShell>
  )
}
