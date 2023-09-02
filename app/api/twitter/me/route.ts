import { NextRequest, NextResponse } from "next/server"

import { env } from "@/env.mjs"
import { pingMe } from "@/lib/twitter/actions"
import { auth } from "@clerk/nextjs"
import { getAuth } from "@/lib/session"
import { getUserAccessTokens } from "@/lib/clerk"




export async function GET(req: NextRequest, res: NextResponse) {
  try {


    const provider = "oauth_twitter"
    const user = await getAuth()

    if (!user) {
      return new Response(
        JSON.stringify({ status: "Unauthorized" }),
        { status: 401 }
      )
    }

    const { token, error } = await getUserAccessTokens(user.id, provider)
    
    if (error) {
      return new Response(JSON.stringify({ message: error }), { status: 500 })
    }

    if (!token) {
      return new Response(JSON.stringify({ message: "No token" }), { status: 401 })
    }

    const result = await pingMe(token)

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
