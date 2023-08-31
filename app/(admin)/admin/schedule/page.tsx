
import { PageShell } from "@/components/admin/layout/page-shell"
import { PageHeader } from "@/components/admin/page-header"
import { getUserSchedules } from "@/lib/db/actions/schedules"
import ScheduleItem from "@/components/admin/schedule/schedule-item"
import { ScheduleOperations } from "@/components/admin/schedule/schedule-operations"
import { ScheduleCreateButton } from "@/components/admin/schedule/create/button"
import EmptyListPlaceholder from "@/components/admin/empty-placeholder"

export const metadata = {
  title: "Admin",
}

export default async function SchedulePage() {
  const schedules = await getUserSchedules()

  console.log(schedules)

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
