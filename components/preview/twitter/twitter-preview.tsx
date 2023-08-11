import Link from "next/link"
import { Post } from "@prisma/client"

import TextareaAutosize from "react-textarea-autosize"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import Tweet from "@/components/admin/posts/twitter/tweet"
import Icons from "@/components/icons"
import { PublishButton } from "@/components/admin/posts/publish-button"


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

  const tweets = post.content
  const scheduledAt = post.scheduledAt

  return (
      <div className="space-y-8">
        <div className="grid w-full gap-10">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-10">
              <Link
                href="/admin/published"
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
            <div className=" p-4 border rounded-lg">
              {tweets.map((tweet, index) => (
                <Tweet
                  imageUrl={imageUrl}
                  userName={userName}
                  handle={handle}
                  createdAt={scheduledAt}
                  isThread={
                    tweets.length > 1 && index !== tweets.length - 1
                  }
                  showTimestamp={true}
                >
              
                      <div className="flex space-x-2">
                        <p
                          className="w-full resize-none appearance-none overflow-hidden bg-transparent text-muted-foreground"
                        >
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
