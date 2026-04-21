import { Request, Response } from "express";
import prisma from "@repo/db/prisma";
import chunker from "./chunker.js";
import embedderModel from "./embedderModel.js";
interface doc {
  title: string;
  content: string;
}

export const saveDocument = async (req: Request, res: Response) => {
  if (!req.userId) {
    return res.status(400).json({
      message: "Please login first",
    });
  }
  const { title, content }: doc = req.body;
  console.log(title + " " + content);
  if (!title || !content) {
    return res.status(400).json({
      message: "Missing title or document",
    });
  }
  await prisma.document.create({
    data: {
      title: title,
      content: content,
      userId: req.userId,
    },
  });
  const chunk = await chunker(content);
  const embed = await embedderModel(chunk);
  console.log(chunk);
  console.log(embed);

  return res.status(201).json({
    message: "File created successfully",
  });
};
export default saveDocument;
