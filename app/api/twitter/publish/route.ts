import { env } from '@/env.mjs';
import { getToken } from 'next-auth/jwt';

import crypto from 'crypto';
import OAuth from 'oauth-1.0a';
import { NextRequest, NextResponse } from 'next/server';

type TwitterToken = {
  access_token?: string
  refresh_token?: string
  oauth_token?: string
  oauth_token_secret?: string
}

export async function POST(
    req: NextRequest,
    res: NextResponse
  ) {
    try {

      const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });

      const { twitter } = token as {twitter: TwitterToken}

      if (!twitter || !twitter.oauth_token || !twitter.oauth_token_secret) {
        return new Response(JSON.stringify({status: "Missing tokens for auth"}), { status: 401 })
      }

      const endpointURL = `https://api.twitter.com/2/tweets`;

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
        method: 'POST'
      }, {
        key: twitter.oauth_token,
        secret: twitter.oauth_token_secret,
      }));

      const body = await req.json()
      
      let lastTweetID = null;
      const results = []
      for (const text of body?.text) {
        
        const body = {
          text: text,
          reply: lastTweetID ?? {
            in_reply_to_tweet_id: lastTweetID
          }
        }

        const res = await fetch(endpointURL, {
          method: "POST",
          headers: {
            Authorization: authHeader["Authorization"],
            "content-type": "application/json"
          },
          body: JSON.stringify(body)
        });
        const tweet = await res.json()
        if (tweet.errors) {
          console.error(tweet.errors)
          return new Response(JSON.stringify({status: "Something went wrong when posting tweets"}), { status: 500 })
        }
        lastTweetID = tweet.data.id;
        results.push(tweet)
      }

      return new Response(JSON.stringify({
        status: "OK",
        message: "Success",
        data: results
      }), { status: 200 })
  
    } catch (e) {
      console.error(e)
      return new Response(JSON.stringify({status: e.message}), { status: 500 })
    }
  }