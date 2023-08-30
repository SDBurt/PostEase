import React from "react"
import Link from "next/link"
import { Post } from "@prisma/client"

import { Skeleton } from "@/components/ui/skeleton"
import { PostOperations } from "@/components/admin/posts/post-operations"
import { EmptyPlaceholder } from "@/components/empty-placeholder"

import { PostCreateButton } from "./create/button"
import { BadgeGroup } from "./post-badge-group"
import EmptyListPlaceholder from "../empty-placeholder"

interface PostItemProps {
  post: Post
  children: React.ReactNode
  hrefPrefix?: string
}

export function PostItem({ post, children, hrefPrefix = "/editor" }: PostItemProps) {
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
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-2">
        <Skeleton className="h-5 w-3/5" />
        <Skeleton className="h-5 w-2/5" />
      </div>
    </div>
  )
}