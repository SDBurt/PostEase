"use client"

import * as React from "react"
import { useRouter } from "next/navigation"

import { updatePost } from "@/lib/db/actions/post"
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
import { Status } from "@prisma/client"
import { revalidatePath } from "next/cache"

interface PublishButtonProps extends ButtonProps {
  postId: string
}

export function PublishButton({
  className,
  variant,
  postId,
  ...props
}: PublishButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onClick() {
    setIsLoading(true)

    try {
      setIsLoading(false)
      await updatePost(postId, {
        status: Status.PUBLISHED,
        scheduledAt: new Date(),
        updatedAt: new Date(),
      })
      router.push("/admin/published/")
      toast({
        title: "Your post was published.",
        description: "Your post was published successfully.",
      })
      revalidatePath("/admin/published/");
    } catch (err) {
      setIsLoading(false)
      toast({
        title: "Something went wrong.",
        description: "Your post was not published. Please try again.",
        variant: "destructive",
      })
    }
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
        Publish
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish this post?</DialogTitle>
          <DialogDescription>
            This post will be published now. Continue?
          </DialogDescription>
          <DialogFooter>
            <Button type="submit" onClick={onClick}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
