
import { EmptyPlaceholder } from "@/components/empty-placeholder"
// import { PostCreateButton } from "@/components/post-create-button"
import { PostItem } from "@/components/admin/posts/post"
import { PageHeader } from "@/components/admin/page-header"
import { Post } from "@/lib/db/supabase"
import { getAllScheduled } from "@/lib/db/actions"
import { PageShell } from "@/components/admin/layout/page-shell"

export const metadata = {
  title: "Queued",
}

export default async function DashboardPage() {

  const posts: Post[] = await getAllScheduled()

  return (
    <PageShell>
      <PageHeader heading="Posts" text="Create and manage posts.">
        {/* <PostCreateButton /> */}
      </PageHeader>
      <div>
        {posts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
            {/* <PostCreateButton variant="outline" /> */}
          </EmptyPlaceholder>
        )}
      </div>
    </PageShell>
  )
}