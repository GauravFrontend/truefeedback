import { z } from "zod";

export const usernameValidation = z.string()

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email(),
    password: z.string().min(6, { message: "minimum should be 6 in password" })
})