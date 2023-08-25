import * as React from "react"
import { Post } from "@prisma/client"

import TwitterPreview from "./twitter/twitter-preview"
import { Tweet } from "./twitter/tweet"

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
    <div className="flex flex-col space-y-4 items-center w-full">
    <TwitterPreview
      post={{ id: post.id, content: post.content, status: post.status, scheduledAt: post.scheduledAt }}
      imageUrl={user.imageUrl}
      userName={user.userName}
      handle={user.twitterHandle}
    />

    {post.tweet_ids && post.tweet_ids.length > 0 ? (
      <section>
        {post.tweet_ids.map(id => (
          <Tweet id={id} />
        ))}
      </section>
    ) : null}
    
    
    </div>
  )
}
