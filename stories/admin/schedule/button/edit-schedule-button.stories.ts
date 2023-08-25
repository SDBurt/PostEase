import type { Meta, StoryObj } from "@storybook/react"

import { ScheduleEditButton } from "@/components/admin/schedule/edit/button"

const meta = {
  title: "Admin/Schedule/Button/Edit",
  component: ScheduleEditButton,
  tags: ["autodocs"],
} satisfies Meta<typeof ScheduleEditButton>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    schedule: {
      id: 123456,
      userId: "1234",
      schedule: JSON.stringify([
        { h: 1, m: 0, days: [0, 1, 2, 3, 4, 5, 6] },
        { h: 2, m: 0, days: [0, 1, 2] },
        { h: 7, m: 15, days: [1, 2] },
        { h: 9, m: 0, days: [0, 1] },
        { h: 12, m: 30, days: [1] },
        { h: 17, m: 0, days: [2] },
      ]),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  },
}
