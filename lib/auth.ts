// import LinkedInProvider from "next-auth/providers/linkedin";

import { PrismaAdapter } from "@auth/prisma-adapter"
import { NextAuthOptions } from "next-auth"
import type { Adapter } from "next-auth/adapters"
import TwitterProvider from "next-auth/providers/twitter"

import { env } from "@/env.mjs"
import { ValidProviders } from "@/types/nextauth"
import { db } from "@/lib/db"

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
      clientId: env.TWITTER_CONSUMER_KEY,
      clientSecret: env.TWITTER_CONSUMER_KEY_SECRET,
    }),
    // LinkedInProvider({
    //     clientId: env.LINKEDIN_CLIENT_ID,
    //     clientSecret: env.LINKEDIN_CLIENT_SECRET
    // })
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id
      }

      if (account && account.provider) {
        if (!token[account.provider as ValidProviders]) {
          token[account.provider] = {}
        }

        if (account.access_token) {
          token[account.provider].access_token = account.access_token
        }

        if (account.refresh_token) {
          token[account.provider].refresh_token = account.refresh_token
        }

        if (account.oauth_token) {
          token[account.provider].oauth_token = account.oauth_token
        }

        if (account.oauth_token_secret) {
          token[account.provider].oauth_token_secret =
            account.oauth_token_secret
        }
      }

      return token
    },
    async session({ session, token, user }) {
      session.user.id = token.id
      session.user.twitter = token.twitter
      return session
    },
  },
}
