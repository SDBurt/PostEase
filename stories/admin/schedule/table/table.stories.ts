import type { Meta, StoryObj } from "@storybook/react"

import { ScheduleTable } from "@/components/admin/schedule/table/table"
import { columns } from "@/components/admin/schedule/table/columns"


const meta = {
  title: "Admin/Schedule/Table",
  component: ScheduleTable,
  tags: ["autodocs"],
} satisfies Meta<typeof ScheduleTable>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    columns: columns,
    data: [
      {
        "id": "1",
        "hour": 12,
        "minute": 30,
        "monday": false,
        "tuesday": true,
        "wednesday": false,
        "thursday": false,
        "friday": true,
        "saturday": false,
        "sunday": false,
      }
    ]
  }
}
