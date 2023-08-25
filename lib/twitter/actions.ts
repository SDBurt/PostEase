import { getRequest, postRequest } from "./utils"

type Token = {
  key: string
  secret: string
}

/**
 * Ping the users/me endpoint and return the response object
 * @param token Object with key and secret for twitter access
 * @returns Object with authenticated user data
 */
export async function pingMe(token: Token) {
  const endpointURL = `https://api.twitter.com/2/users/me`

  const result = await getRequest(token, endpointURL)

  return result
}

type PublishTweetResponse = {
  data: {
    id: string
    text: string
  }
  errors?: any
}

type PublishTweetBody = {
  text: string
  reply?: {
    in_reply_to_tweet_id: string
  }
}

/**
 * Publish tweets to twitter and return a list of tweet id's
 * @param token Object with key and secret for twitter access
 * @param content a list of strings containing the tweet thread
 * @returns A list of tweet id's
 */
export async function publishTweets(
  token: Token,
  content: string[]
): Promise<string[]> {
  const endpointURL = `https://api.twitter.com/2/tweets`

  let lastTweetID = null
  const results = []

  for (const text of content) {
    const body: PublishTweetBody = {
      text: text,
      ...(lastTweetID && { reply: { in_reply_to_tweet_id: lastTweetID } }),
    }

    const tweet: PublishTweetResponse = await postRequest(
      token,
      endpointURL,
      body
    )

    if (tweet?.errors) {
      console.error(tweet.errors)
      throw new Error("Something went wrong when posting tweets")
    }

    lastTweetID = tweet.data.id
    results.push(tweet.data.id)
  }

  return results
}
