import { Suspense } from "react"
import { Post, Status } from "@prisma/client"

import { getAllDraftPosts } from "@/lib/db/actions"
import { PostCreateButton } from "@/components/admin/posts/create/button"
import { PostItem } from "@/components/admin/posts/post"
import { PostOperations } from "@/components/admin/posts/post-operations"
import { postLinkTabs } from "@/config/admin"
import LinkTabGroup from "@/components/admin/link-tab-group"
import EmptyListPlaceholder from "@/components/admin/empty-placeholder"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata = {
  title: "Drafts",
}

export default async function DraftPage() {
  const posts: Post[] = await getAllDraftPosts()

  return (
      <div>
        <div className="flex justify-between">
          <LinkTabGroup active="draft" tabs={postLinkTabs}/>
          <div className="fixed bottom-20 right-8 md:relative md:right-auto md:bottom-auto">
            <PostCreateButton variant="default">Create Post</PostCreateButton>
          </div>
        </div>
        <Suspense fallback={<Skeleton className="h-[50px] w-full" />}>
          {posts?.length ? (
            <div className="divide-y divide-border rounded-md border">
              {posts.map((post) => (
                <PostItem key={post.id} post={post} hrefPrefix="/editor">
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
        </Suspense>
      </div>
  )
}
