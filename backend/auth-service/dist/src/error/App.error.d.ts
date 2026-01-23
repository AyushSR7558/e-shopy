export declare class AppError extends Error {
    readonly statusCode: number;
    readonly detail: any;
    readonly isOperation: boolean;
    constructor(message: string, statusCode: number, isOperational?: boolean, detail?: any);
}
export declare class ValidationError extends AppError {
    constructor(message?: string, detail?: any);
}
export declare class NotFound extends AppError {
    constructor(message?: string);
}
export declare class AuthenticationError extends AppError {
    constructor(message?: string);
}
export declare class ForbiddenError extends AppError {
    constructor(message?: string);
}
export declare class DatabaseError extends AppError {
    constructor(message?: string);
}
export declare class RateLimitError extends AppError {
    constructor(message?: string);
}
//# sourceMappingURL=App.error.d.ts.map