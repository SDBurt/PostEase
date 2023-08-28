import React from "react"
import Link from "next/link"
import { Post } from "@prisma/client"

import { Skeleton } from "@/components/ui/skeleton"
import { PostOperations } from "@/components/admin/posts/post-operations"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

import { PostCreateButton } from "./create/button"
import { BadgeGroup } from "./post-badge-group"

interface PostItemProps {
  post: Post
  children: React.ReactNode
  hrefPrefix?: string
}

function PostItem({ post, children, hrefPrefix = "/editor" }: PostItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-2">
        <Link
          href={`${hrefPrefix}/${post.id}`}
          className="truncate font-semibold hover:underline"
        >
          {post.content && post.content.length > 0
            ? post.content[0]
            : "empty post"}
        </Link>
        <BadgeGroup post={post} />
      </div>
      {children}
    </div>
  )
}

PostItem.Skeleton = function PostItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}

interface PostListProps {
  posts: Post[]
}

function PostList({ posts }: PostListProps) {
  return (
    <div>
      {posts?.length ? (
        <div className="divide-y divide-border rounded-md border">
          {posts.map((post) => (
            <PostItem key={post.id} post={post}>
              <PostOperations post={{ id: post.id }} />
            </PostItem>
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
  )
}

export { PostItem, PostList }
