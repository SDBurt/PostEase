import { NextApiRequest, NextApiResponse } from "next"
import { verifySignature } from "@upstash/qstash/nextjs"

async function handler(_req: NextApiRequest, res: NextApiResponse) {
  console.log("If this is printed, the signature has already been verified")

  res.status(200).end()
}

export default verifySignature(handler)

export const config = {
  api: {
    bodyParser: false,
  },
}
