'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { EditorNavItem } from "types"
import { cn } from "@/lib/utils"
import Icons from "@/components/icons"
import { useCallback } from "react"
import { Button } from "@/components/ui/button"

interface SidebarNavProps {
  items: EditorNavItem[]
}

export function EditorNav({ items }: SidebarNavProps) {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  
  const tabName = searchParams?.has("tabName") ? searchParams.get("tabName") : "editor"

  if (!items?.length) {
    return null
  }

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams ? searchParams : "")
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )

  const tabClicked = (tabName: string) => {
    router.push(pathname + '?' + createQueryString('tabName', tabName))
  }

  return (
    <nav className="grid items-start gap-2 pt-16 md:pt-4">
      {items.map((item: EditorNavItem, index) => {
        const Icon = Icons[item.icon || "arrowRight"]
        return (
          item && (
            <Button 
              key={item.tabName}
              variant={item.tabName === tabName ? "secondary" : "ghost"} 
              onClick={() => tabClicked(item.tabName)} 
              disabled={item.disabled}
              className="justify-between"
            >
              <span
                className={cn(
                  "flex items-center",
                )}
              >
                <Icon className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span> 
              {item.tabName === tabName ? <Icons.chevronRight className="w-4 h-4" /> : null}
            </Button>
            
          )
        )
      })}
    </nav>
  )
}

export default EditorNav
