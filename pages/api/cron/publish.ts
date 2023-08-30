import { NextApiRequest, NextApiResponse } from "next"
import { verifySignature } from "@upstash/qstash/nextjs"

import { publishScheduledPosts } from "@/lib/actions"

async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    await publishScheduledPosts()
    res.status(200).end()
  } catch (err) {
    console.error(err)
    res.status(500).end()
  }
}

export default verifySignature(handler)

export const config = {
  api: {
    bodyParser: false,
  },
}
