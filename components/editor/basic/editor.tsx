import * as React from "react"
import { Post } from "@prisma/client"

import TwitterForm from "./twitter/form"

interface EditorProps {
  user: {
    imageUrl: string
    userName: string
    twitterHandle: string
  }
  post: Pick<Post, "id" | "content" | "status" | "scheduledAt">
}

export function Editor({ post, user }: EditorProps) {
  return (
    <TwitterForm
      post={{ id: post.id, content: post.content, status: post.status, scheduledAt: post.scheduledAt }}
      imageUrl={user.imageUrl}
      userName={user.userName}
      handle={user.twitterHandle}
    />
  )
}
