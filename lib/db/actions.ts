'use server'

import { InferModel, eq } from "drizzle-orm";
import db from "@/lib/drizzle";
import { posts } from "@/lib/drizzle/schema";
import { auth } from "@clerk/nextjs";

type NewPost = InferModel<typeof posts, "insert">;

type Post = InferModel<typeof posts, "select">;

export async function getPosts() {

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    return await db.select().from(posts).where(eq(posts.userId, userId));
  } catch(err) {
    console.error(err)
  }
}

export async function createPost(data: NewPost) {

  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized")
  }

  try {
    console.log("CREATEPOST")
    console.log(data)
    const result = await db.insert(posts).values({...data, userId: userId}).returning({ id: posts.id })
    console.log(result);
    return result
  } catch(err) {
    console.error(err)
  }
}