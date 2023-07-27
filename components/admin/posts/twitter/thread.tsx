import React from "react";
import Tweet, { TweetText } from "./tweet";

type Tweet = {
  imageUrl?: string;
  userName: string;
  handle: string;
  text: string;
  createdAt: Date;
};

interface TweetThreadProps {
  tweets: Tweet[];
}

function TweetThread({ tweets }: TweetThreadProps) {
  return (
    <div className="flex flex-col space-y-2">
      {tweets?.map((tweet) => {
        return (
          <Tweet
            imageUrl={tweet.imageUrl}
            userName={tweet.userName}
            handle={tweet.handle}
            createdAt={tweet.createdAt}
            isThread={tweets && tweets.length > 1}
          >
            <TweetText text={tweet.text} />
          </Tweet>
        );
      })}
    </div>
  );
}

export default TweetThread;
