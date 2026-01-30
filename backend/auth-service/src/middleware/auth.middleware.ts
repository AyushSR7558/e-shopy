import type { Request, Response, NextFunction } from "express";
import { AuthenticationError } from "../error/App.error.js";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma.js";
import type { User } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { access_token } = req.cookies;

    if (!access_token) {
      throw new AuthenticationError("Missing access token");
    }

    const { id, role } = jwt.verify(
      access_token,
      process.env.JWT_SECRET_KEY as string,
    ) as { id: string; role: string };

    if (!id || !role) {
      throw new AuthenticationError("Invalid access token");
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new AuthenticationError("Invlaid access token");
    }

    req.user = user;

    return next();
  } catch (err) {
    next(err);
  }
};


export default isAuthenticated;