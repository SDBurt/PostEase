import SidebarNav from "@/components/admin/nav/sidebar-nav";
import { adminConfig } from "@/config/admin";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Admin/Nav/Sidebar",
  component: SidebarNav,
  tags: ["autodocs"],
} satisfies Meta<typeof SidebarNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: adminConfig.sidebarNav,
  },
};
