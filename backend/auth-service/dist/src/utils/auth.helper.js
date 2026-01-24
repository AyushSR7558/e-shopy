import { AppError, OtpError, ValidationError } from "../error/App.error.js";
import crypt from "crypto";
import { redis } from "../redis/index.js";
import { error } from "console";
import { sendEmail } from "./sendmail.js";
const emailReg = /^\S+@\S+\.\S+$/;
export const validateRegistrationData = (req, role) => {
    const { name, emailId, password, phone_number, country } = req.body;
    if (!name ||
        !emailId ||
        !password ||
        (role == "seller" && (!phone_number || !country))) {
        throw new ValidationError(`Missing required fields`);
    }
    if (!emailReg.test(emailId)) {
        throw new ValidationError(`Invalid email address`);
    }
};
export const checkOtpRestriction = () => { };
export const sendOtp = async (name, email) => {
    try {
        const otp = crypt.randomInt(1000, 9999).toString();
        sendEmail(name, email, "1234");
        await redis.set(`otp:${email}`, otp, { ex: 300 });
        await redis.set(`otp_cooldown:${email}`, { ex: 60 });
    }
    catch (error) {
        if (error instanceof AppError) {
            throw error;
        }
        throw new AppError("Unexpected error in OTP flow", 500);
    }
};
//# sourceMappingURL=auth.helper.js.map