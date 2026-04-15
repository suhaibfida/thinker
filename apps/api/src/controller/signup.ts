import { Request, Response } from "express";
import prisma from "@repo/db/prisma";
import { userSchema } from "@repo/zod/userSchema";
import bcrypt from "bcrypt";

export const func = async (req: Request, res: Response) => {
  const safeParse = userSchema.safeParse(req.body);
  if (!safeParse.success) {
    return res.json({
      message: safeParse.error.issues,
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      OR: [
        { username: safeParse.data.username.trim().toLowerCase() },
        { email: safeParse.data.email.trim().toLowerCase() },
      ],
    },
  });
  if (
    user?.username === safeParse.data.username &&
    user?.email === safeParse.data.email
  ) {
    return res.json({
      message: "Username and email already exist",
    });
  } else if (user?.username === safeParse.data.username) {
    res.json({
      message: "username already taken",
    });
  } else if (user?.email === safeParse.data.email) {
    return res.json({
      message: "Email already taken ",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(safeParse.data.password, 10);
    const create = await prisma.user.create({
      data: {
        username: safeParse.data.username,
        email: safeParse.data.email,
        password: hashedPassword,
      },
    });
    return res.json({
      message: "Account created succesfully",
      user: create.username,
      emai: create.email,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Account already exists",
      });
    }
  }
};
