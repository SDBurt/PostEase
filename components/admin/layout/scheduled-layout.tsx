import React from "react"
import { notFound } from "next/navigation"
import { auth, UserButton } from "@clerk/nextjs"

import { adminConfig } from "@/config/admin"
import MainNav from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"

import SidebarNav from "../nav/sidebar-nav"

interface LayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: LayoutProps) {
  return <div className="">{children}</div>
}
