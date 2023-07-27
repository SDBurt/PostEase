// drizzle.config.ts
import type { Config } from "drizzle-kit";
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env',
});

export default {
  schema: "./lib/db/schema",
  out: "./drizzle",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL as string,
  },
  driver: "pg",
  verbose: true
} satisfies Config;