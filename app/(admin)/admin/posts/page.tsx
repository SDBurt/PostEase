import { redirect } from "next/navigation"

export const metadata = {
  title: "Posts",
}

export default async function AdminPage() {

  return redirect('/admin/posts/draft')
}
