import type { Meta, StoryObj } from "@storybook/react"

import DatetimeSelector from "@/components/datetime-selector"

const meta = {
  title: "Shared/DatetimeSelector",
  component: DatetimeSelector,
  tags: ["autodocs"],
} satisfies Meta<typeof DatetimeSelector>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
