import { Router } from "express";
import {
  forgotPassword,
  getUserInfo,
  login,
  refreshAccessToken,
  resetUserPassword,
  userRegistration,
  verifyUser,
  verifyUserForgotPassword,
} from "../controller/auth.controller.js";
import isAuthenticated from "../middleware/auth.middleware.js";

const router = Router();

router.post("/user-registration", userRegistration);
router.post("/verify-user", verifyUser);
router.post("/login-user", login);
router.post("/forgot-password-user", forgotPassword);
router.post("/reset-password-user", resetUserPassword);
router.post("/verify-forgot-password-user", verifyUserForgotPassword);
router.post("/refresh-access-token-user", refreshAccessToken);
router.get("/logged-in-user", isAuthenticated, getUserInfo);
export default router;
