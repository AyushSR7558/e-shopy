import type { Request, Response, NextFunction } from "express";
export declare const userRegistration: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const verifyUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
//# sourceMappingURL=auth.controller.d.ts.map