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
  const user = auth()

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen flex-col space-y-6">
      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <MainNav items={adminConfig.mainNav} />
          <UserButton />
        </div>
      </header>
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-col md:flex">
          <SidebarNav items={adminConfig.sidebarNav} />
        </aside>
        <main className="flex w-full flex-1 flex-col overflow-hidden">
          {children}
        </main>
      </div>
      <SiteFooter className="border-t" />
    </div>
  )
}
