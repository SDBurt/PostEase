import crypto from "crypto"
import { NextRequest, NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import OAuth from "oauth-1.0a"

import { env } from "@/env.mjs"
import { pingMe } from "@/lib/twitter/actions"

type TwitterToken = {
  access_token?: string
  refresh_token?: string
  oauth_token?: string
  oauth_token_secret?: string
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const token = await getToken({ req, secret: env.NEXTAUTH_SECRET })

    const { twitter } = token.provider

    if (!twitter || !twitter.oauth_token || !twitter.oauth_token_secret) {
      return new Response(
        JSON.stringify({ status: "Missing tokens for auth" }),
        { status: 401 }
      )
    }

    const result = await pingMe({
      key: twitter.oauth_token,
      secret: twitter.oauth_token_secret,
    })

    if (result.data) {
      return new Response(JSON.stringify(result), { status: 200 })
    }

    return new Response(
      JSON.stringify({
        message: "Error: No data",
      }),
      { status: 500 }
    )
  } catch (e) {
    console.error(e)
    return new Response(JSON.stringify({ message: e.message }), { status: 500 })
  }
}
