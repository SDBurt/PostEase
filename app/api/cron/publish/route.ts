import { db } from '@/lib/db'
 
/**
 * Publish all posts that are scheduled 
 */
export async function GET(
  req: Request,
) {
  try {

    const now = new Date()

    const posts = await db.post.findMany({
      where: {
        scheduledAt: {
          lte: now
        },
        status: "SCHEDULED"
      }
    })

    // Will probably need to push to twitter here
    let promises = []
    posts.forEach(async post => {
      promises.push(await db.post.update({
          where: {
            id: post.id,
          },
          data: {
            status: "PUBLISHED"
          }
        }))
    });

    await Promise.all(promises)

    return new Response(null, { status: 200 })

  } catch (error) {
    return new Response(null, { status: 500 })
  }
}