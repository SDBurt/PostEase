import { NextResponse } from "next/server"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

import { r2 } from "@/lib/r2"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    console.log(data)

    console.log(`Generating an upload URL!`)

    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: `filename.pdf`,
      }),
      { expiresIn: 60 }
    )

    console.log(`Success generating upload URL!`)

    return NextResponse.json({ url: signedUrl })
  } catch (err) {
    console.error(err)
    return NextResponse.json(null, { status: 500 })
  }
}
