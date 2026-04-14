import { Request, Response } from "express";

export const func = (req: Request, res: Response) => {
  console.log("hello");
};
