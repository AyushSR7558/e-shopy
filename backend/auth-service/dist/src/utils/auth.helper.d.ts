import type { NextFunction, Request } from "express";
export declare const validateRegistrationData: (req: Request, role: "user" | "seller") => void;
export declare const checkOtpRestriction: (email: string, next: NextFunction) => Promise<void>;
export declare const sendOtp: (name: string, email: string) => Promise<void>;
export declare const trackOtpRequest: (email: string, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.helper.d.ts.map