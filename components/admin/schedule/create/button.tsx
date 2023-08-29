"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { createUserSchedule } from "@/lib/db/actions/schedules"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScheduleForm } from "./form"

interface ScheduleCreateButtonProps extends ButtonProps {}

export function ScheduleCreateButton({
  className,
  variant,
  ...props
}: ScheduleCreateButtonProps) {
  
  return (
    <Dialog>
      <DialogTrigger
        {...props}
        className={cn(
          buttonVariants({ variant }),
          className
        )}
        {...props}
      >
        <Icons.add className="mr-2 h-4 w-4" />
        Schedule
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Schedule</DialogTitle>
          <DialogDescription>
            Give your schedule a title to get started.
          </DialogDescription>
        </DialogHeader>
        <ScheduleForm />
      </DialogContent>
    </Dialog>
  )
}
