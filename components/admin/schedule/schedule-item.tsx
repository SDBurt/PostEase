import { Skeleton } from "@/components/ui/skeleton"
import { Schedule } from "@prisma/client"
import Link from "next/link"
import { ScheduleBadgeGroup } from "./schedule-badge-group"

interface ScheduleItemProps {
  schedule: Schedule
  children: React.ReactNode
}

function ScheduleItem({ schedule, children }: ScheduleItemProps) {

  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-2">
        <Link
          href={`/admin/schedule/${schedule.id}`}
          className="truncate font-semibold hover:underline"
        >
          {schedule.title}
        </Link>
        <ScheduleBadgeGroup schedule={{isDefault: schedule.isDefault}} />
      </div>
      {children}
    </div>
  )
}

ScheduleItem.Skeleton = function ScheduleItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}

export default ScheduleItem