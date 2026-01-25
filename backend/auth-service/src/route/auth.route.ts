import { Router } from "express";
import { forgotPassword, login, resetUserPassword, userRegistration, verifyUser, verifyUserForgotPassword } from "../controller/auth.controller.js";

const router = Router();

router.post("/user-registration", userRegistration);
router.post("/verify-user", verifyUser);
router.post("/login-user", login);
router.post("/forgot-password-user", forgotPassword);
router.post("/reset-password-user", resetUserPassword);
router.post("/verify-forgot-password-user",verifyUserForgotPassword)
export default router;
