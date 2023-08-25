import { Post } from "@prisma/client"

import { getAllPublishedPosts } from "@/lib/db/actions"
import { PageShell } from "@/components/admin/layout/page-shell"
import { PageHeader } from "@/components/admin/page-header"
import { PostItem } from "@/components/admin/posts/post"
import TestButtons from "@/components/admin/test/button"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

export const metadata = {
  title: "Published",
}

export default async function PublishedPage() {
  const posts: Post[] = await getAllPublishedPosts()

  return (
    <PageShell>
      <PageHeader heading="Posts" text="Create and manage posts.">
        {/* <Button onClick={testCron}>Text Cron Publish</Button> */}
        <div className="flex space-x-2">
          <TestButtons />
        </div>
      </PageHeader>
      <div>
        {posts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} hrefPrefix="/preview" />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any posts yet. Start creating content.
            </EmptyPlaceholder.Description>
          </EmptyPlaceholder>
        )}
      </div>
    </PageShell>
  )
}
