import { z } from "zod"

export const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required')
})

export const registerSchema = z.object({
    name: z.string().min(1, 'Name is required').max(255),
    username: z.string().min(1, 'Username is required').max(255),
    password: z.string().min(1, 'Password is required')
})

