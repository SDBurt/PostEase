import React from "react";
import Tweet from "./tweet";

type Tweet = {
  imageUrl?: string;
  userName: string;
  handle: string;
  text: string;
  createdAt: string;
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
            text={tweet.text}
            createdAt={tweet.createdAt}
            isThread={tweets && tweets.length > 1}
          />
        );
      })}
    </div>
  );
}

export default TweetThread;
