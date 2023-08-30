import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"

export default function SidebarFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className, "px-3 py-4")}>
      <div className="flex space-x-2">
        <div className="flex space-x-2">
          <Link
            href={siteConfig.links.twitter}
            className={cn(buttonVariants({variant: "outline", size: "icon"}))}
            target="_blank"
            rel="noreferrer"
          >
            <Icons.twitter  className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Twitter</span>
          </Link>

          <Link
            href={siteConfig.links.github}
            className={cn(buttonVariants({variant: "outline", size: "icon"}))}
            target="_blank"
            rel="noreferrer"
          >
            <Icons.github  className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">Github</span>
          </Link>
        </div>
      </div>
    </footer>
  )
}
