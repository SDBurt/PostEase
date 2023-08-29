import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { Post } from "@prisma/client"

import { updatePost } from "@/lib/db/actions"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import Icons from "@/components/icons"

interface PostSelectorItemProps {
  content: string
  selected: boolean
}

function PostSelectorItem({ content, selected }: PostSelectorItemProps) {
  return (
    <Card className={cn(selected ? "bg-card/40 font-bold" : "font-normal")}>
      <CardContent className="flex items-center p-4">
        {content ? content : "empty post"}
      </CardContent>
    </Card>
  )
}

PostSelectorItem.Skeleton = function PostItemSkeleton() {
  return (
    <Card>
      <CardContent className="flex items-center">
        <Skeleton className="h-5 w-2/5" />
      </CardContent>
    </Card>
  )
}

interface PostSelectorProps {
  posts: Post[]
  scheduledAt: Date
}

export default function PostSelector({
  posts,
  scheduledAt,
}: PostSelectorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selected, setSelected] = useState<undefined | number>()

  const onClick = useCallback(async () => {
    setIsLoading(true)

    if (selected === undefined) {
      console.error("Nothing Selected")
      return toast({
        title: "Something went wrong.",
        description: "Please select a post to schedule and try again.",
        variant: "destructive",
      })
    }

    try {
      setIsLoading(false)
      await updatePost(posts[selected].id, { status: "SCHEDULED", scheduledAt })

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
  }, [router, selected, posts, scheduledAt])

  return (
    <div>
      {posts?.length ? (
        <div className="space-y-4">
          <div className="h-48 space-y-2 overflow-y-scroll p-2">
            {posts.map((post, index) => (
              <div
                key={post.id}
                onClick={() => {
                  setSelected(index)
                }}
                className="cursor-pointer"
              >
                <PostSelectorItem
                  selected={selected !== undefined ? selected === index : false}
                  content={post.content[0]}
                />
              </div>
            ))}
          </div>
          <Button type="submit" onClick={onClick}>
            {isLoading ? (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Icons.add className="mr-2 h-4 w-4" />
            )}
            Submit
          </Button>
        </div>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="post" />
          <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You don&apos;t have any posts to schedule.
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
    </div>
  )
}
