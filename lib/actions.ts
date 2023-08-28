"use server"

import { Post, Status } from "@prisma/client"

import { db } from "./db"
import { getCurrentUser } from "./session"
import { publishTweets } from "./twitter/actions"

export async function publishForUser(): Promise<any> {
  const now = new Date()

  // Get Token
  const user = await getCurrentUser()

  const { twitter } = user

  // Publish to Twitter
  const token = {
    key: twitter.oauth_token,
    secret: twitter.oauth_token_secret,
  }

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
    const result = await publishTweets(token, post.content)

    publishedTweets.push({
      ...post,
      tweet_ids: result,
    })
  }

  // Update Database
  let res: Post[] = []
  for (const post of publishedTweets) {
    const updatedPost = await db.post.update({
      where: {
        id: post.id,
      },
      data: {
        status: Status.PUBLISHED,
        tweet_ids: post.tweet_ids,
      },
    })
    res.push(updatedPost)
  }

  return res
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
    const account = await db.account.findFirst({
      where: {
        userId: post.userId,
        provider: "twitter",
      },
    })

    if (account?.oauth_token && account?.oauth_token_secret) {
      // Create twitter token
      const token = {
        key: account.oauth_token,
        secret: account.oauth_token_secret,
      }

      const result = await publishTweets(token, post.content)

      publishedTweets.push({
        ...post,
        tweet_ids: result,
      })
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

  return {
    status: "SUCCESS",
    count: publishedTweets.length,
    data: results,
  }
}
