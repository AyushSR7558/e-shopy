import { checkOtpRestriction, sendOtp, trackOtpRequest, validateRegistrationData, } from "../utils/auth.helper.js";
import { prisma } from "../db/prisma.js";
import { ValidationError } from "../error/App.error.js";
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
        await sendOtp(name, email);
        res.status(200).json({
            message: `Request send successfully`,
        });
    }
    catch (error) {
        console.log(error.message);
        throw error;
    }
};
//# sourceMappingURL=auth.controller.js.map