import { AppError } from "./App.error.js";
// Error Handler :- Middleware to handle all the error
const globalErrorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        console.log(`Error ${req.method} ${req.url}-${err.message}`);
        return res.status(err.statusCode).json({
            status: err.statusCode,
            message: err.message,
            ...(err.detail && { detail: err.detail }),
        });
    }
    console.log(`Unhandled Error!!!`, err);
    return res.status(500).send({
        message: `Something went wrong, Try again later`,
    });
};
export default globalErrorHandler;
//# sourceMappingURL=middleware.error.js.map