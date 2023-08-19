import TwitterProvider from "next-auth/providers/twitter";
// import LinkedInProvider from "next-auth/providers/linkedin";


import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import { env } from "@/env.mjs";
import { NextAuthOptions } from "next-auth";



export const authOptions: NextAuthOptions = {
    adapter: DrizzleAdapter(db),
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

      console.log("jwt", {token, user, account, profile})

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
      }

      return token
    },
    async session({ session, token, user }) {
        // Send properties to the client, like an access_token and user id from a provider.
        
        console.log("session", {session, token, user})
        
        session.user.id = token.id
        session.user.twitter = token.twitter
        return session
    },
 },
}
