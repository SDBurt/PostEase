import React from "react"
import { DotFilledIcon } from "@radix-ui/react-icons"

import { dateFromNow } from "@/lib/utils"
import { UserAvatar } from "@/components/user-avatar"

interface TweetHeaderProps {
  userName: string
  handle: string
  createdAt: Date
}
interface TweetTextProps {
  text: string
}

interface TweetProps {
  imageUrl?: string
  userName: string
  handle: string
  // text: string;
  children: React.ReactNode
  createdAt: Date
  isThread?: boolean
  showTimestamp?: boolean
}

function TweetHeader({ userName, handle, createdAt }: TweetHeaderProps) {
  return (
    <div className="flex space-x-1 justify-start items-center">
      <h2 className="text-primary font-semibold">{userName}</h2>
      <h3 className="font-normal text-muted-foreground">
        {"@"}
        {handle}
      </h3>
      {createdAt ? (
        <>
          <DotFilledIcon className="h-3 w-3 text-muted-foreground" />
          <h3 className="font-normal text-muted-foreground flex ">
            {dateFromNow(createdAt)}
          </h3>
        </>
      ) : null}
    </div>
  )
}

function TweetText({ text }: TweetTextProps) {
  return <p className="text-primary">{text}</p>
}

function TweetContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-2 p-2 w-full">{children}</div>
}

function Tweet({
  imageUrl,
  userName,
  handle,
  children,
  createdAt,
  isThread = false,
  showTimestamp = false,
}: TweetProps) {
  return (
    <TweetContainer>
      <div className="flex flex-col items-center">
        <UserAvatar name={userName} imageUrl={imageUrl} />
        {isThread && <div className="w-px h-full bg-muted" />}
      </div>
      <div className="w-full">
        <TweetHeader
          userName={userName}
          handle={handle}
          createdAt={showTimestamp && createdAt}
        />
        {children}
      </div>
    </TweetContainer>
  )
}

export { TweetHeader, TweetText, TweetContainer, Tweet }

export default Tweet
