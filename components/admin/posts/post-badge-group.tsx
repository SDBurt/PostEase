import Icons from "@/components/icons"
import { Badge } from "@/components/ui/badge"
import { dateFromNow } from "@/lib/utils"
import { Post } from "@prisma/client"
import dayjs from "dayjs"

interface BadgeGroupProps {
  post?: Pick<Post, "status" | "scheduledAt">
}

export function BadgeGroup({post}: BadgeGroupProps) {
  return (
    <div className=" flex space-x-2 items-center">
      <Badge variant="outline" className="flex items-center justify-center">
        <Icons.pen className="h-4"/>
        {post.status === "DRAFT" && <span>Draft</span>}
        {post.status === "SCHEDULED" && <span>Scheduled</span>}
        {post.status === "PUBLISHED" && <span>Published</span>}
      </Badge>
      {post.status === "SCHEDULED" ? <Badge variant="outline">
        <Icons.scheduled className="h-4"/>
        <span>{dateFromNow(post.scheduledAt)}</span>
      </Badge> : null}
      {post.status === "PUBLISHED" ? <Badge variant="outline">
        <Icons.published className="h-4"/>
        <span>{dateFromNow(post.scheduledAt)}</span>
      </Badge> : null}
    </div>
  )
}