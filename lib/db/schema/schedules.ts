import {
  boolean,
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core"

export const schedules = pgTable("schedules", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").notNull(),
  userId: text("user_id").notNull(),
  recurring: boolean("recurring"),
  frequency: text("frequency"),
  nextOccurence: text("next_occurence").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
})

export const userSchedules = pgTable("user_schedules", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  // [ { h: 12, m: 0, days: [0, 1, 2, 3, 4] } ] 0 is sunday
  schedule: json("schedule").default({ schedule: [] }),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
})
