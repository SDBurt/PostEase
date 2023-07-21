import GetPosts from "@/components/admin/posts/get";
import CreatePost from "@/components/admin/posts/create";


export default async function AdminPage() {

  return (
    <main>
      <div className="flex flex-row space-x-2 p-8">
        <GetPosts />
        <CreatePost />
      </div>

    </main>
  )
}
