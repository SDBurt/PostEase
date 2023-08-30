import { Post, Status } from "@prisma/client"
import dayjs from "dayjs"

import { getAllPosts } from "@/lib/db/actions"
import { PageShell } from "@/components/admin/layout/page-shell"
import { PageHeader } from "@/components/admin/page-header"
import { PostCreateButton } from "@/components/admin/posts/create/button"
import { PostItem } from "@/components/admin/posts/post"
import { PostOperations } from "@/components/admin/posts/post-operations"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import EmptyListPlaceholder from "@/components/admin/empty-placeholder"

export const metadata = {
  title: "Admin",
}

export default async function AdminPage() {
  const posts = await getAllPosts()

  return (
    <PageShell>
      <PageHeader heading="Dashboard" text="Create and manage posts.">
        <PostCreateButton>Create Post</PostCreateButton>
      </PageHeader>
      <div>
        {posts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} hrefPrefix={post.status === Status.PUBLISHED ? "/preview" : "/editor"}>
                <PostOperations post={{ id: post.id }} />
              </PostItem>
            ))}
          </div>
        ) : (
          <EmptyListPlaceholder
            title="No posts created"
            description="You don't have any posts yet. Start creating content."
            iconName="post"
          >
            <PostCreateButton variant="outline">Create Post</PostCreateButton>
          </EmptyListPlaceholder>
        )}
      </div>
    </PageShell>
  )
}
