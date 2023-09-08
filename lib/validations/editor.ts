import * as z from "zod"

export const editorFormSchema = z.object({
  title: z.string().min(1).max(128),
  tweets: z.array(
    z.object({
      text: z.string().min(5).max(280),
      length: z.number(),
      images: z.array(z.string()),
    })
  ),
  publishToTwitter: z.boolean().default(false),
  publishToLinkedin: z.boolean().default(false),
  linkedinContent: z.string().optional(),
  schedulePost: z.boolean().default(false),
  scheduledAtDate: z.date().nullable(),
  scheduledAt: z.string().nullable(), // select can't be date object
})
