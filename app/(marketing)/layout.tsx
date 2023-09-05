import Link from "next/link"

import { marketingConfig } from "@/config/marketing"
import { getCurrentUser } from "@/lib/session"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { MainNav } from "@/components/main-nav"
import { SiteFooter } from "@/components/site-footer"
import { Suspense } from "react"

interface MarketingLayoutProps {
  children: React.ReactNode
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  const user = await getCurrentUser()

  let navCallToAction = (
    <Link
      href="/sign-in"
      className={cn(buttonVariants({ variant: "secondary" }), "px-4")}
    >
      Login
    </Link>
  )

  if (user) {
    navCallToAction = (
      <Link
        href="/admin"
        className={cn(buttonVariants({ variant: "secondary" }), "px-4")}
      >
        Admin
      </Link>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={marketingConfig.mainNav} />
          <Suspense fallback={
            <Link
              href="/sign-in"
              className={cn(buttonVariants({ variant: "secondary" }), "px-4")}
            >
              Login
            </Link>
          }>
            <nav>{navCallToAction}</nav>
          </Suspense>
          
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
