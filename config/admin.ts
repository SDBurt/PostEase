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
      title: "Drafts",
      href: "/admin/drafts",
      icon: "draft",
    },
    {
      title: "Scheduled",
      href: "/admin/scheduled",
      icon: "scheduled",
    },
    {
      title: "Published",
      href: "/admin/published",
      icon: "published",
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
