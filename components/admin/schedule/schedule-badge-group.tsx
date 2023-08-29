import { Schedule } from "@prisma/client"

import { dateFromNow } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import Icons from "@/components/icons"

interface BadgeGroupProps {
  schedule: Pick<Schedule, "isDefault">
}

export function ScheduleBadgeGroup({ schedule }: BadgeGroupProps) {
  return (
    <div className=" flex items-center space-x-2">
      {
        schedule.isDefault ? (
          <Badge variant="outline" className="flex items-center justify-center">
            <Icons.pen className="h-4" />
            <span>Default</span>
          </Badge>
        ) : null
      }
    </div>
  )
}
