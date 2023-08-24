'use server'

import { db } from "./db";
import { getCurrentUser } from "./session";
import { publishTweets } from "./twitter/actions";

export async function publishForUser(): Promise<any> {

  const now = new Date()

  // Get Token
  const user = await getCurrentUser()

  const { twitter } = user

  // Publish to Twitter
  const token = {
    key: twitter.oauth_token,
    secret: twitter.oauth_token_secret
  }


  // Get all posts that can be published
  const posts = await db.post.findMany({
    where: {
      scheduledAt: {
        lte: now
      },
      status: "SCHEDULED"
    }
  })

  let publishedTweets = []
  for (const post of posts) {

    const result = await publishTweets(token, post.content)

    publishedTweets.push({
      ...post,
      tweetIds: result
    })
  }

  // Update Database
  let promises = []
  publishedTweets.forEach(async post => {
    promises.push(await db.post.update({
        where: {
          id: post.id,
        },
        data: {
          status: "PUBLISHED",
          tweet_ids: post.tweetIds
        }
      }))
  });

  const res = await Promise.all(promises)

  console.log(res)

  return res

}

export async function publishScheduledPosts(): Promise<any> {

  const now = new Date()


    // Get all posts that can be published
    const posts = await db.post.findMany({
      where: {
        scheduledAt: {
          lte: now
        },
        status: "SCHEDULED"
      }
    })

  
    let publishedTweets = []
    for (const post of posts) {
  
      // There might be multiple accounts in the future
      // TODO: make something unique
      const account = await db.account.findFirst({
        where: {
          userId: post.userId,
          provider: "twitter"
        }
      })

      // Twitter
      const token = {
        key: account.oauth_token,
        secret: account.oauth_token_secret
      }

      const result = await publishTweets(token, post.content)
  
      publishedTweets.push({
        ...post,
        tweetIds: result
      })
    }
  
    // Update Database
    let promises = []
    publishedTweets.forEach(async post => {
      promises.push(await db.post.update({
          where: {
            id: post.id,
          },
          data: {
            status: "PUBLISHED",
            tweet_ids: post.tweetIds
          }
        }))
    });
  
  const res = await Promise.all(promises)

  return res

}