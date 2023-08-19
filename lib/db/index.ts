import { env } from '@/env.mjs';
import { InferModel } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { posts } from './schema';

const connectionString = env.DATABASE_URL
const client = postgres(connectionString)
export const db = drizzle(client);

// import { migrate } from "drizzle-orm/postgres-js/migrator";
// this will automatically run needed migrations on the database
// await migrate(db, { migrationsFolder: 'drizzle' });


export type Post = InferModel<typeof posts, "select">;