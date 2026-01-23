import express from "express";
import "dotenv/config";
import { prisma } from "./db/prisma.js";
import globalErrorHandler from "./error/middleware.error.js";
const app = express();
const PORT = process.env.PORT;
app.get("/server-health", (req, res) => {
    res.status(200).send({
        message: "Server is healthy",
    });
});
app.use(globalErrorHandler);
app.listen(6001, () => {
    console.log(`Server listening at PORT:${PORT}`);
});
//# sourceMappingURL=main.js.map