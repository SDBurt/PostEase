import { pgTable, serial, text, varchar, integer, json } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm';
 
// Tables

export const tweets = pgTable('tweets', {
  id: serial('id').primaryKey(),
  text: varchar('text', { length: 256 }),
  tweetId: integer('tweet_id'),
  postId: text('post_id'),
  userId: text('user_id'),
});

export const linkedinPosts = pgTable('linkedin_posts', {
  id: serial('id').primaryKey(),
  linkedinPostId: integer('linkedin_post_id'),
  postId: text('post_id'),
  userId: text('user_id'),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }),
  text: text('text'),
  status: integer('status').default(42),
  userId: text('user_id'),
});


export const schedules = pgTable('schedules', {
  id: serial('id').primaryKey(),
  schedule: json('schedule').default({ schedule: [] }),
  userId: text('user_id'),
});

// Relations

export const postsRelations = relations(posts, ({ many }) => ({
	linkedinPosts: many(linkedinPosts),
  tweets: many(tweets),
}));

export const tweetsRelations = relations(tweets, ({ one }) => ({
	post: one(posts, {
		fields: [tweets.postId],
		references: [posts.id],
	}),
}));

export const linkedinPostsRelations = relations(linkedinPosts, ({ one }) => ({
	post: one(posts, {
		fields: [linkedinPosts.postId],
		references: [posts.id],
	}),
}));