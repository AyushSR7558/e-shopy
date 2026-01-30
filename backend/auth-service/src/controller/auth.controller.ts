import type { Request, Response, NextFunction } from "express";
import {
  checkOtpRestriction,
  sendOtp,
  trackOtpRequest,
  validateRegistrationData,
  verifyOtp,
} from "../utils/auth.helper.js";
import { prisma } from "../db/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthenticationError, ValidationError } from "../error/App.error.js";
import { setCookie } from "../cookie/setCookie.js";
import { error } from "console";

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

    await checkOtpRestriction(email);
    await trackOtpRequest(email);

    await sendOtp(name, email);
    return res.status(200).json({
      message: `Request send successfully`,
    });
  } catch (error: any) {
    next(error);
  }
};

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, name, password, otp } =
      (req.body as {
        email: string;
        name: string;
        password: string;
        otp: string;
      }) || {};
    if (!otp) {
      return next(new ValidationError("OTP missing"));
    }

    if (!email || !otp) {
      throw new ValidationError(
        `Insufficient Input! email and password is required!`,
      );
    }
    const emailRegex: RegExp = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      throw new ValidationError(`Invalid Email`);
    }
    await verifyOtp(email, otp);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, password: hashedPassword, email },
    });
    return res.status(201).json({
      message: "User registered successfully!",
      success: true,
    });
  } catch (err) {
    return next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError(
        `Insufficient data! email and password is required`,
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new ValidationError(`User with this email is not registered`);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new AuthenticationError(`InValid password`);
    }

    const accessToken = jwt.sign(
      { id: user.id, role: "user" },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "15m",
      },
    );

    const refreshToken = jwt.sign(
      { id: user.id, role: "user" },
      process.env.ACCESS_JWT_SECRET_KEY as string,
      {
        expiresIn: "7d",
      },
    );

    setCookie(res, "refresh_token", refreshToken);
    setCookie(res, "access_token", accessToken);

    res.status(200).json({
      message: "login successful",
      email: user.email,
      name: user.name,
    });

    // Store the refresh and access token in the httpOnly secure
  } catch (error) {
    return next(error);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw new ValidationError(`Insufficinet data, email is required!`);
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new ValidationError(`User with this email is not registered`);
    }
    await checkOtpRestriction(email);
    await trackOtpRequest(email);
    await sendOtp(user.name, email);
    res.status(200).json({
      message: "OTP send to your email. Please verify your account!",
    });
  } catch (error) {
    return next(error);
  }
};

export const verifyUserForgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      throw new ValidationError(`Insufficient data! email and otp is required`);
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new ValidationError(`User with this email is not registered`);
    }
    await verifyOtp(email, otp);

    res.status(200).json({
      message: "OTP verified. You can now reset your password",
    });
  } catch (error) {
    next(error);
  }
};

export const resetUserPassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      throw new ValidationError(
        `Insufficient data! email and newPassword is required.`,
      );
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new ValidationError(`User is not registered to eshopy`);
    }
    const oldPasswordhash = user.password;

    const isSamePassword = await bcrypt.compare(newPassword, oldPasswordhash);
    if (isSamePassword) {
      throw new ValidationError(`New password cannot have the smae value`);
    }
    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email },
      data: {
        password: newHashedPassword,
      },
    });

    res.send(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    return next(error);
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refresh_token } = req.cookies;
    if (!refresh_token) {
      throw new AuthenticationError("Refresh token is missing");
    }

    const { id, role } = jwt.verify(
      refresh_token,
      process.env.ACCESS_JWT_SECRET_KEY as string,
    ) as { id: string; role: string };

    if (!id || !role) {
      throw new AuthenticationError("Invalid refresh token");
    }

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AuthenticationError("Invalid refresh token");
    }
    const accessToken = jwt.sign(
      { id: user.id, role: "user" },
      process.env.JWT_SECRET_KEY as string,
      {
        expiresIn: "15m",
      },
    );
    setCookie(res, "access_token", accessToken);
    res.send({
      sucess: true,
      message: "Access Token delivered sucessfully",
    });
  } catch (err) {
    return next(err);
  }
};

export const getUserInfo = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = req.user;
    res.status(200).send({
      success: true,
      user,
    });
  } catch (err) {
    next(err);
  }
};
