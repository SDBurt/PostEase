import { UserAvatar } from "@/components/user-avatar";
import React from "react";

interface TweetProps {
  imageUrl?: string;
  userName: string;
  handle: string;
  text: string;
}

function Tweet({ imageUrl, userName, handle, text }: TweetProps) {
  return (
    <div className="grid grid-cols-10 gap-2">
      <div className="col-span-1 flex justify-end">
        <UserAvatar name={userName} imageUrl={imageUrl} />
      </div>
      <div className="col-span-9">
        <h2 className="text-primary font-semibold">
          {userName}

          <span className="font-normal text-muted-foreground">
            {" @"}
            {handle}
          </span>
        </h2>
        <p className="text-primary">{text}</p>
      </div>
    </div>
  );
}

export default Tweet;
