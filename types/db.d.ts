import { Post, Schedule } from "@prisma/client";

// Posts
export type NewPost = Pick<Post, "title">
export type GetPost = Pick<Post, "id" | "title" | "content" | "scheduledAt" | "status">
export type UpdatePost = Pick<Post, "id" | "title" | "content" | "scheduledAt" | "status">
export type PublishPost = Pick<Post, "id" | "status" | "tweet_ids" | "linkedin_id">
export type DeletePost = Pick<Post, "id">

// Schedules
export type NewSchedule = Pick<Schedule, "title" | "isDefault">
export type GetSchedule = Pick<Schedule, "id" | "title" | "schedule" | "isDefault" | "timezone">
export type UpdateSchedule = Pick<Schedule, "id" | "title" | "schedule" | "isDefault" | "timezone">
export type DeleteSchedule = Pick<Schedule, "id">