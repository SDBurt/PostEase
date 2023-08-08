"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { createPost, createUserSchedule } from "@/lib/db/actions"
import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"

interface ScheduleEditButtonProps extends ButtonProps {}

export function ScheduleEditButton({
  className,
  variant,
  ...props
}: ScheduleEditButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    const schedule = await createUserSchedule()

    setIsLoading(false)

    // This forces a cache invalidation.
    router.refresh()

    // router.push(`/editor/${schedule.id}`)
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        buttonVariants({ variant }),
        {
          "cursor-not-allowed opacity-60": isLoading,
        },
        className
      )}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <Icons.add className="mr-2 h-4 w-4" />
      )}
      Edit schedule
    </button>
  )
}
