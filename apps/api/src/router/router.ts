import { Router } from "express";
import { func } from "../controller/signup.js";

const router: Router = Router();
router.post("/register", func);

export default router;
