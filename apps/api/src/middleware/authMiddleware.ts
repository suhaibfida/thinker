import { Request, Response, NextFunction } from "express";
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const cookie = req.cookies.token;
  console.log(cookie);
};
export default authMiddleware;
