import { Request, Response } from "express";
import prisma from "@repo/db/prisma";
interface type {
  title: string;
  content: string;
}

export const content = async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(400).json({
      message: "Please login first",
    });
  }
  const { title, content }: type = req.body;
  if (!title || content) {
    return res.status(400).json({
      message: "Missing title or content",
    });
  }
  const user = await prisma.content.create({
    data: {
      title: title,
      content: content,
      userId: req.userId,
    },
  });
  return res.status(201).json({
    message: "File created successfully",
  });
};
export default content;
