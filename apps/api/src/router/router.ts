import { Router } from "express";
import { signup } from "../controller/signup.js";
import saveDocument from "../controller/saveDocument";
import test from "../controller/test";
import login from "../controller/login";
import {query} from "../controller/query"
import authMiddleware from "../middleware/authMiddleware";
const router: Router = Router();
router.post("/auth/register", signup);
router.post("/auth/login", login);
router.post("/save/document", authMiddleware, saveDocument);
router.post("/user/query", authMiddleware, query);

export default router;
