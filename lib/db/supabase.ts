import { drizzle } from 'drizzle-orm/postgres-js'
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres'
 
import { InferModel } from 'drizzle-orm'
import { twitterPosts } from '@/lib/db/schema/twitter'
import { linkedinPosts } from '@/lib/db/schema/linkedin'
import { schedules, userSchedules } from '@/lib/db/schema/schedules'
import { posts } from '@/lib/db/schema/post'
import { env } from "@/env.mjs"

export type Post  = InferModel<typeof posts>;
export type TwitterPost = InferModel<typeof twitterPosts>;
export type LinkedinPost = InferModel<typeof linkedinPosts>;
export type Schedule = InferModel<typeof schedules>;
export type UserSchedule = InferModel<typeof userSchedules>;

export type NewPost  = InferModel<typeof posts, 'insert'>;
export type NewTwitterPost = InferModel<typeof twitterPosts, 'insert'>;
export type NewLinkedinPost = InferModel<typeof linkedinPosts, 'insert'>;
export type NewSchedule = InferModel<typeof schedules, 'insert'>;
export type NewUserSchedule = InferModel<typeof userSchedules, 'insert'>;


const connectionString = env.DATABASE_URL
const client = postgres(connectionString)
const db = drizzle(client)

export default db

