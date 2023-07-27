import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const linkedinPosts = pgTable("linkedin_posts", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull(),
  userId: text("user_id").notNull(),
  linkedinPostId: integer("linkedin_post_id"),
  text: text("text").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
})
