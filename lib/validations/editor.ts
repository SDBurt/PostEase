import * as z from "zod"

export const tweetImagesSchema = z.object({
  preview: z.string(),
  file: z.instanceof(Blob).optional(),
})

export const tweetItemSchema = z.object({
  text: z.string().min(5).max(280),
  length: z.number(),
  images: z.array(
    z.object({
      preview: z.string(),
      file: z.instanceof(Blob).optional(),
    })
  ),
})

export const editorFormSchema = z.object({
  title: z.string().min(1).max(128),
  tweets: z.array(tweetItemSchema),
  publishToTwitter: z.boolean().default(false),
  publishToLinkedin: z.boolean().default(false),
  linkedinContent: z.string().optional(),
  schedulePost: z.boolean().default(false),
  scheduledAtDate: z.date().nullable().default(null),
  scheduledAt: z.string().nullable().default(null), // select can't be date object
})
