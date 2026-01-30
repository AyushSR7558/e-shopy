export class AppError extends Error{
    public readonly statusCode:number // Status Code
    public readonly detail:any // Detail of the error
    public readonly isOperation:boolean // true -> expected error :: false -> not expected error

    constructor(message:string, statusCode:number, isOperational:boolean = false, detail?:any) {
        super(message);
        this.statusCode = statusCode;
        this.isOperation = isOperational;
        this.detail = detail
        Error.captureStackTrace(this, this.constructor); // It capture the stack trace of the error and and attaches it to this error object -> Useful for debugging process
    }

}

// Validation Error Class
export class ValidationError extends AppError{
    constructor(message:string = "Invalid request data", detail?:any) {
        super(message, 400, true, detail);
    }
}

// Notfound Error Class
export class NotFound extends AppError{
    constructor(message:string="Resource not found") {
        super(message, 404);
    }
}

// Authentication Error Class
export class AuthenticationError extends AppError{
    constructor(message:string="Unauthorized") {
        super(message, 401);
    }
}

// Forbidden Error Class
export class ForbiddenError extends AppError{
    constructor(message = "Forbidden Error") {
        super(message, 403);
    }
}

// Database Error
export class DatabaseError extends AppError{
    constructor(message:string = "Database Error") {
        super(message, 500);
    }
}

// Rate Limit Error

export class OtpError extends AppError {
  constructor(
    message: string = "Failed to send OTP. Please try again."
  ) {
    super(message, 500);
  }
}
