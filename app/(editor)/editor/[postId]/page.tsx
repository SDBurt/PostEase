import { notFound, redirect } from "next/navigation"
import { Post } from "@prisma/client"

import { getPost } from "@/lib/db/actions"
import { getCurrentUser } from "@/lib/session"
import { Editor } from "@/components/editor/basic/editor"
import { currentUser } from "@clerk/nextjs"
import { ExternalAccount } from "@clerk/nextjs/dist/types/server"

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

  const { id, twitter } = user

  const { username, firstName, lastName, imageUrl } = twitter || {}

  const post = await getPostForUser(params.postId, id)

  if (!post) {
    notFound()
  }

  return (
    <Editor
      post={{
        id: post.id,
        content: post.content,
        status: post.status,
        scheduledAt: post.scheduledAt,
      }}
      user={{
        twitterHandle: username || "undefined",
        userName: `${firstName} ${lastName}` || "undefined",
        imageUrl: imageUrl || "",
      }}
    />
  )
}
