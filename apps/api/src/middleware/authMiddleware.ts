import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import "dotenv/config";
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
interface JwtCustomPayload extends JwtPayload {
  id: string;
}
const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = process.env.JWT_SECRET;
  if (!token) {
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
  const cookie = req.cookies.token;
  const verify = jwt.verify(cookie, token);
  if (!verify) {
    return res.status(400).json({
      message: "Please logout first then relogin",
    });
  }
  console.log(verify);
  req.userId = (verify as JwtCustomPayload).id;
  next();
};
export default authMiddleware;
