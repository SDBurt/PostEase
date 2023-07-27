'use server'

import { eq, and } from "drizzle-orm";
import db from "@/lib/db/supabase";
import { posts } from '@/lib/db/schema/post'
import type { Post, NewPost } from "@/lib/db/supabase";
import { auth } from "@clerk/nextjs";


export async function getPost(postId: Post["id"], userId: Post["userId"]): Promise<Post> {


  try {
    const result = await db.select().from(posts).where(and(eq(posts.userId, userId), eq(posts.id, postId)));
    return result[0]

  } catch(err) {
    console.error(err)
    throw new Error("Unable to retrieve post")
  }
}

export async function getAllPosts(): Promise<Post[]> {

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    const result = await db.select().from(posts).where(eq(posts.userId, userId)).orderBy(posts.createdAt);
    return result
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
    const result = await db
      .select()
      .from(posts)
      .where(and(eq(posts.userId, userId), eq(posts.status, 'draft')))
      .orderBy(posts.createdAt);


    return result
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
    const result = await db
      .select()
      .from(posts)
      .where(and(eq(posts.userId, userId), eq(posts.status, 'scheduled')))
      .orderBy(posts.createdAt);

    return result
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
    const result = await db
      .select()
      .from(posts)
      .where(and(eq(posts.userId, userId), eq(posts.status, 'published')))
      .orderBy(posts.createdAt);

    return result
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

  const newPostData: NewPost = {...data, userId: userId}

  try {
    const result = await db.insert(posts).values(newPostData).returning({ id: posts.id})
    console.log("NEW POST: ", result)
    return result[0]
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
    const result = await db.update(posts).set(data).where(eq(posts.id, postId)).returning({ id: posts.id })
    console.log("UPDATE POST: ", result)
    return result[0]
  } catch(err) {
    console.error(err)
    throw new Error("Unable to create post")
  }
}

export async function deletePost(postId: Post["id"]): Promise<{id:  Post["id"]}[]> {

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    const result = await db.delete(posts).where(eq(posts.id, postId)).returning({ id: posts.id });
    return result
  } catch(err) {
    console.error(err)
    throw new Error("Unable to delete post")
  }

}