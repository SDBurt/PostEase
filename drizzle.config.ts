import * as dotenv from "dotenv"
import type { Config } from "drizzle-kit"

dotenv.config()

// import { env } from 'env.mjs'

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is missing")
}

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config
