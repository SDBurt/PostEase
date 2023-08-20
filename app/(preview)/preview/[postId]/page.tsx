import { notFound } from "next/navigation"
import { auth, currentUser, redirectToSignIn } from "@clerk/nextjs"
import { Post } from "@prisma/client"

import { getPost } from "@/lib/db/actions"
import { Preview } from "@/components/preview/preview"

async function getPostForUser(postId: Post["id"], userId: Post["userId"]) {
  return await getPost(postId)
}

interface EditorPageProps {
  params: { postId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  
  const user = await currentUser()

  if (!user?.id) {
    redirectToSignIn()
  }

  const post = await getPostForUser(params.postId, user.id)

  if (!post) {
    notFound()
  }

  const {imageUrl, username, firstName, lastName} = user.externalAccounts.find(account => account.provider === "oauth_twitter")

  return (
    <Preview
      post={{
        id: post.id,
        content: post.content,
        status: post.status,
        scheduledAt: post.scheduledAt,
      }}
      user={{
        twitterHandle: username,
        userName: `${firstName} ${lastName}`,
        imageUrl: imageUrl,
      }}
    />
  )
}
