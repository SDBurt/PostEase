import crypto from "crypto"
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import OAuth from "oauth-1.0a"

import { env } from "@/env.mjs"
import { publishTweets } from "@/lib/twitter/actions"

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret: env.NEXTAUTH_SECRET })

    if (!token) {
      return new Response(
        JSON.stringify({
          message: "Error: Unauthorized",
        }),
        { status: 401 }
      )
    }

    const { twitter } = token

    if (!twitter || !twitter.oauth_token || !twitter.oauth_token_secret) {
      return new Response(
        JSON.stringify({ status: "Missing tokens for auth" }),
        { status: 401 }
      )
    }

    const body = await req.json()

    const results = await publishTweets(
      {
        key: twitter.oauth_token,
        secret: twitter.oauth_token_secret,
      },
      body.text
    )

    return new Response(
      JSON.stringify({
        data: results,
      }),
      { status: 200 }
    )
  } catch (e) {
    console.error("error during Publish Post")
    return new Response(JSON.stringify({ message: e.message }), { status: 500 })
  }
}
