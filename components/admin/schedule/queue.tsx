
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { dateFromNow, dayDate, dayFormat, dayFormatTime, dayMonth, dayOfWeek, dayRange, dayYear } from '@/lib/utils'
import { ScheduleType } from '@/types'
import { Post } from '@prisma/client'
import dayjs from 'dayjs'
import { PostOperations } from '../posts/post-operations'
import { Separator } from '@/components/ui/separator'
import { PostCreateButton } from '../posts/create/button'
import { PostSelectButton } from '../posts/select-button'

type SlotType = {
  h: number
  m: number
  date: string
  type: "POST" | "SLOT"
  post?: Post
}

interface SectionData {
  date: string,
  items: SlotType[]
}

function getQueueData(timezone: string, posts: Post[], schedule: ScheduleType[]): SectionData[] {

  const now = new Date()
  const weekrange = dayRange(now)

  let byDayOfWeek: {[key: string]: {h: number, m: number}[]} = {}

  // Map schedule to a dictionary using day of week as the key
  schedule.forEach((item: ScheduleType) => {
    item.days.forEach((dow: number) => {
      if (Object.keys(byDayOfWeek).includes(dow.toString())) {
        byDayOfWeek[dow] = [...byDayOfWeek[dow], {h: item.h, m: item.m}]
      } else {
        byDayOfWeek[dow] = [{h: item.h, m: item.m}]
      }
    })
  })

  // Map scheduled posts to a dictionary using scheduled date as key
  const scheduledPostsByDate: {[key: string]: Post} = {}
  posts.forEach((post: Post) => {
    if (post.status === "SCHEDULED") {
      const formattedDate = dayjs(post.scheduledAt).format()
      scheduledPostsByDate[formattedDate] = post
    }
  })

  let data: SectionData[] = []
  weekrange.forEach(dt => {
    const dow = dayOfWeek(dt)
    const date = dayjs(dt).date()
    
    const items: SlotType[] = (byDayOfWeek[dow] || []).map(item => {
      
      const formattedDate = dayjs().date(date).hour(item.h).minute(item.m).second(0).format()
      
      // if a post is scheduled for this date
      if (Object.keys(scheduledPostsByDate).includes(formattedDate)) {
        return {
          h: item.h,
          m: item.m,
          date: formattedDate,
          type: "POST",
          post: scheduledPostsByDate[formattedDate]
        }
      }

      return {
        h: item.h,
        m: item.m,
        date: formattedDate,
        type: "SLOT",
      }
    })

    // 2023-07-29T18:42:55-07:00
    let newDataItem: SectionData = {
      date: dt,
      items: items
    }

    data.push(newDataItem)
  })

  return data
}

function SlotItem({ datetime, draftPosts }) {

  async function postSelectHandler(index: number) {
    console.log("CLICKED: ", index)
  }

  return (
    <Card>
      <CardContent className='p-4 h-12 flex items-center justify-between group'>
        <div className='flex items-center justify-start'>
          {dayFormatTime(datetime)}
        </div>
        <div className='hidden group-hover:flex items-center justify-end space-x-2'>
          <PostCreateButton variant='outline' size='sm' scheduledAt={datetime}>New</PostCreateButton>
          <PostSelectButton variant='outline' size='sm' posts={draftPosts} scheduledAt={datetime}>Choose</PostSelectButton>
        </div>
      </CardContent>
    </Card>
  )
}

interface PostItemProps {
  postId?: number
  scheduledAt: Date
  content: string
  showAction?: boolean
}

function PostItem({ postId, scheduledAt, content, showAction = true }: PostItemProps) {
  return (
    <Card>
      <CardContent className='p-4 h-24 flex items-center justify-between'>
        <div className='w-full h-full flex'>
          <div className='w-1 h-full bg-primary rounded' />
          <div className='flex-col items-center space-y-2 px-2'>
            <div className='flex items-center justify-start'>
              {dayFormatTime(scheduledAt)}
            </div>
            <div
              className="truncate text-muted-foreground"
            >
              {content ? content: "empty post"}
            </div>
          </div>
        </div>
        {showAction && postId && <PostOperations post={{ id: postId }} />}
      </CardContent>
    </Card>
  )
}


interface ScheduleQueueSectionProps {
  sectionData: {
    date: string | Date,
    items: SlotType[]
  }
  draftPosts: Post[]
}

function ScheduleQueueSection({ sectionData, draftPosts }: ScheduleQueueSectionProps) {
  
  return (
    <div className='flex flex-col space-y-2'>
      <Label>{dayFormat(sectionData.date)}</Label>
      {
        sectionData.items.map((item: SlotType) => (
          <div key={`${sectionData.date}-slot-${item.h}-${item.m}`}>
            {
              item.type === "SLOT" && <SlotItem datetime={item.date} draftPosts={draftPosts}/>
            }
            {
              item.type === "POST" && item.post && <PostItem scheduledAt={item.post.scheduledAt} postId={item.post.id} content={item.post.content && item.post.content.length > 0 ? item.post.content[0] : ""} />
            }
          </div>
        ))
      }
    </div>
  )
}


interface ScheduleQueueProps {
  scheduledPosts: Post[]
  draftPosts: Post[]
  schedules: ScheduleType[]
  timezone: string
}
export default function ScheduleQueue({ timezone, scheduledPosts, draftPosts, schedules }: ScheduleQueueProps) {

  return (
    <div className="flex flex-col space-y-4">
      {
        getQueueData(timezone, scheduledPosts, schedules)?.map(schedule => {
            return (
              <div key={`${schedule.date}-section`}>
                <ScheduleQueueSection sectionData={schedule} draftPosts={draftPosts} />
              </div>
            )
          }
        )
      }
      
    </div>
  )
}
