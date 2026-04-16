import { Router } from "express";
import { signup } from "../controller/signup.js";

const router: Router = Router();
router.post("/auth/register", signup);
// router.post("auth/login");

export default router;
