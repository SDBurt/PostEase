import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
// import { z } from 'zod';

import { posts } from '@/lib/db/schema/post';


export const insertPostSchema = createInsertSchema(posts).pick({ title: true, text: true });
export const selectPostSchema = createSelectSchema(posts);


// Zod schema type is also inferred from the table schema, so you have full type safety
// const requestSchema = insertUserSchema.pick({ name: true, email: true });