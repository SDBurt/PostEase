// import LinkedInProvider from "next-auth/providers/linkedin";

import { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "@/lib/db";
import { env } from "@/env.mjs";
import type { Adapter } from "next-auth/adapters";



export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db) as Adapter,
    secret: env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt",
      },
      pages: {
        signIn: "/login",
      },
    providers: [
        TwitterProvider({
            clientId: env.TWITTER_CLIENT_ID,
            clientSecret: env.TWITTER_CLIENT_SECRET
        }),
        // LinkedInProvider({
        //     clientId: env.LINKEDIN_CLIENT_ID,
        //     clientSecret: env.LINKEDIN_CLIENT_SECRET
        // })
  ],
  callbacks: {    
    async jwt({token, user, account, profile}) {

      if (user) {
        token.id = user.id
      }

      if (account && account.provider) {

        if (!token[account.provider]) {
          token[account.provider] = {};
        }
  
        if (account.access_token) {
          token[account.provider].access_token = account.access_token;
        }
  
        if (account.refresh_token) {
          token[account.provider].refresh_token = account.refresh_token;
        }

        if (account.oauth_token) {
          token[account.provider].oauth_token = account.oauth_token;
        }

        if (account.oauth_token_secret) {
          token[account.provider].oauth_token_secret = account.oauth_token_secret;
        }
      }

      return token
    },
    async session({ session, token, user }) {
        // Send properties to the client, like an access_token and user id from a provider.
        
        session.user.id = token.id
        session.user.twitter = token.twitter
        return session
    },
 },
}
