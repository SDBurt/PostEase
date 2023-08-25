import { verifySignature } from "@upstash/qstash/nextjs";
import { publishScheduledPosts } from "@/lib/actions"



export async function GET(req: Request) {
  try {

    console.log("GET CRON PUBLISH")

    await verifySignature((req) => null)

    await publishScheduledPosts()

    return new Response(null, { status: 200 })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}



export async function POST(req: Request) {
  try {

    console.log("POST CRON PUBLISH")

    await verifySignature((req) => null)

    await publishScheduledPosts()

    return new Response(null, { status: 200 })
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}