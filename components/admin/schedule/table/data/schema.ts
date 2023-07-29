import { z } from "zod"


/* 

[
  { h: 12, m: 0, days: [0, 1, 2, 3, 4] }
] 




*/

// export const scheduleSchema = z.object({
//   id: z.string(),
//   title: z.string(),
//   status: z.string(),
//   label: z.string(),
//   priority: z.string(),
// })

export const scheduleSchema = z.object({
  id: z.string(),
  time: z.string(),
  "0": z.boolean(),
  "1": z.boolean(),
  "2": z.boolean(),
  "3": z.boolean(),
  "4": z.boolean(),
  "5": z.boolean(),
  "6": z.boolean(),
  "7": z.boolean(),
})

export type Schedule = z.infer<typeof scheduleSchema>