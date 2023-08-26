"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Post } from "@prisma/client"

import { updatePost } from "@/lib/db/actions"
import { cn } from "@/lib/utils"
import { Button, ButtonProps, buttonVariants } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import PostSelector from "./post-selector"

interface PostSelectProps extends ButtonProps {
  posts: Post[]
  scheduledAt: Date
}

export function PostSelectButton({
  className,
  variant,
  posts,
  scheduledAt,
  ...props
}: PostSelectProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    try {
      setIsLoading(false)
      // await updatePost(postId, { status: "SCHEDULED", scheduledAt: new Date()})

      // router.push(`/admin/scheduled/`)
      toast({
        title: "Your post was scheduled.",
        description: "Your post was scheduled successfully.",
      })
    } catch (err) {
      setIsLoading(false)
      toast({
        title: "Something went wrong.",
        description: "Your post was not scheduled. Please try again.",
        variant: "destructive",
      })
    }

    // This forces a cache invalidation.
    router.refresh()
  }

  return (
    <Dialog>
      <DialogTrigger
        {...props}
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
        Schedule
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule this post?</DialogTitle>
          <DialogDescription>
            This post will be scheduled now. Continue?
          </DialogDescription>
        </DialogHeader>
        
        <PostSelector posts={posts} scheduledAt={scheduledAt} />
        
      </DialogContent>
    </Dialog>
  )
}
