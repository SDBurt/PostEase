import * as React from "react"
import { Post } from "@prisma/client"

import TwitterPreview from "./twitter/twitter-preview"

interface PreviewProps {
  user: {
    imageUrl: string
    userName: string
    twitterHandle: string
  }
  post: Pick<Post, "id" | "content" | "status" | "scheduledAt">
}

export function Preview({ post, user }: PreviewProps) {
  return (
    <TwitterPreview
      post={{ id: post.id, content: post.content, status: post.status, scheduledAt: post.scheduledAt }}
      imageUrl={user.imageUrl}
      userName={user.userName}
      handle={user.twitterHandle}
    />
  )
}
