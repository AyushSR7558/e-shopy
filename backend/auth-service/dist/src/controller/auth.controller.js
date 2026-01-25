import { checkOtpRestriction, sendOtp, trackOtpRequest, validateRegistrationData, verifyOtp, } from "../utils/auth.helper.js";
import { prisma } from "../db/prisma.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthenticationError, ValidationError } from "../error/App.error.js";
import { setCookie } from "../cookie/setCookie.js";
export const userRegistration = async (req, res, next) => {
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
        await checkOtpRestriction(email, next);
        await trackOtpRequest(email, next);
        await sendOtp(name, email, next);
        return res.status(200).json({
            message: `Request send successfully`,
        });
    }
    catch (error) {
        next(error);
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        const { email, name, password, otp } = req.body || {};
        if (!otp) {
            return next(new ValidationError("OTP missing"));
        }
        if (!email || !otp) {
            throw new ValidationError(`Insufficient Input! email and password is required!`);
        }
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            throw new ValidationError(`Invalid Email`);
        }
        await verifyOtp(req, next);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, password: hashedPassword, email },
        });
        return res.status(201).json({
            message: "User registered successfully!",
            success: true,
        });
    }
    catch (err) {
        return next(err);
    }
};
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            throw new ValidationError(`Insufficient data, email and password is required`);
        }
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            throw new ValidationError(`User with this email is not registered`);
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new AuthenticationError(`InValid password`);
        }
        const accessToken = jwt.sign({ id: user.id, role: "user" }, process.env.JWT_SECRET_KEY, {
            expiresIn: "15m",
        });
        const refreshToken = jwt.sign({ id: user.id, role: "user" }, process.env.ACCESS_JWT_SECRET_KEY, {
            expiresIn: "7d",
        });
        const updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken: refreshToken
            }
        });
        console.log(updatedUser);
        setCookie(res, "refresh_token", refreshToken);
        setCookie(res, "access_token", accessToken);
        res.status(200).json({
            message: "login successful",
            email: user.email,
            name: user.name,
        });
        // Store the refresh and access token in the httpOnly secure
    }
    catch (error) {
        return next(error);
    }
};
//# sourceMappingURL=auth.controller.js.map