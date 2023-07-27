'use server'

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs";
import { Post } from "@prisma/client";


export async function getPost(postId: Post["id"]): Promise<Post> {

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.findUnique({
      where: {
        id: postId,
        userId
      },
    })
  } catch(err) {
    console.error(err)
    throw new Error("Unable to retrieve posts")
  }
  
}

export async function getAllPosts(): Promise<Post[]> {

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.findMany({
      where: {
        userId
      },
    })
  } catch(err) {
    console.error(err)
    throw new Error("Unable to retrieve posts")
  }
}

export async function getAllDrafts(): Promise<Post[]> {

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.findMany({
      where: {
        userId,
        status: 'DRAFT'
      },
      orderBy: {
        createdAt: 'asc',
      }
    })
    
  } catch(err) {
    console.error(err)
    throw new Error("Unable to retrieve posts")
  }
}

export async function getAllScheduled(): Promise<Post[]> {

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.findMany({
      where: {
        userId,
        status: 'SCHEDULED'
      },
      orderBy: {
        createdAt: 'asc',
      }
    })
  } catch(err) {
    console.error(err)
    throw new Error("Unable to retrieve posts")
  }
}

export async function getAllPublished(): Promise<Post[]> {

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.findMany({
      where: {
        userId,
        status: 'PUBLISHED'
      },
      orderBy: {
        createdAt: 'asc',
      }
    })
  } catch(err) {
    console.error(err)
    throw new Error("Unable to retrieve posts")
  }
}

export async function createPost(data): Promise<{id: Post["id"]}> {

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized")
  }

  const newPostData = {...data, userId: userId}

  try {
    return db.post.create({
      data: newPostData,
      select: {
        id: true,
      },
    })
  } catch(err) {
    console.error(err)
    throw new Error("Unable to create post")
  }
}

export async function updatePost(postId, data): Promise<{id: Post["id"]}> {

  const { userId } = await auth();

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
        id: true
      }
    })
  } catch(err) {
    console.error(err)
    throw new Error("Unable to create post")
  }
}

export async function deletePost(postId: Post["id"]): Promise<{id:  Post["id"]}> {

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.post.delete({
      where: {
        id: postId,
        userId,
      },
    })
  } catch(err) {
    console.error(err)
    throw new Error("Unable to delete post")
  }

}