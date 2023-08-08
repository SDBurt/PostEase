import type { Meta, StoryObj } from "@storybook/react"

import ScheduleQueue from "@/components/admin/schedule/queue"
import { Post } from "@prisma/client"
import { Schedule } from "@/types"
import { string } from "zod"
import dayjs from "dayjs"

const exampleTz = "America/Toronto"

const exampleSchedule: Schedule[] = [
  {h: 1, m: 0, days: [0, 1, 2, 3, 4, 5, 6]},
  {h: 2, m: 0, days: [0, 1, 2]},
  {h: 7, m: 15, days: [1, 2]},
  {h: 9, m: 0, days: [0, 1]},
  {h: 12, m: 30, days: [1]},
  {h: 17, m: 0, days: [2]},
]

const examplePosts: Post[] = [
    {
      id: 1,
      userId: 'user_2Sr2bmplxtMoiO3ZDD8YHSKUKAE',
      content: ["test", "test2"],
      status: 'DRAFT',
      scheduledAt: null,
      createdAt: dayjs().subtract(2, "day").subtract(2, "minute").toDate(),
      updatedAt: dayjs().subtract(1, "day").subtract(1, "minute").toDate(),
    },
    {
      id: 2,
      userId: 'user_2Sr2bmplxtMoiO3ZDD8YHSKUKAE',
      content: ["test3", "test4"],
      status: 'SCHEDULED',
      scheduledAt: dayjs().add(2, "days").hour(1).minute(0).second(0).toDate(),
      createdAt: dayjs().subtract(2, "day").subtract(1, "minute").toDate(),
      updatedAt: dayjs().subtract(1, "day").toDate(),
    }
  ]


const meta = {
  title: "Admin/Schedule/Queue",
  component: ScheduleQueue,
  tags: ["autodocs"],
} satisfies Meta<typeof ScheduleQueue>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    timezone: exampleTz,
    posts:  examplePosts,
    schedules: exampleSchedule
  }
}
