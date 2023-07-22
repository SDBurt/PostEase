import { Button } from "@/components/ui/button";
import db from "@/lib/drizzle";
import { posts } from "@/lib/drizzle/schema";
// import { getPosts } from "@/lib/db/actions";

export async function getPosts() {
  try {
    return await db.select().from(posts);
  } catch(err) {
    console.error(err)
  }
}

export function GetPosts() {

  return (
    <Button onClick={getPosts}>
      Get All Posts
    </Button>
  )
}

export default GetPosts