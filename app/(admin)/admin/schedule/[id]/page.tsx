
import { PageShell } from "@/components/admin/layout/page-shell"
import { PageHeader } from "@/components/admin/page-header"

import { getSchedule } from "@/lib/db/actions/schedules"
import * as z from "zod"
import { ScheduleForm } from "@/components/admin/schedule/form/form"
import { notFound } from "next/navigation"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Icons from "@/components/icons"

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
      <div className="mb-3 flex w-full items-center justify-between">
        <div className="flex items-center space-x-10">
          <Link
            href="/admin/schedule"
            className={cn(buttonVariants({ variant: "ghost" }))}
          >
            <>
              <Icons.chevronLeft className="mr-2 h-4 w-4" />
              All Schedules
            </>
          </Link>
        </div>
        
      </div>
      <PageHeader heading="Schedules" text="Create and manage schedules.">
      </PageHeader>
      <ScheduleForm schedule={schedule} />
    </PageShell>
  )
}
