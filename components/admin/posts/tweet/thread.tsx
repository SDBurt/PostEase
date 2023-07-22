import React from "react";
import Tweet from "./tweet";

type Tweet = {
  imageUrl?: string;
  userName: string;
  handle: string;
  text: string;
};

interface TweetThreadProps {
  tweets: Tweet[];
}

function TweetThread({ tweets }: TweetThreadProps) {
  return (
    <div>
      {tweets?.map((tweet) => {
        return (
          <Tweet
            imageUrl={tweet.imageUrl}
            userName={tweet.userName}
            handle={tweet.handle}
            text={tweet.text}
          />
        );
      })}
    </div>
  );
}

export default TweetThread;
