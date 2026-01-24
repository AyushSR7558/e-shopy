import VerificationEmail from "../../emails/Verification.js";
import { OtpError, ValidationError } from "../error/App.error.js";
import { resend } from "../resend/index.js";
export const sendEmail = async (name, email, otp) => {
    try {
        await resend.emails.send({
            from: "Acme <onboarding@resend.dev>",
            to: [email],
            subject: "hello world",
            react: VerificationEmail({ username: name, otp }),
        });
        return {
            success: true,
            message: `Otp send succesfully`,
        };
    }
    catch (emailError) {
        console.log("Error sending otp", emailError);
        throw new ValidationError(`Error in Sending OTP, Try again later`);
    }
};
//# sourceMappingURL=sendmail.js.map