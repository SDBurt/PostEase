import { ScheduleType } from "@/types"
import { Post } from "@prisma/client"
import dayjs from "dayjs"

import { dayFormat, dayFormatTime, dayOfWeek, dayRange } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import { PostCreateButton } from "../posts/create/button"
import { ScheduledPostOperations } from "../posts/scheduled-post-operations"
import { PostSelectButton } from "../posts/select-button"
import { SlotType, getQueueData } from "@/lib/schedule"


interface SlotItemProps {
  datetime: string
  draftPosts: Post[]
}

function SlotItem({ datetime, draftPosts }: SlotItemProps) {
  return (
    <Card>
      <CardContent className="group flex h-12 items-center justify-between p-4">
        <div className="flex items-center justify-start">
          {dayFormatTime(datetime)}
        </div>
        <div className="hidden items-center justify-end space-x-2 group-hover:flex">
          <PostCreateButton variant="outline" size="sm" scheduledAt={datetime}>
            New
          </PostCreateButton>
          <PostSelectButton
            variant="outline"
            size="sm"
            posts={draftPosts}
            scheduledAt={datetime}
          >
            Choose
          </PostSelectButton>
        </div>
      </CardContent>
    </Card>
  )
}

interface PostItemProps {
  postId?: string
  scheduledAt: Date | null
  content: string
  showAction?: boolean
}

function PostItem({
  postId,
  scheduledAt,
  content,
  showAction = true,
}: PostItemProps) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-4">
        <div className="w-full">
          <div className="flex-col items-center space-y-2 border-l-2 border-primary px-2">
            <div className="flex items-center justify-start">
              {scheduledAt && dayFormatTime(scheduledAt)}
            </div>
            <p className="text-muted-foreground">
              {content ? content : "empty post"}
            </p>
          </div>
        </div>
        {showAction && postId && (
          <ScheduledPostOperations post={{ id: postId }} />
        )}
      </CardContent>
    </Card>
  )
}

interface ScheduleQueueSectionProps {
  sectionData: {
    date: Date
    items: SlotType[]
  }
  draftPosts: Post[]
}

function ScheduleQueueSection({
  sectionData,
  draftPosts,
}: ScheduleQueueSectionProps) {
  return (
    <div className="flex flex-col space-y-2">
      <Label>{dayFormat(sectionData.date)}</Label>
      {sectionData.items.map((item: SlotType) => (
        <div key={`${sectionData.date}-slot-${item.h}-${item.m}`}>
          {item.type === "SLOT" && (
            <SlotItem datetime={item.date} draftPosts={draftPosts} />
          )}
          {item.type === "POST" && item.post && (
            <PostItem
              scheduledAt={item.post.scheduledAt}
              postId={item.post.id}
              content={
                item.post.content && item.post.content.length > 0
                  ? item.post.content[0]
                  : ""
              }
            />
          )}
        </div>
      ))}
    </div>
  )
}

interface ScheduleQueueProps {
  scheduledPosts: Post[]
  draftPosts: Post[]
  schedules: ScheduleType[]
  timezone: string
}
export default function ScheduleQueue({
  timezone,
  scheduledPosts,
  draftPosts,
  schedules,
}: ScheduleQueueProps) {
  return (
    <div className="flex flex-col space-y-4">
      {getQueueData(scheduledPosts, schedules, timezone)?.map((schedule) => {
        return schedule && schedule.items.length > 0 ? (
          <div key={`${schedule.date}-section`} className="w-full">
            <ScheduleQueueSection
              sectionData={schedule}
              draftPosts={draftPosts}
            />
          </div>
        ) : null
      })}
    </div>
  )
}
