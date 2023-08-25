import { publishScheduledPosts } from "@/lib/actions";
import { verifySignature } from "@upstash/qstash/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(_req: NextApiRequest, res: NextApiResponse) {
  
  await publishScheduledPosts()

  res.status(200).end();
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};