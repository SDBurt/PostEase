
import { PageShell } from "@/components/admin/layout/page-shell"
import { PageHeader } from "@/components/admin/page-header"
import { getSchedules } from "@/lib/db/actions/schedules"
import ScheduleItem from "@/components/admin/schedule/schedule-item"
import { ScheduleOperations } from "@/components/admin/schedule/schedule-operations"
import { ScheduleCreateButton } from "@/components/admin/schedule/create/button"
import EmptyListPlaceholder from "@/components/admin/empty-placeholder"
import Link from "next/link"
import Icons from "@/components/icons"
import { BadgeGroup } from "@/components/admin/posts/post-badge-group"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata = {
  title: "Admin",
}

export default async function SchedulePage() {
  const schedules = await getSchedules()

  return (
    <PageShell>
      <PageHeader heading="Schedules" text="Create and manage schedules.">
        <ScheduleCreateButton /> 
      </PageHeader>
      <div>
        <div className="divide-y divide-border rounded-md border">
        { schedules && schedules.length > 0 ? (
           schedules?.map((schedule) => {
                return (
                  <ScheduleItem key={schedule.id} schedule={schedule}>
                    <ScheduleOperations schedule={schedule} />
                  </ScheduleItem>
                )
              })
            ) : (
            <EmptyListPlaceholder title="No Schedules" description="Create a schedule to start posting" iconName="scheduled">
              <ScheduleCreateButton /> 
            </EmptyListPlaceholder>
            )
          }
          </div>
      </div>
    </PageShell>
  )
}
