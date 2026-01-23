export class AppError extends Error {
    statusCode; // Status Code
    detail; // Detail of the error
    isOperation; // true -> expected error :: false -> not expected error
    constructor(message, statusCode, isOperational = false, detail) {
        super(message);
        this.statusCode = statusCode;
        this.isOperation = isOperational;
        this.detail = detail;
        Error.captureStackTrace(this, this.constructor); // It capture the stack trace of the error and and attaches it to this error object -> Useful for debugging process
    }
}
// Validation Error Class
export class ValidationError extends AppError {
    constructor(message = "Invalid request data", detail) {
        super(message, 400, true, detail);
    }
}
// Notfound Error Class
export class NotFound extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}
// Authentication Error Class
export class AuthenticationError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}
// Forbidden Error Class
export class ForbiddenError extends AppError {
    constructor(message = "Forbidden Error") {
        super(message, 403);
    }
}
// Database Error
export class DatabaseError extends AppError {
    constructor(message = "Database Error") {
        super(message, 500);
    }
}
// Rate Limit Error
export class RateLimitError extends AppError {
    constructor(message = "Too many request, try again later") {
        super(message, 429);
    }
}
//# sourceMappingURL=App.error.js.map