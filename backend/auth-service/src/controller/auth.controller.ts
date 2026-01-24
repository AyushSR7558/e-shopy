import type { Request, Response, NextFunction } from "express";
import { validateRegistrationData } from "../utils/auth.helper.js";
import { prisma } from "../db/prisma.js";
import { ValidationError } from "../error/App.error.js";

export const userRegistration = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  validateRegistrationData(req.body, "user");

  const { name, email } = req.body;
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!existingUser) {
    throw new ValidationError(`User already exist with this email`);
  }
};
