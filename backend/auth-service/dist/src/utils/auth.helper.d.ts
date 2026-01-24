import type { Request } from "express";
export declare const validateRegistrationData: (req: Request, role: "user" | "seller") => void;
export declare const checkOtpRestriction: () => void;
export declare const sendOtp: (name: string, email: string) => Promise<void>;
//# sourceMappingURL=auth.helper.d.ts.map