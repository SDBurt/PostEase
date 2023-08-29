
import { PageShell } from "@/components/admin/layout/page-shell"
import { PageHeader } from "@/components/admin/page-header"
import { getUserSchedules } from "@/lib/db/actions/schedules"
import ScheduleItem from "@/components/admin/schedule/schedule-item"
import { ScheduleOperations } from "@/components/admin/schedule/schedule-operations"
import { ScheduleCreateButton } from "@/components/admin/schedule/create/button"

export const metadata = {
  title: "Admin",
}

export default async function SchedulePage() {
  const schedules = await getUserSchedules()

  return (
    <PageShell>
      <PageHeader heading="Schedules" text="Create and manage schedules.">
        <ScheduleCreateButton /> 
      </PageHeader>
      <div>
        <div className="divide-y divide-border rounded-md border">
        {
            schedules?.map((schedule) => {
              return <ScheduleItem key={schedule.id} schedule={schedule}>
                <ScheduleOperations schedule={schedule} />
              </ScheduleItem>
            })
          }
          </div>
      </div>
    </PageShell>
  )
}
