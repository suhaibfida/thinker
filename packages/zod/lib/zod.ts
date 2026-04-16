import { z } from "zod";

export const userSchema = z.object({
  username: z.string().max(30).trim().toLowerCase(),
  email: z.email().max(30).trim().toLowerCase(),
  password: z.string().max(30).trim(),
});
