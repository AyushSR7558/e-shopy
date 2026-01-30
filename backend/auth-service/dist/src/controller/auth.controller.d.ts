import type { Request, Response, NextFunction } from "express";
export declare const userRegistration: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const verifyUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const forgotPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const verifyUserForgotPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const resetUserPassword: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const refreshAccessToken: (req: Request, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=auth.controller.d.ts.map