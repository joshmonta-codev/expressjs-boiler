import express, { Request, Response } from "express";
import mongoose from "mongoose";

import loaders from "./loaders";
import { Config } from "../config";

export default async (config: Config) => {
    const app = express();
    await loaders(app);

    app.listen(config.port, () => {
        console.log(`🚀 Server ready at http://localhost:${config.port}`);
    });

    app.get("/", (req: Request, res: Response) => {
        res.send("Typescript nodejs works!")
    });
}