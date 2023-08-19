import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    DATABASE_URL: z.string().min(1),
    NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
    GITHUB_ACCESS_TOKEN: z.string().min(1),
    TWITTER_CLIENT_ID: z.string().min(1),
    TWITTER_CLIENT_SECRET: z.string().min(1),
    // LINKEDIN_CLIENT_ID: z.string().min(1),
    // LINKEDIN_CLIENT_SECRET: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID,
    TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET,
    // LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
    // LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
    GITHUB_ACCESS_TOKEN: process.env.GITHUB_ACCESS_TOKEN,
  },
})
