import { verifySignature } from "@upstash/qstash/nextjs";
import { publishScheduledPosts } from "@/lib/actions"
import { NextApiRequest, NextApiResponse } from "next";

async function handler(_req: NextApiRequest, res: NextApiResponse) {
  console.log("If this is printed, the signature has already been verified");

  try {
    await publishScheduledPosts()
    res.status(200).end();
  } catch (error) {
    res.status(500).end();
  }
}

export default verifySignature(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};