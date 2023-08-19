import { env } from '@/env.mjs';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

export async function GET(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    try {

    const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });

    console.log('token', {token});

    return new Response(JSON.stringify({
      status: "OK",
      data: []
    }), { status: 200 })
  
    } catch (e) {
      console.error(e)
      return new Response(JSON.stringify({status: e.message}), { status: 500 })
    }
  }