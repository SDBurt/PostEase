import { relations } from "drizzle-orm";
import { linkedinPosts } from "./linkedin";
import { twitterPosts } from "./twitter";
import { posts } from "./post";
import { schedules } from "./schedules";

// A post can have multiple twitter posts
// A post can have one linkedin post
// A post can have one schedule
export const postsRelations = relations(posts, ({ many, one }) => ({
	linkedinPosts: one(linkedinPosts),
  twitterPosts: many(twitterPosts),
	schedule: one(schedules)
}));

// A twitter post has one parent post record
export const twitterPostsRelations = relations(twitterPosts, ({ one }) => ({
	post: one(posts, {
		fields: [twitterPosts.postId],
		references: [posts.id],
	}),
}));

// A linkedin post has one parent post record
export const linkedinPostsRelations = relations(linkedinPosts, ({ one }) => ({
	post: one(posts, {
		fields: [linkedinPosts.postId],
		references: [posts.id],
	}),
}));


// A scheduled post has one parent post record
export const schedulesRelations = relations(schedules, ({ one }) => ({
	post: one(posts, {
		fields: [schedules.postId],
		references: [posts.id],
	}),
}));