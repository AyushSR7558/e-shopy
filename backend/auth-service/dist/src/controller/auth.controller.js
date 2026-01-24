import { validateRegistrationData } from "../utils/auth.helper.js";
import { prisma } from "../db/prisma.js";
import { ValidationError } from "../error/App.error.js";
export const userRegistration = async (req, res, next) => {
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
//# sourceMappingURL=auth.controller.js.map