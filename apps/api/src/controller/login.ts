import { Request, Response } from "express";
import prisma from "@repo/db/prisma";
import "dotenv/config";
import { loginSchema } from "@repo/zod/loginSchema";
import bcrypt from "bcrypt";
const login = async (req: Request, res: Response) => {
  const jwtSecret = process.env.JWT_SECRET;
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
  console.log(email);
  console.log(username);

  const find = await prisma.user.findFirst({
    where: {
      OR: [{ username: username }, { email: email }],
    },
  });
  if (!find) {
    return res.status(400).json({
      message: "User doesn't exist",
    });
  }
  const compare = bcrypt.compare(safeParse.data.password, find.password);
  if (!compare) {
    return res.status(400).json({
      message: "Password is incorrect",
    });
  }

  res.cookie("token", find.id, {
    httpOnly: true,
    secure: process.env.LIVE === "production" ? true : false,
    sameSite: "lax",
    maxAge: 28 * 24 * 60 * 60 * 1000,
  });

  return res.status(400).json({
    message: "User logged in successfully",
    username: find.username,
  });
};
export default login;
