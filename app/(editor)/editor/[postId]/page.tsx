import { notFound, redirect } from "next/navigation"

import { auth, redirectToSignIn } from "@clerk/nextjs"
import { getPost } from "@/lib/db/actions"
import { Post } from "@/lib/db/supabase"
import { Editor } from "@/components/editor/editor"

async function getPostForUser(postId: Post["id"], userId: Post["userId"]) {
  return await getPost(postId, userId)
}

interface EditorPageProps {
  params: { postId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await auth()

  if (!user?.userId) {
    redirectToSignIn()
  }

  const post = await getPostForUser(parseInt(params.postId), user.userId)

  if (!post) {
    notFound()
  }

  return (
    <Editor
      post={{
        id: post.id,
        title: post.title,
        text: post.text,
        status: post.status,
      }}
    />
  )
}