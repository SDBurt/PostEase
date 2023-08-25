import crypto from "crypto"
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import OAuth from "oauth-1.0a"

import { env } from "@/env.mjs"
import { publishTweets } from "@/lib/twitter/actions"

type TwitterToken = {
  access_token?: string
  refresh_token?: string
  oauth_token?: string
  oauth_token_secret?: string
}

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret: env.NEXTAUTH_SECRET })

    const { twitter } = token.provider as { twitter: TwitterToken }

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
    console.error(e)
    return new Response(JSON.stringify({ message: e.message }), { status: 500 })
  }
}
