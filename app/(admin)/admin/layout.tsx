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
      <div className="grid container flex-1 gap-12 md:grid-cols-[200px_1fr]">
        <aside className="hidden w-[200px] md:flex flex-col flex-1 ">
          <div className="flex-col flex-1 w-full">
            <Suspense fallback={<Skeleton className="h-[50px] w-full" />}><SidebarHeader user={user}/></Suspense>
            <SidebarNav items={adminConfig.sidebarNav} />
          </div>
          <SidebarFooter />
        </aside>
        <div className="md:hidden fixed top-0 left-0 z-40 items-center bg-muted w-full flex">
          <Suspense fallback={<Skeleton className="h-[50px] w-full" />}><MobileHeader user={user}/></Suspense>
        </div>
        
        <div className="md:hidden fixed bottom-0 left-0 z-40 items-center bg-muted w-full flex ">
          <MobileNav items={adminConfig.sidebarNav} />
        </div>
        <main className="flex flex-1 flex-col w-full overflow-hidden pt-16 md:pt-4">
          {children}
        </main>

      </div>
    </div>
  )
}
