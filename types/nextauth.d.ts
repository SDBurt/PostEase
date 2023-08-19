import NextAuth from "next-auth"

/**
 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
 */
interface Session {
    user: {
      /** The user's twitter oauth token. */
      id: string
      twitter?: {
        oauth_token: string
      }
    } & DefaultSession["user"]
  }