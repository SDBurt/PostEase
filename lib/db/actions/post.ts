'use server'

import { getCurrentUser } from "@/lib/session"
import { Post } from "@prisma/client"
import { db } from "@/lib/db"

export async function createPost(data): Promise<{ id: Post["id"] }> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const newPostData = { ...data, userId: user.id }

  try {
    return db.post.create({
      data: newPostData,
      select: {
        id: true,
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to create post")
  }
}

export async function updatePost(postId, data): Promise<{ id: Post["id"] }> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.update({
      where: {
        id: postId,
        userId: user.id,
      },
      data,
      select: {
        id: true,
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to create post")
  }
}

export async function deletePost(
  postId: Post["id"]
): Promise<{ id: Post["id"] }> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    const result = await db.post.delete({
      where: {
        id: postId,
        userId: user.id,
      },
      select: {
        id: true,
      },
    })
    return result
  } catch (err) {
    console.error(err)
    throw new Error("Unable to delete post")
  }
}

