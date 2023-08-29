import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { PostCreateButton } from "./create/button";

interface EmptyScreenProps {
  description: string
}

export default function EmptyScreen({
  description
}: EmptyScreenProps) {
  

  return (
    <EmptyPlaceholder>
      <EmptyPlaceholder.Icon name="post" />
      <EmptyPlaceholder.Title>No posts created</EmptyPlaceholder.Title>
      <EmptyPlaceholder.Description>
        You don&apos;t have any posts yet. Start creating content.
      </EmptyPlaceholder.Description>
      <PostCreateButton variant="outline">Create Post</PostCreateButton>
    </EmptyPlaceholder>
  )
}