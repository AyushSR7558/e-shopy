import type { NextFunction, Request, Response } from "express";
declare const globalErrorHandler: (err: Error, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export default globalErrorHandler;
//# sourceMappingURL=middleware.error.d.ts.map