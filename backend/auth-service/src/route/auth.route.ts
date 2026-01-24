import { Router } from "express";
import { userRegistration } from "../controller/auth.controller.js";

const router = Router();

router.post("/signup", userRegistration);

export default router;
