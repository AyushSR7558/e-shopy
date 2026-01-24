import express from "express";
import "dotenv/config";
import { prisma } from "./db/prisma.js";
import globalErrorHandler from "./error/middleware.error.js";
import cors from "cors";
import cookieParser from "cookie-parser"
import type { Request, Response } from "express";
import { sendOtp } from "./utils/auth.helper.js";

const app = express();

app.use(
  cors({
    origin: "*",
    allowedHeaders: ["Authorization", "Authentication", "Content-Type"],
  }),
);
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
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
