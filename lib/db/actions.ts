import { schedules } from './schema/schedules';
"use server"

import { auth } from "@clerk/nextjs"
import { Post, Schedule } from "@prisma/client"

import { db } from "@/lib/db"
import { ScheduleFormItem, ScheduleType } from '@/types';

export async function getPost(postId: Post["id"]): Promise<Post> {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.findUnique({
      where: {
        id: postId,
        userId,
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to retrieve posts")
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.findMany({
      where: {
        userId,
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to retrieve posts")
  }
}

export async function getAllDraftPosts(): Promise<Post[]> {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.findMany({
      where: {
        userId,
        status: "DRAFT",
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
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.findMany({
      where: {
        userId,
        status: "SCHEDULED",
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
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.findMany({
      where: {
        userId,
        status: "PUBLISHED",
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
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  const newPostData = { ...data, userId: userId }

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
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.update({
      where: {
        id: postId,
        userId,
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
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    const result = await db.post.delete({
      where: {
        id: postId,
        userId,
      },
      select: {
        id: true
      }
    })
    return result
  } catch (err) {
    console.error(err)
    throw new Error("Unable to delete post")
  }
}


export async function getUserSchedule(): Promise<Schedule> {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.schedule.findFirst({
      where: {
        userId,
      }
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to get schedules")
  }
}


export async function createUserSchedule(schedule?: ScheduleType[]): Promise<{ id: Schedule["id"] }> {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }


  const newScheduleData = schedule ? JSON.stringify(schedule) : JSON.stringify([])

  try {

    const schedule =  await db.schedule.findFirst({
      where: {
        userId,
      },
      select: {
        schedule: true
      }
    })

    if (schedule) {
      throw new Error("Schedule already exists")
    }

    return db.schedule.create({
      data: {
        schedule: newScheduleData,
        userId
      },
      select: {
        id: true,
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to create schedule")
  }
}

export async function editUserSchedule(id: Schedule["id"], newSchedule: string): Promise<{ id: Schedule["id"] }> {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }


  try {
    return db.schedule.update({
      where: {
        id
      },
      data: {
        schedule: newSchedule,
      },
      select: {
        id: true,
      },
    })
  } catch (err) {
    console.error(err)
    throw new Error("Unable to create schedule")
  }
}