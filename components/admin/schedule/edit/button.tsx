
import * as React from "react"

import { ButtonProps, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScheduleForm } from "../form/form"
import { Schedule } from "@prisma/client"
import { cn } from "@/lib/utils"

interface ScheduleEditButtonProps extends ButtonProps {
  schedule: Schedule
}

export function ScheduleEditButton({
  className,
  variant,
  schedule,
  ...props
}: ScheduleEditButtonProps) {

  return (
    <Dialog>
      <DialogTrigger {...props} className={cn(buttonVariants())}>Edit Schedule</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Schedule</DialogTitle>
          <DialogDescription>
            Customize what time slots you wish to use for your scheduled posts.
          </DialogDescription>
        </DialogHeader>
        <ScheduleForm schedule={schedule} />
      </DialogContent>
    </Dialog>
  )
}
