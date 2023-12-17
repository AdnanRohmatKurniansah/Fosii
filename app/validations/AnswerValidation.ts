import { z } from "zod"

export const AddAnswerSchema = z.object({
    questionId: z.number().min(1),
    content: z.string().min(20)
})