import { LinkTabType } from "@/components/admin/link-tab-group";
import { AdminConfig } from "types"

export const adminConfig: AdminConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
      disabled: true,
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: "dashboard",
    },
    {
      title: "Posts",
      href: "/admin/posts",
      icon: "draft",
      startsWith: true
    },
    {
      title: "Schedule",
      href: "/admin/schedule",
      icon: "scheduled",
    },
    {
      title: "Billing",
      href: "/admin/billing",
      icon: "billing",
      disabled: true,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: "settings",
      disabled: true,
    },
  ],
}

export const postLinkTabs: LinkTabType[] = [
  {
    label: "Draft",
    name: "draft",
    href: "/admin/posts/draft"
  },
  {
    label: "Scheduled",
    name: "scheduled",
    href: "/admin/posts/scheduled"
  },
  {
    label: "Published",
    name: "published",
    href: "/admin/posts/published"
  },
]

export const validStatuses = ["draft", "scheduled", "published"] as const;
