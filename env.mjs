import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    // This is optional because it's only used in development.
    // See https://next-auth.js.org/deployment.
    DATABASE_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_FRONTEND_API: z.string().min(1),
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    CLERK_SECRET_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: z.string().min(1),
    GITHUB_ACCESS_TOKEN: z.string().min(1),
    TWITTER_CONSUMER_KEY: z.string().min(1),
    TWITTER_CONSUMER_KEY_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },
  runtimeEnv: {
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLERK_FRONTEND_API: process.env.NEXT_PUBLIC_CLERK_FRONTEND_API,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
    TWITTER_CONSUMER_KEY: process.env.TWITTER_CONSUMER_KEY,
    TWITTER_CONSUMER_KEY_SECRET: process.env.TWITTER_CONSUMER_KEY_SECRET
  },
})
