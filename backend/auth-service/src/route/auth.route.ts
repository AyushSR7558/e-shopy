import { Router } from "express";
import { userRegistration, verifyUser } from "../controller/auth.controller.js";

const router = Router();

router.post("/user-registration", userRegistration);
router.post("/verify-user", verifyUser);

export default router;
