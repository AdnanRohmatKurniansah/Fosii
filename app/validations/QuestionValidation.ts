import { z } from "zod"

export const QuestionSchema = z.object({
  title: z.string().min(20).max(255),
  description: z.string().min(20),
  tagId: z.number().refine(value => value >= 1, {
    message: "Tag is required",
  }),
  pic: z.any().refine((files) => files?.length != 0, "Image is required.") 
})

