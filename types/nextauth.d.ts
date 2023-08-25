import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

export type ValidProviders = "twitter" | "linkedin"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's twitter oauth token. */
      id: string
      twitter?: {
        access_token: string
        refresh_token: string
        oauth_token: string
        oauth_token_secret: string
      }
    } & DefaultSession["user"]
  }

  interface Account {
    oauth_token?: string
    oauth_token_secret?: string
  }

}



declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string
    [key: string]: {
      access_token?: string
      refresh_token?: string
      oauth_token?: string
      oauth_token_secret?: string
    }
  }
}