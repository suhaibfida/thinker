import { Request, Response } from "express";
import prisma from "@repo/db/prisma";
import { loginSchema } from "@repo/zod/loginSchema";
const login = async (req: Request, res: Response) => {
  const safeParse = loginSchema.safeParse(req.body);
  if (!safeParse.success) {
    return res.status(400).json({
      message: safeParse.error.issues,
    });
  }
  let email;
  let username;
  if (safeParse.data.usernameOrEmail.includes("@")) {
    email = safeParse.data.usernameOrEmail;
  } else {
    username = safeParse.data.usernameOrEmail;
  }
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: username }, { email: email }],
      password: safeParse.data.password,
    },
  });
  if (user) {
  }
  return res.status(400).json({
    message: "User logged in successfully",
    username: user.username,
  });
};
export default login;
