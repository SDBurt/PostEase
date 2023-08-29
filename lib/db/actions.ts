"use server"

import { ScheduleType } from "@/types"
import { Post, Schedule, Status } from "@prisma/client"

import { db } from "@/lib/db"

import { getCurrentUser } from "../session"

export async function getPost(postId: Post["id"]): Promise<Post | null> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.findUnique({
      where: {
        id: postId,
        userId: user.id,
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to retrieve posts")
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to retrieve posts")
  }
}

export async function getAllPostByStatus(status: string): Promise<Post[]> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  const state = status.toUpperCase() as Status

  if (!(state in Status)) {
    throw new Error("not found")
  }

  try {
    return await db.post.findMany({
      where: {
        userId: user.id,
        status: state,
      },
      orderBy: {
        createdAt: "asc",
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to retrieve posts")
  }
}

export async function getAllDraftPosts(): Promise<Post[]> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.findMany({
      where: {
        userId: user.id,
        status: Status.DRAFT,
      },
      orderBy: {
        createdAt: "asc",
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to retrieve posts")
  }
}

export async function getAllScheduledPosts(): Promise<Post[]> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.findMany({
      where: {
        userId: user.id,
        status: Status.SCHEDULED,
      },
      orderBy: {
        createdAt: "asc",
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to retrieve posts")
  }
}

export async function getAllPublishedPosts(): Promise<Post[]> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.findMany({
      where: {
        userId: user.id,
        status: Status.PUBLISHED,
      },
      orderBy: {
        createdAt: "asc",
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to retrieve posts")
  }
}

export async function getAllOverdueScheduledPosts(): Promise<Post[]> {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.findMany({
      where: {
        userId: user.id,
        status: Status.SCHEDULED,
        scheduledAt: {
          lte: new Date(),
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to retrieve posts")
  }
}

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

