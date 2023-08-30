'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarNavItem } from "types"
import { cn } from "@/lib/utils"
import Icons from "@/components/icons"

interface MobileNavProps {
  items: SidebarNavItem[]
}

export function MobileNav({ items }: MobileNavProps) {
  const path = usePathname()

  if (!items?.length) {
    return null
  }

  return (
    <nav className="flex w-full justify-evenly">
      {items.map((item: SidebarNavItem, index) => {
        const Icon = Icons[item.icon || "arrowRight"]
        return (
          item.href && (
            <Link key={index} href={item.disabled ? "/" : item.href}>
              <span
                className={cn(
                  "group flex flex-col items-center justify-center px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  item.startsWith ? (path?.startsWith(item.href) ? "text-accent-foreground font-semibold" : "text-muted-foreground") : (item.href === path ? "text-accent-foreground font-semibold" : "text-muted-foreground"),
                  item.disabled && "cursor-not-allowed text-muted-foreground/20 hover:text-muted-foreground/30"
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}

export default MobileNav
