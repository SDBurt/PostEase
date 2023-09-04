"use client"

import { cn } from "@/lib/utils"
import { ButtonProps, buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { PostCreateForm } from "./form"

interface PostCreateButtonProps extends ButtonProps {
  scheduledAt?: string
}

export function PostCreateButton({
  className,
  variant,
  scheduledAt,
  ...props
}: PostCreateButtonProps) {
  
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
        Create Post
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
          <DialogDescription>
            Give your post a title to get started.
          </DialogDescription>
        </DialogHeader>
        <PostCreateForm scheduledAt={scheduledAt}/>
      </DialogContent>
    </Dialog>
  )
}
