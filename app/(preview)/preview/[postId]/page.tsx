import { notFound } from "next/navigation"
import { Post } from "@prisma/client"

import { getPost } from "@/lib/db/actions"
import { Preview } from "@/components/preview/preview"
import { getCurrentUser } from "@/lib/session"

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

  const { name, image, twitter} = user

  return (
    <Preview
      post={{
        id: post.id,
        content: post.content,
        status: post.status,
        scheduledAt: post.scheduledAt,
      }}
      user={{
        twitterHandle: name,
        userName: `${name} ${name}`,
        imageUrl: image,
      }}
    />
  )
}
