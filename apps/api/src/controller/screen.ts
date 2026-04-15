import { Request, Response } from "express";
import prisma from "@repo/db/prisma";

export const func = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  console.log(email, password);
  const user = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: password,
    },
  });
  res.json({
    message: "Account created succesfully",
  });
};
