import { checkOtpRestriction, sendOtp, trackOtpRequest, validateRegistrationData, verifyOtp, } from "../utils/auth.helper.js";
import { prisma } from "../db/prisma.js";
import bcrypt from "bcrypt";
import { ValidationError } from "../error/App.error.js";
export const userRegistration = async (req, res, next) => {
    console.log("Request");
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
        console.log("Request");
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
        const { email, name, password, otp } = req.body;
        if (!email || !otp) {
            throw new ValidationError(`Insufficient Input`);
        }
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!emailRegex.test(email)) {
            throw new ValidationError(`Invalid Email`);
        }
        await verifyOtp(req.body, next);
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: { name, password: hashedPassword, email }
        });
        return res.status(201).json({
            message: "User registered successfully!",
            success: true
        });
    }
    catch (err) {
        return next(err);
    }
};
//# sourceMappingURL=auth.controller.js.map