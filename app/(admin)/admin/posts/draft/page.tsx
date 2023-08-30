import { Post } from "@prisma/client"

import { getAllDraftPosts } from "@/lib/db/actions"
import { PostCreateButton } from "@/components/admin/posts/create/button"
import { PostItem } from "@/components/admin/posts/post"
import { PostOperations } from "@/components/admin/posts/post-operations"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { postLinkTabs } from "@/config/admin"
import LinkTabGroup from "@/components/admin/link-tab-group"
import EmptyListPlaceholder from "@/components/admin/empty-placeholder"

export const metadata = {
  title: "Drafts",
}

export default async function DraftPage() {
  const posts: Post[] = await getAllDraftPosts()

  return (
      <div>
        <div className="flex justify-between">
        <LinkTabGroup active="draft" tabs={postLinkTabs}/>
          <PostCreateButton variant="outline">Create Post</PostCreateButton>
        </div>
        
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
            title="No posts created"
            description="You don't have any posts yet. Start creating content."
            iconName="post"
          >
            <PostCreateButton variant="outline">Create Post</PostCreateButton>
          </EmptyListPlaceholder>
        )}
      </div>
  )
}
