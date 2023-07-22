import CreatePost from "@/components/admin/posts/create";
import { getPosts } from "@/lib/db/actions";
import db from "@/lib/drizzle";
import { posts } from "@/lib/drizzle/schema";
import { InferModel } from "drizzle-orm";

type Posts = InferModel<typeof posts, "select">;

export default async function AdminPage() {


  const posts = await getPosts()


  return (
    <main>
      <div className="flex flex-row space-x-2 p-8">
        {/* <GetPosts /> */}
        <CreatePost />
      </div>
      <div className="flex flex-col space-y-2 p-8">
        {
          posts && posts.length > 0 ? (
            posts.map((post) => {
              return (
                <div className="p-2 border rounded">{post.title}</div>
              )
            })
          ) : (
            <div><p>No Posts</p></div>
          )
        }
      </div>

    </main>
  )
}
