import React from "react"

import { dateFromNow } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { UserAvatar } from "@/components/user-avatar"

interface PostHeaderProps {
  userName: string
  headline: string
  createdAt: Date
}
interface PostTextProps {
  text: string
}

interface PostProps {
  imageUrl?: string
  userName: string
  headline: string
  text: string
  createdAt: Date
}

function PostHeader({ userName, headline, createdAt }: PostHeaderProps) {
  return (
    <div>
      <h2 className="text-primary font-semibold">{userName}</h2>
      <h3 className="text-sm font-normal text-muted-foreground">{headline}</h3>
      <div className="text-sm text-muted-foreground flex items-center justify-start space-x-px">
        <span className="font-normal text-muted-foreground space-x-2">
          {dateFromNow(createdAt)}
        </span>
        {/* <DotFilledIcon className="h-2 w-2" /> */}
        <span>{" • "}</span>
        <Icons.globe className="h-3 w-3" />
      </div>
    </div>
  )
}

function PostText({ text }: PostTextProps) {
  return <p className="text-primary">{text}</p>
}

function PostContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2 p-2">{children}</div>
}

function Post({ imageUrl, userName, headline, createdAt, text }: PostProps) {
  return (
    <PostContainer>
      <div className="flex flex-row gap-x-2">
        <UserAvatar name={userName} imageUrl={imageUrl} className="w-14 h-14" />
        <PostHeader
          userName={userName}
          headline={headline}
          createdAt={createdAt}
        />
      </div>
      <div>
        <PostText text={text} />
      </div>
    </PostContainer>
  )
}

export { PostHeader, PostText, PostContainer, Post }

export default Post
