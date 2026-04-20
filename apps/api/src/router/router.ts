import { Router } from "express";
import { signup } from "../controller/signup.js";
import saveDocument from "../controller/saveDocument";
import test from "../controller/test.js";
import login from "../controller/login.js";
import authMiddleware from "../middleware/authMiddleware.js";
const router: Router = Router();
router.post("/auth/register", signup);
router.post("/auth/login", login);
router.post("/save/document", authMiddleware, saveDocument);

export default router;
