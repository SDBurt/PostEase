import { env } from '@/env.mjs';
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import OAuth from 'oauth-1.0a';

type TwitterToken = {
  access_token?: string
  refresh_token?: string
  oauth_token?: string
  oauth_token_secret?: string
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

    const tweetPostRes = await fetch(endpointURL, {
      method: "GET",
      headers: {
        Authorization: authHeader["Authorization"],
      },
    });

    const result = await tweetPostRes.json()

    if (result.data) {
      return new Response(JSON.stringify({
        status: "OK",
        message: "Success",
        data: result.data
      }), { status: 200 })
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