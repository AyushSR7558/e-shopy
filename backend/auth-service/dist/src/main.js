import express from "express";
import "dotenv/config";
import { prisma } from "./db/prisma.js";
const app = express();
const PORT = process.env.PORT;
app.get("/add", async (req, res) => {
    console.log("Add request Started");
    const user = await prisma.dummy.create({
        data: {
            name: "Ayush"
        }
    });
    console.log("Add request end");
    res.json({
        data: user
    });
});
app.get("/server-health", (req, res) => {
    res.status(200).send({
        message: "Server is healthy"
    });
});
app.listen(6001, () => {
    console.log(`Server listening at PORT:${PORT}`);
});
//# sourceMappingURL=main.js.map