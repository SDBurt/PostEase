'use server'

import { InferModel } from "drizzle-orm";
import db from "../drizzle";
import { posts } from "../drizzle/schema";

type NewPost = InferModel<typeof posts, "insert">;

export async function getPosts() {
  try {
    console.log("GETPOSTS")
    const result = await db.select().from(posts);
    console.log(result);
  } catch(err) {
    console.error(err)
  }
  
}

export async function createPost(data: NewPost) {
  try {
    console.log("CREATEPOST")
    const result = await db.insert(posts).values(data).returning({ id: posts.id })
    console.log(result);
  } catch(err) {
    console.error(err)
  }
}