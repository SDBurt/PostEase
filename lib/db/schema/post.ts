import {
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core"

export const statusEnum = pgEnum("status", ["draft", "scheduled", "published"])

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  title: varchar("title", { length: 256 }),
  content: text("content").array().notNull(),
  status: statusEnum("status").default("draft").notNull(),
  scheduledAt: timestamp("scheduled_at"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
})
