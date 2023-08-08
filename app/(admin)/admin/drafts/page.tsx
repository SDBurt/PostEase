import { Post } from "@prisma/client"

import { getAllDraftPosts } from "@/lib/db/actions"
import { PageShell } from "@/components/admin/layout/page-shell"
import { PageHeader } from "@/components/admin/page-header"
import { PostCreateButton } from "@/components/admin/posts/create/button"
import { PostItem } from "@/components/admin/posts/post"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export const metadata = {
  title: "Drafts",
}

export default async function DashboardPage() {
  const posts: Post[] = await getAllDraftPosts()

  return (
    <PageShell>
      <PageHeader heading="Drafts" text="Create and manage posts.">
        <PostCreateButton />
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
            <PostCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </PageShell>
  )
}
