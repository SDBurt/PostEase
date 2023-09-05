import { notFound } from "next/navigation"

import { getPost } from "@/lib/db/actions"
import { getCurrentUser } from "@/lib/session"
import { Editor } from "@/components/editor/editor"
import { getSchedules } from "@/lib/db/actions/schedules"


interface EditorPageProps {
  params: { postId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user?.id) {
    notFound()
  }

  const { twitter } = user

  const { username, firstName, lastName, imageUrl } = twitter || {}

  const post = await getPost(params.postId)
  const schedules = await getSchedules()

  // const schedules = scheduleData?.schedule ? JSON.parse(scheduleData?.schedule as string) : []

  if (!post) {
    notFound()
  }

  return (
    <Editor
      post={{
        id: post.id,
        title: post.title,
        content: post.content,
        status: post.status,
        scheduledAt: post.scheduledAt,
      }}
      user={{
        twitterHandle: username || "undefined",
        userName: `${firstName} ${lastName}` || "undefined",
        imageUrl: imageUrl || "",
      }}
      schedules={schedules ?? []}
    />
  )
}
