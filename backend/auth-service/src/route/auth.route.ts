import { Router } from "express";
import { login, userRegistration, verifyUser } from "../controller/auth.controller.js";

const router = Router();

router.post("/user-registration", userRegistration);
router.post("/verify-user", verifyUser);
router.post("/login-user", login);

export default router;
