import React, { Suspense } from "react"
import { notFound } from "next/navigation"

import { adminConfig } from "@/config/admin"

import { getCurrentUser } from "@/lib/session"
import SidebarNav from "@/components/admin/nav/sidebar-nav"
import SidebarHeader from "@/components/admin/nav/sidebar-header"
import SidebarFooter from "@/components/admin/nav/sidebar-footer"
import MobileNav from "@/components/admin/nav/mobile-nav"
import MobileHeader from "@/components/admin/nav/mobile-header"
import { Skeleton } from "@/components/ui/skeleton"


interface LayoutProps {
  children: React.ReactNode
}

export default async function AdminLayout({ children }: LayoutProps) {
  const user = await getCurrentUser()

  if (!user) {
    return notFound()
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] flex-1 flex-col md:flex ">
          <div className="w-full flex-1 flex-col">
            <Suspense fallback={<Skeleton className="h-[50px] w-full" />}><SidebarHeader user={user}/></Suspense>
            <SidebarNav items={adminConfig.sidebarNav} />
          </div>
          <SidebarFooter />
        </aside>
        <div className="fixed left-0 top-0 z-40 flex w-full items-center bg-muted md:hidden">
          <Suspense fallback={<Skeleton className="h-[50px] w-full" />}><MobileHeader user={user}/></Suspense>
        </div>
        
        <div className="fixed bottom-0 left-0 z-40 flex w-full items-center bg-muted md:hidden ">
          <MobileNav items={adminConfig.sidebarNav} />
        </div>
        <main className="flex w-full flex-1 flex-col overflow-hidden pt-16 md:pt-4">
          {children}
        </main>

      </div>
    </div>
  )
}
