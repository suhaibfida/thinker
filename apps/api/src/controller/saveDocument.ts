import { Request, Response } from "express";
import prisma from "@repo/db/prisma";
import chunker from "./chunker.js";
import embedderModel from "./embedderModel.js";
import  {Prisma} from "@repo/db/prisma"
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
  if(!chunk){
    return res.status(400).json({
      message:"Falied to convert data"
    })
  }
  const embed = await embedderModel(chunk);
    if(!embed){
    return res.status(400).json({
      message:"Falied to convert data"
    })
  }
  
const vector=embed.map(item=>({
  values:[...(item.values??[])]
}))
const user=await prisma.user.findUnique({

  where:{
    id:req.userId
  }
})
const oldVectors = Array.isArray(user?.vectors)
  ? (user.vectors as Prisma.JsonArray)
  : [];
const find = await prisma.user.update({
  where: {
    id: req.userId
  },
  data: {
    vectors: [...oldVectors,vector]as Prisma.JsonArray,
    chunks: {
      push: chunk
    }
  }
});
const vectors = find.vectors as unknown as number[][];
  console.log(vectors[0]); // ✅ TypeScript knows it exists


  return res.status(201).json({
    message: "File created successfully",
  });
};
export default saveDocument;
