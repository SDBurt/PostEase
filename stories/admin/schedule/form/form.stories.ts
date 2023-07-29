import type { Meta, StoryObj } from "@storybook/react"

import { ScheduleForm } from "@/components/admin/schedule/form/form"


const meta = {
  title: "Admin/Schedule/Form",
  component: ScheduleForm,
  tags: ["autodocs"],
} satisfies Meta<typeof ScheduleForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {}
}
