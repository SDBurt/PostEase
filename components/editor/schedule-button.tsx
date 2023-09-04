import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"
import { Post } from "@prisma/client"
import { ScheduleForm } from "../admin/schedule/form/form"

interface ScheduleButtonProps {
  post: Post
}

export default function ScheduleButton({ post }: ScheduleButtonProps) {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(buttonVariants({variant: "secondary"}))}
      >Schedule</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule</DialogTitle>
          <DialogDescription>
            Schedule this post to one of your time slots.
          </DialogDescription>
        </DialogHeader>
        <ScheduleForm />
      </DialogContent>
    </Dialog>
  )
}