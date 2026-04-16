import { z } from "zod";

export const userSchema = z.object({
  username: z
    .string()
    .max(30)
    .trim()
    .toLowerCase()
    .refine(
      (item) => {
        if (item.includes("@")) {
          return false;
        }
        return true;
      },
      {
        message: "Please enter the valid username without special characters.",
      },
    ),
  email: z.email().max(30).trim().toLowerCase(),
  password: z.string().max(30).trim(),
});
export const loginSchema = z.object({
  usernameOrEmail: z.string().trim().toLowerCase(),
  password: z.string().trim().toLowerCase(),
});
