import { publishScheduledPosts } from "@/lib/actions"

/**
 * Publish all posts that are scheduled
 */
export async function GET(req: Request) {
  try {
    await publishScheduledPosts()

    return new Response(null, { status: 200 })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}
