import { Request, Response } from "express";

export const test = (req: Request, res: Response) => {
  console.log("hello from test");
};
export default test;
