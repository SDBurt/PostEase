import { publishScheduledPosts } from "@/lib/actions";
import { verifySignature } from "@upstash/qstash/nextjs";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(_req: NextApiRequest, res: NextApiResponse) {
  try {
    await publishScheduledPosts()
    res.status(200).end();
  } catch(err) {
    res.status(500).end();
  }
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};