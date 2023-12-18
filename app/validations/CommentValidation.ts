import { z } from "zod"

export const AddCommenSchema = z.object({
    questionId: z.number().min(1),
    answerId: z.number().min(1),
    content: z.string().min(20)
})