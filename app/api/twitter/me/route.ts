import { env } from '@/env.mjs';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import OAuth from 'oauth-1.0a';
import { auth } from '@clerk/nextjs';

import Twitter from 'twitter-lite'

type TwitterToken = {
  access_token?: string
  refresh_token?: string
  oauth_token?: string
  oauth_token_secret?: string
}

async function getTwitterOAuthToken(userId: string): Promise<{key: string, secret: string}> {
  try {

    const res = await fetch(`https://api.clerk.com/v1/users/${userId}/oauth_access_tokens/oauth_twitter`, {
      headers: {
        "Authorization" : "Bearer " + env.CLERK_SECRET_KEY
      }
    })

    const tokens = await res.json()

    if (tokens.length === 0) {
      console.error("No oauth tokens from Clerk for Twitter")
      throw new Error("No oauth tokens from Clerk for Twitter")
    }

    console.log({token: tokens[0]})

    return {
      key: tokens[0].token,
      secret: tokens[0].token_secret
    }

  } catch (err) {
    console.error(err)
    throw new Error("Unable to get oauth tokens from Clerk for Twitter")
  }
  
}


export async function GET(
    req: NextRequest,
    res: NextResponse
  ) {
    try {


      const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });

      const { twitter } = token as {twitter: TwitterToken}

    
      if (!twitter || !twitter.oauth_token || !twitter.oauth_token_secret) {
        return new Response(JSON.stringify({status: "Missing tokens for auth"}), { status: 401 })
      }

      const endpointURL = `https://api.twitter.com/2/users/me`;

      const oauth = new OAuth({
        consumer: {
          key: env.TWITTER_CONSUMER_KEY,
          secret: env.TWITTER_CONSUMER_KEY_SECRET
        },
        signature_method: 'HMAC-SHA1',
        hash_function: (baseString, key) => crypto.createHmac('sha1', key).update(baseString).digest('base64')
      });

      const authHeader = oauth.toHeader(oauth.authorize({
        url: endpointURL,
        method: 'GET'
      }, {
        key: twitter.oauth_token,
        secret: twitter.oauth_token_secret,
      }));

      console.log({authHeader})

      const response = await fetch(endpointURL, {
        method: "GET",
        headers: {
          Authorization: authHeader["Authorization"],
        },
      });

      const result = await response.json()

      console.log(result)

      if (result.status === 200) {
        return new Response(JSON.stringify({
          status: "OK",
          message: "Success",
          data: result.data
        }), { status: 200 })
      } 

      else if (result.status === 401) {
        return new Response(JSON.stringify({
          status: "UNAUTHORIZED",
          message: "Unauthorized request",
          data: result.data
        }), { status: 401 })
      } 
    
      return new Response(JSON.stringify({
        status: "ERROR",
        message: "Error: No data",
        data: []
      }), { status: 500 })
  
    } catch (e) {
      console.error(e)
      return new Response(JSON.stringify({status: e.message}), { status: 500 })
    }
  }