import type { Meta, StoryObj } from "@storybook/react"

import ScheduleQueue from "@/components/admin/schedule/queue"


const meta = {
  title: "Admin/Schedule/Queue",
  component: ScheduleQueue,
  tags: ["autodocs"],
} satisfies Meta<typeof ScheduleQueue>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
