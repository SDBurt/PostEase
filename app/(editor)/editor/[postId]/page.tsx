import { notFound, redirect } from "next/navigation"
import { Post } from "@prisma/client"

import { getPost } from "@/lib/db/actions"
import { Editor } from "@/components/editor/basic/editor"
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

  const {id, name, image, twitter} = user

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
      }}
      user={{
        twitterHandle: name,
        userName: `${name} ${name}`,
        imageUrl: image,
      }}
    />
  )
}
