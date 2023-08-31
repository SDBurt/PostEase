'use server'

import { env } from "@/env.mjs"
import { getAuth } from "./session"

type SuccessfulResponse = {
  object: string,
  token: string,
  provider: string,
  public_metadata: {[key: string]: string},
  label: string,
  scopes: string[],
  token_secret: "string"
}[]

type ErrorResponse = {
  errors: {
    message: string,
    long_message: string,
    code: string,
    meta: {},
    clerk_trace_id: string
  }[]
  meta: {[key: string]: string}
}

export async function getUserAccessTokens(
  userId: string,
  provider: string
): Promise<{token?: {key: string, secret: string}, error?: string}> {
  
  const response = await fetch(`https://api.clerk.com/v1/users/${userId}/oauth_access_tokens/${provider}`, {
    headers: {
      Authorization: `Bearer ${env.CLERK_SECRET_KEY}`
    }
  })

  const result =  await response.json()

  if ((result as ErrorResponse).errors) {
    return {
      error: result.errors && result.errors.length > 0 ? result.errors[0].message : "Something went wrong"
    }
  }

  if ((result as SuccessfulResponse).length === 0 || !result[0].token || !result[0].token_secret) {
    return {
      error: "missing token and/or secret"
    }
  }

  return {
    token: {
      key: result[0].token as string,
      secret: result[0].token_secret as string
    }
  }
}