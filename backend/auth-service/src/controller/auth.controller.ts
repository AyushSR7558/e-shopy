import type { Request, Response, NextFunction } from "express";
import {
  checkOtpRestriction,
  sendOtp,
  trackOtpRequest,
  validateRegistrationData,
} from "../utils/auth.helper.js";
import { prisma } from "../db/prisma.js";
import { ValidationError } from "../error/App.error.js";

export const userRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    validateRegistrationData(req, "user");
    const { name, email } = req.body;
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existingUser) {
      throw new ValidationError(`User already exist with this email`);
    }
    console.log("Check Otp Restriction");
    await checkOtpRestriction(email, next);
    console.log("Track Reqest");
    await trackOtpRequest(email, next);
    console.log("Send OTP");
    await sendOtp(name, email);
    res.status(200).json({
      message: `Request send successfully`,
    });
  } catch (error) {
    return next(error);
  }
};
