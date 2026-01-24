import express from "express";
import "dotenv/config";
import { prisma } from "./db/prisma.js";
import globalErrorHandler from "./error/middleware.error.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { sendOtp } from "./utils/auth.helper.js";
import router from "./route/auth.route.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger-output.json" with { type: "json" };
const app = express();
app.use(cors({
    origin: "*",
    allowedHeaders: ["Authorization", "Authentication", "Content-Type"],
}));
app.use(express.json()); // JSON body
app.use(express.urlencoded({ extended: true })); // FORM body
app.use(cookieParser());
const PORT = process.env.PORT;
app.use((req, res, next) => {
    console.log(req.body);
    next();
});
app.use("/api", router);
app.get("/docs-json", (req, res) => {
    res.json(swaggerDocument);
});
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get("/server-health", (req, res) => {
    res.status(200).send({
        message: "Server is healthy",
    });
});
app.get("/", (req, res) => {
    res.json({
        message: "Hello API",
    });
});
app.use((req, res, next) => {
    console.log("MIDDLEWARE HIT:", req.method, req.url);
    next();
});
app.use(globalErrorHandler);
app.listen(6001, () => {
    console.log(`Server listening at PORT:${PORT}`);
});
//# sourceMappingURL=main.js.map