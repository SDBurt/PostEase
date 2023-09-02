"use server"

import { Post, Status } from "@prisma/client"

import { db } from "./db"
import { getAuth } from "./session"
import { publishTweets } from "./twitter/actions"
import { getUserAccessTokens } from "./clerk"

export async function publishForUser(): Promise<any> {
  const now = new Date()
  
  // Get Token
  const user = await getAuth()

  if (!user) {
    return {
      error: "unauthorized"
    }
  }
  const { token, error } = await getUserAccessTokens(user.id, "oauth_twitter")

  if (error || !token) {
    throw new Error(error || "No token")
  }

  // Get all posts that can be published
  const posts = await db.post.findMany({
    where: {
      scheduledAt: {
        lte: now,
      },
      status: Status.SCHEDULED,
      userId: user.id
    },
  })

  let publishedTweets: Post[] = []
  for (const post of posts) {
    const result = await publishTweets(token, post.content)

    publishedTweets.push({
      ...post,
      tweet_ids: result,
    })
  }

  // Update Database
  let results: UpdatedPostReturnType[] = []
  for (const post of publishedTweets) {
    results.push(
      await db.post.update({
        where: {
          id: post.id,
        },
        data: {
          status: Status.PUBLISHED,
          tweet_ids: post.tweet_ids,
        },
        select: {
          id: true,
          tweet_ids: true,
          status: true,
          scheduledAt: true,
        }
      })
    )
  }

  return {
    status: "SUCCESS",
    count: publishedTweets.length,
    data: results,
  }
}

type UpdatedPostReturnType = Pick<
  Post,
  "id" | "tweet_ids" | "status" | "scheduledAt"
>

export async function publishScheduledPosts(): Promise<{
  status: string
  count: number
  data: UpdatedPostReturnType[]
}> {
  const now = new Date()

  // Get all posts that can be published
  const posts = await db.post.findMany({
    where: {
      scheduledAt: {
        lte: now,
      },
      status: Status.SCHEDULED,
    },
  })

  

  let publishedTweets: Post[] = []
  for (const post of posts) {
    // Get account for post's user

    const { token, error } = await getUserAccessTokens(post.userId, "oauth_twitter")

    if (!error && token?.key && token?.secret) {

      // Note: Ran into auth error from user account, resulting in a block
      // try-catch is fix for now TODO: fix this
      try {
        const result = await publishTweets(token, post.content)
        publishedTweets.push({
          ...post,
          tweet_ids: result,
        })
      } catch(err) {
        console.error(err)
      }
    }

    else {
      console.error(error ? error : "unable to publish tweet")
    }
  }

  

  // Update Database
  const results: UpdatedPostReturnType[] = []
  for (const post of publishedTweets) {
    results.push(
      await db.post.update({
        where: {
          id: post.id,
        },
        data: {
          status: Status.PUBLISHED,
          tweet_ids: post.tweet_ids,
        },
        select: {
          id: true,
          tweet_ids: true,
          status: true,
          scheduledAt: true,
        },
      })
    )
  }

  console.log(`${posts.length} posts to publish - ${publishedTweets.length} posts publish to twitter - ${results.length} records updated`)

  return {
    status: "SUCCESS",
    count: publishedTweets.length,
    data: results,
  }
}
