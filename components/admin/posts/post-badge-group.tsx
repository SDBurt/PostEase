import { Post } from "@prisma/client"

import dayjs from "@/lib/dayjs"
import { dateFromNow } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import Icons from "@/components/icons"

interface BadgeGroupProps {
  post: Pick<Post, "status" | "scheduledAt">
}

export function BadgeGroup({ post }: BadgeGroupProps) {
  return (
    <div className=" flex items-center space-x-2">
      <Badge variant="outline" className="flex items-center justify-center">
        <Icons.pen className="h-4" />
        {post.status === "DRAFT" && <span>Draft</span>}
        {post.status === "SCHEDULED" && <span>Scheduled</span>}
        {post.status === "PUBLISHED" && <span>Published</span>}
      </Badge>
      {post.status === "SCHEDULED" && post.scheduledAt ? (
        <Badge variant="outline">
          <Icons.scheduled className="h-4" />
          <span>{dateFromNow(post.scheduledAt as Date)}</span>
        </Badge>
      ) : null}
      {post.status === "PUBLISHED" && post.scheduledAt ? (
        <Badge variant="outline">
          <Icons.published className="h-4" />
          <span>{dateFromNow(post.scheduledAt as Date)}</span>
        </Badge>
      ) : null}
    </div>
  )
}
