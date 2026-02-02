import z from "zod";

export const loginUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password cannot exceed 20 characters"),
});

export type LoginUserInput = z.infer<typeof loginUserSchema>;
