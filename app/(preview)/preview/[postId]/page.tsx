import { notFound } from "next/navigation"
import { Post } from "@prisma/client"
import { Tweet } from "react-tweet"

import { getPost } from "@/lib/db/actions"
import { getCurrentUser } from "@/lib/session"
import { Preview } from "@/components/preview/preview"

async function getPostForUser(postId: Post["id"], userId: Post["userId"]) {
  return await getPost(postId)
}

interface EditorPageProps {
  params: { postId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user?.id) {
    notFound()
  }

  const post = await getPostForUser(params.postId, user.id)

  if (!post) {
    notFound()
  }

  const { name, image } = user

  return (
    <Preview
      post={{
        id: post.id,
        content: post.content,
        status: post.status,
        scheduledAt: post.scheduledAt,
        tweet_ids: post.tweet_ids,
      }}
      user={{
        twitterHandle: String(name).replace(" ", "_"),
        userName: name,
        imageUrl: image,
      }}
    />
  )
}
