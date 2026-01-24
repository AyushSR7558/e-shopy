import VerificationEmail from "../../emails/Verification.js";
import { OtpError } from "../error/App.error.js";
import { resend } from "../resend/index.js";
import type { ApiResponse } from "../types/ApiResponse.email.js";

export const sendEmail = async (
  name: string,
  email: string,
  otp: string,
): Promise<ApiResponse> => {
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
  } catch (emailError) {
    console.log("Error sending otp", emailError);
    throw new OtpError();

  }
};
