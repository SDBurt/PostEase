import crypto from "crypto"
import OAuth from "oauth-1.0a"

import { env } from "@/env.mjs"

type Token = {
  key: string
  secret: string
}

const oauth = new OAuth({
  consumer: {
    key: env.TWITTER_CONSUMER_KEY,
    secret: env.TWITTER_CONSUMER_KEY_SECRET,
  },
  signature_method: "HMAC-SHA1",
  hash_function: (baseString, key) =>
    crypto.createHmac("sha1", key).update(baseString).digest("base64"),
})

export async function getOAuthHeader(
  token: Token,
  endpoint: string,
  method: string
) {
  return oauth.toHeader(
    oauth.authorize(
      {
        url: endpoint,
        method: method,
      },
      {
        key: token.key,
        secret: token.secret,
      }
    )
  )
}

/**
 *
 * @param token OAuth token key and secret
 * @param endpoint GET request endpoint. Expects valid twitter API endpoints
 * @returns GET request response object
 */
export async function getRequest(token: Token, endpoint: string): Promise<any> {
  const authHeader = await getOAuthHeader(token, endpoint, "GET")

  const res = await fetch(endpoint, {
    method: "GET",
    headers: {
      Authorization: authHeader["Authorization"],
    },
  })

  return await res.json()
}

/**
 *
 * @param token OAuth token key and secret
 * @param endpoint POST request endpoint. Expects valid twitter API endpoints
 * @param data object containing post request data
 * @returns POST request response object
 */
export async function postRequest(
  token: Token,
  endpoint: string,
  data: unknown
): Promise<any> {
  const authHeader = await getOAuthHeader(token, endpoint, "POST")

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      Authorization: authHeader["Authorization"],
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  })

  return await res.json()
}
