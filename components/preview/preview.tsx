import * as React from "react"
import { Post } from "@prisma/client"

import { Tweet } from "./twitter/tweet"
import TwitterPreview from "./twitter/twitter-preview"

interface PreviewProps {
  user: {
    imageUrl: string
    userName: string
    twitterHandle: string
  }
  post: Pick<Post, "id" | "content" | "status" | "scheduledAt" | "tweet_ids">
}

export function Preview({ post, user }: PreviewProps) {
  return (
    <div className="flex w-full flex-col items-center space-y-4">
      <TwitterPreview
        post={{
          id: post.id,
          content: post.content,
          status: post.status,
          scheduledAt: post.scheduledAt,
        }}
        imageUrl={user.imageUrl}
        userName={user.userName}
        handle={user.twitterHandle}
      />

      {post.tweet_ids && post.tweet_ids.length > 0 ? (
        <section>
          {post.tweet_ids.map((id) => (
            <Tweet id={id} />
          ))}
        </section>
      ) : null}
    </div>
  )
}
