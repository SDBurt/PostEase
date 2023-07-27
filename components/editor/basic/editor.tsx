import * as React from "react"
import { Post } from "@prisma/client"

import TwitterForm from "./twitter/form"

interface EditorProps {
  user: {
    imageUrl: string
    userName: string
    twitterHandle: string
  }
  post: Pick<Post, "id" | "content" | "status">
}

export function Editor({ post, user }: EditorProps) {
  return (
    <TwitterForm
      post={{ id: post.id, content: post.content, status: post.status }}
      imageUrl={user.imageUrl}
      userName={user.userName}
      handle={"placeholder"}
    />
  )
}