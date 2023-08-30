import { Post } from "@prisma/client"

import {
  getAllOverdueScheduledPosts,
  getAllPublishedPosts,
} from "@/lib/db/actions"
import { PageShell } from "@/components/admin/layout/page-shell"
import { PageHeader } from "@/components/admin/page-header"
import { PostItem } from "@/components/admin/posts/post"
import { PostOperations } from "@/components/admin/posts/post-operations"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import LinkTabGroup from "@/components/admin/link-tab-group"
import { postLinkTabs } from "@/config/admin"
import EmptyListPlaceholder from "@/components/admin/empty-placeholder"

export const metadata = {
  title: "Published",
}

export default async function PublishedPage() {
  const posts: Post[] = await getAllPublishedPosts()
  const overdue: Post[] = await getAllOverdueScheduledPosts()

  return (
    <div>
      
      <div className="flex justify-between">
        <LinkTabGroup active="published" tabs={postLinkTabs}/>
      </div>
      <div className="space-y-4">
        {overdue?.length ? (
          <>
            <h2 className="font-heading text-xl md:text-2xl">Overdue</h2>
            <div className="divide-y divide-border rounded-md border">
              {overdue.map((post) => (
                <PostItem key={post.id} post={post} hrefPrefix="/preview">
                  <PostOperations post={{ id: post.id }} />
                </PostItem>
              ))}
            </div>
          </>
        ) : null}
        {overdue?.length ? (
          <h2 className="font-heading text-xl md:text-2xl">Published</h2>
        ) : null}
        {posts?.length ? (
          <div className="divide-y divide-border rounded-md border">
            {posts.map((post) => (
              <PostItem key={post.id} post={post} hrefPrefix="/preview">
                <PostOperations post={{ id: post.id }} />
              </PostItem>
            ))}
          </div>
        ) : (
          <EmptyListPlaceholder
            title="No posts published"
            description="You don't have any posts yet. Published posts will show here."
            iconName="post"
          >
          </EmptyListPlaceholder>
        )}
      </div>
      </div>
  )
}
