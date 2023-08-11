import { db } from '@/lib/db'
 
/**
 * Publish all posts that are scheduled 
 */
export async function GET(
  req: Request,
) {
  try {

    const now = new Date()

    console.log(now)
    const posts = await db.post.findMany({
      where: {
        scheduledAt: {
          lte: now
        }
      }
    })

    console.log(posts)

    let promises = []
    posts.forEach(async post => {
      promises.push(await db.post.update({
          where: {
            id: post.id,
            status: "SCHEDULED"
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