import { AppError, OtpError, ValidationError } from "../error/App.error.js";
import crypt from "crypto";
import { redis } from "../redis/index.js";
import { error } from "console";
import { sendEmail } from "./sendmail.js";
const emailReg = /^\S+@\S+\.\S+$/;
export const validateRegistrationData = (req, role) => {
    const { name, email, password, phone_number, country } = req.body;
    if (!name ||
        !email ||
        !password ||
        (role == "seller" && (!phone_number || !country))) {
        throw new ValidationError(`Missing required fields`);
    }
    if (!emailReg.test(email)) {
        throw new ValidationError(`Invalid email address`);
    }
};
export const checkOtpRestriction = async (email, next) => {
    if (await redis.get(`otp_lock:${email}`)) {
        return next(new ValidationError(`Account locked due to multiple failed attempt. Try agina after some time!`));
    }
    if (await redis.get(`otp_spam_lock:${email}`)) {
        return next(new ValidationError(`Too many OTP request! Please wait one hour before requesting`));
    }
    if (await redis.get(`otp_cooldown:${email}`)) {
        return next(new ValidationError("Please wait 1 min before sending the request"));
    }
};
export const sendOtp = async (name, email) => {
    try {
        const otp = crypt.randomInt(1000, 9999).toString();
        await sendEmail(name, email, "1234");
        await redis.set(`otp:${email}`, otp, { ex: 300 });
        await redis.set(`otp_cooldown:${email}`, "1", { ex: 60 });
    }
    catch (error) {
        throw error;
    }
};
export const trackOtpRequest = async (email, next) => {
    const otpRequestKey = redis.get(`otp_request_count:${email}`);
    const otpRequests = Number(otpRequestKey) || 0;
    if (otpRequests >= 2) {
        await redis.set(`otp_spam_locked`, `locked`, { ex: 3600 }); // Lock for 1hr
        return next(new ValidationError(`Please wait 1 hr before requesting again`));
    }
    await redis.set(`otp_request_count:${email}`, otpRequests + 1, { ex: 3600 }); // Tracking request for one hour
};
//# sourceMappingURL=auth.helper.js.map