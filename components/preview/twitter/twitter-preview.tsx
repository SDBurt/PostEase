import Link from "next/link"
import { Post } from "@prisma/client"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import Tweet from "@/components/admin/posts/twitter/tweet"
import Icons from "@/components/icons"

interface TwitterFormProps {
  imageUrl: string
  userName: string
  handle: string
  post?: Pick<Post, "id" | "content" | "status" | "scheduledAt">
}

export default function TwitterForm({
  imageUrl,
  userName,
  handle,
  post,
}: TwitterFormProps) {
  const tweets = post?.content
  const scheduledAt = post?.scheduledAt

  return (
    <div className="w-full space-y-8">
      <div className="grid w-full gap-10">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-10">
            <Link
              href="/admin/posts/published"
              className={cn(buttonVariants({ variant: "ghost" }))}
            >
              <>
                <Icons.chevronLeft className="mr-2 h-4 w-4" />
                Back
              </>
            </Link>
          </div>
        </div>
        <div className="mx-auto w-4/5 sm:w-2/3 sm:max-w-[600px]">
          <div className=" rounded-lg border p-4">
            {tweets?.map((tweet, index) => (
              <Tweet
                imageUrl={imageUrl}
                userName={userName}
                handle={handle}
                createdAt={scheduledAt}
                isThread={tweets.length > 1 && index !== tweets.length - 1}
                showTimestamp={true}
              >
                <div className="flex space-x-2">
                  <p className="w-full resize-none appearance-none overflow-hidden bg-transparent text-muted-foreground">
                    {tweet}
                  </p>
                </div>
              </Tweet>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
