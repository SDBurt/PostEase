import { integer, pgTable, serial, timestamp, varchar, text } from "drizzle-orm/pg-core";


export const twitterPosts = pgTable('twitter_posts', {
  id: serial('id').primaryKey(),
  postId: integer('post_id').notNull(),
  userId: text('user_id').notNull(),
  tweetId: integer('tweet_id'),
  text: varchar('text', { length: 280 }).notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at")
});

