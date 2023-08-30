import { Post } from "@prisma/client"

import {
  getAllPendingScheduledPosts,
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
import PublishButton from "@/components/admin/cron/test-publish"
import TwitterWhoAmIButton from "@/components/twitter/whoami-button"

export const metadata = {
  title: "Published",
}

export default async function PublishedPage() {
  const posts: Post[] = await getAllPublishedPosts()
  const pending: Post[] = await getAllPendingScheduledPosts()

  return (
    <div>
      
      <div className="flex justify-between">
        <LinkTabGroup active="published" tabs={postLinkTabs}/>
            <div className="flex space-x-2">
              {
                process.env.NODE_ENV === "development" && (
                <PublishButton />
                )
              }
              <TwitterWhoAmIButton/>
            </div>
      </div>
      <div className="space-y-4">
        {pending?.length ? (
          <>
            <h2 className="font-heading text-xl md:text-2xl">Pending</h2>
            <div className="divide-y divide-border rounded-md border">
              {pending.map((post) => (
                <PostItem key={post.id} post={post} hrefPrefix="/preview">
                  <PostOperations post={{ id: post.id }} />
                </PostItem>
              ))}
            </div>
          </>
        ) : null}
        {pending?.length ? (
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
