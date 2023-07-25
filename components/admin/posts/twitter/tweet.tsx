import { UserAvatar } from "@/components/user-avatar";
import React from "react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { DotFilledIcon } from "@radix-ui/react-icons";

dayjs().format();
dayjs.extend(relativeTime);

interface TweetHeaderProps {
  userName: string;
  handle: string;
  createdAt: string;
}
interface TweetTextProps {
  text: string;
}

interface TweetProps {
  imageUrl?: string;
  userName: string;
  handle: string;
  text: string;
  createdAt: string;
  isThread?: boolean;
}

function TweetHeader({ userName, handle, createdAt }: TweetHeaderProps) {
  return (
    <div className="flex space-x-1 justify-start items-center">
      <h2 className="text-primary font-semibold">{userName}</h2>
      <h3 className="font-normal text-muted-foreground">
        {"@"}
        {handle}
      </h3>
      <DotFilledIcon className="h-3 w-3 text-muted-foreground" />
      <h3 className="font-normal text-muted-foreground flex ">
        {dayjs(createdAt).fromNow()}
      </h3>
    </div>
  );
}

function TweetText({ text }: TweetTextProps) {
  return <p className="text-primary">{text}</p>;
}

function TweetContainer({ children }: { children: React.ReactNode }) {
  return <div className="flex gap-2 p-2">{children}</div>;
}

function Tweet({
  imageUrl,
  userName,
  handle,
  text,
  createdAt,
  isThread = false,
}: TweetProps) {
  return (
    <TweetContainer>
      <div className="flex flex-col items-center">
        <UserAvatar name={userName} imageUrl={imageUrl} />
        {isThread && <div className="w-px h-full bg-muted" />}
      </div>
      <div>
        <TweetHeader
          userName={userName}
          handle={handle}
          createdAt={createdAt}
        />
        <TweetText text={text} />
      </div>
    </TweetContainer>
  );
}

export { TweetHeader, TweetText, TweetContainer, Tweet };

export default Tweet;
