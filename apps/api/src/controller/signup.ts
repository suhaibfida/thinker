import { Request, Response } from "express";
import prisma from "@repo/db/prisma";
import { userSchema } from "@repo/zod/userSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
export const signup = async (req: Request, res: Response) => {
  const safeParse = userSchema.safeParse(req.body);
  const jwtSecret = process.env.JWT_SECRET;
  console.log(jwtSecret)
  if (!jwtSecret) {
    return res.status(500).json({
      message: "Something is wrongg",
    });
  }
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
    return res.json({
      message: "username already taken",
    });
  } else if (user?.email === safeParse.data.email) {
    return res.json({
      message: "Email already taken ",
    });
  }
  try {
    const hashedPassword = await bcrypt.hash(safeParse.data.password, 10);
    const user = await prisma.user.create({
      data: {
        username: safeParse.data.username,
        email: safeParse.data.email,
        password: hashedPassword,
      },
    });

    const jwtToken = await jwt.sign({ id: user.id }, jwtSecret);
    if (!jwtToken) {
      return res.status(400).json({
        message: "Session timed out.",
      });
    }
    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: process.env.LIVE === "production" ? true : false,
      sameSite: "lax",
      maxAge: 28 * 24 * 60 * 60 * 1000,
    });
    return res.json({
      message: "Account created succesfully",
      user: user.username,
      emai: user.email,
    });
  } catch (error: any) {
    if (error.code === "P2002") {
      return res.status(400).json({
        message: "Account already exists",
      });
    }
  }
  return;
};
