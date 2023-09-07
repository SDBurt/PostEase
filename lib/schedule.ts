import { ScheduleType } from "@/types"
import { Post } from "@prisma/client"

import dayjs from "@/lib/dayjs"

import { dayOfWeek, dayRange } from "./utils"

export type SlotType = {
  h: number
  m: number
  date: string
  type: "POST" | "SLOT"
  post?: Post
}

export type SectionData = {
  date: string
  items: SlotType[]
}

export function toDayOfWeek(schedule: ScheduleType[]) {
  if (!schedule) {
    return {}
  }

  let byDayOfWeek: { [key: string]: { h: number; m: number }[] } = {}

  // Map schedule to a dictionary using day of week as the key
  schedule?.forEach((item: ScheduleType) => {
    item.days.forEach((dow: number) => {
      if (Object.keys(byDayOfWeek).includes(dow.toString())) {
        byDayOfWeek[dow] = [...byDayOfWeek[dow], { h: item.h, m: item.m }]
      } else {
        byDayOfWeek[dow] = [{ h: item.h, m: item.m }]
      }
    })
  })

  return byDayOfWeek
}

export function getSlotData(schedule: ScheduleType[]) {
  const now = new Date()
  const weekrange = dayRange(now)
  const dayjsNow = dayjs(now)

  const byDayOfWeek = toDayOfWeek(schedule)

  let data: SectionData[] = []

  weekrange.forEach((item) => {
    const dt = dayjs(item)
    const dow = dayOfWeek(item)

    const items = (byDayOfWeek[dow] || [])
      .filter((item) => {
        const itemDate = dt.hour(item.h).minute(item.m).second(0)
        return itemDate.isAfter(dayjsNow)
      })
      .map((item) => {
        const itemDate = dt.hour(item.h).minute(item.m).second(0)
        const formattedDate = itemDate.format()

        return {
          h: item.h,
          m: item.m,
          date: formattedDate,
          type: "SLOT" as SlotType["type"],
        }
      })

    let newDataItem: SectionData = {
      date: dt.format(),
      items: items.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    }

    data.push(newDataItem)
  })

  return data
}

export function getQueueData(
  posts: Post[],
  schedule: ScheduleType[],
  timezone?: string
): SectionData[] {
  const now = new Date()
  const weekrange = dayRange(now)
  const dayjsNow = dayjs(now)

  const byDayOfWeek = toDayOfWeek(schedule)

  // Map scheduled posts to a dictionary using scheduled date as key
  const scheduledPostsByDate: { [key: string]: Post } = {}
  posts.forEach((post: Post) => {
    if (post.status === "SCHEDULED") {
      const formattedDate = dayjs(post.scheduledAt).format()
      scheduledPostsByDate[formattedDate] = post
    }
  })

  let data: SectionData[] = []

  weekrange.forEach((item) => {
    const dt = dayjs(item)
    const dow = dayOfWeek(item)

    const items = (byDayOfWeek[dow] || [])
      .filter((item) => {
        const itemDate = dt.hour(item.h).minute(item.m).second(0)
        return itemDate.isAfter(dayjsNow)
      })
      .map((item) => {
        const itemDate = dt.hour(item.h).minute(item.m).second(0)
        const formattedDate = itemDate.format()

        // if a post is scheduled for this date
        if (Object.keys(scheduledPostsByDate).includes(formattedDate)) {
          return {
            h: item.h,
            m: item.m,
            date: formattedDate,
            type: "POST" as SlotType["type"],
            post: scheduledPostsByDate[formattedDate],
          }
        }

        return {
          h: item.h,
          m: item.m,
          date: formattedDate,
          type: "SLOT" as SlotType["type"],
        }
      })

    let newDataItem: SectionData = {
      date: dt.format(),
      items: items.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    }

    data.push(newDataItem)
  })

  return data
}
