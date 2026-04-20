import { Request, Response } from "express";
import prisma from "@repo/db/prisma";
import { RecursiveCharacterTextSplitter } from "@langchain/textSplitters";
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
  const create = await prisma.document.create({
    data: {
      title: title,
      content: content,
      userId: req.userId,
    },
  });
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 200,
    chunkOverlap: 0,
  });
  const text = await splitter.splitText(content);
  console.log(text);

  return res.status(201).json({
    message: "File created successfully",
  });
};
export default saveDocument;
